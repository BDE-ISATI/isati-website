import { apiUri, getIdToken, bucket, getAccessToken } from "$lib/config"
import type EditorJS from '@editorjs/editorjs'
import Compressor from "compressorjs";

export type editorItem = Record<string,any>

async function getDataPhoto(input:HTMLInputElement) : Promise<string> {
    return new Promise((resolve) => {
        var fr = new FileReader();
        fr.onload = function () {
            resolve((fr.result! as string).split(',')[1])
        }
        fr.readAsDataURL(input.files![0]);
    })
}


export abstract class editorItems {
    items : editorItem[] = []

    toBeProcessed:{[key:string]:EditorJS|HTMLInputElement} = {}

    abstract primary : string
    abstract bddUri: string
    
    structure: Record<string,{
        type:string,
        editable:boolean,
        restriction?:string,
    }> = {}
    
    actionsBeforeSave : Function[] = []

    addEmpty() {
		this.items.push({})
	}

    public async save_to_s3(filename:string,contentType:string,data:File){
        let req = await fetch(apiUri+"/s3/authorizer", {
            method: "POST",
            body: JSON.stringify({
                filename:filename,
                AccessToken:getAccessToken()
            }),
        })
        
        let resp = await req.json()
        let uri = resp.data

        let req2 = await fetch(uri, {
            method: "PUT",
            body: data,
        })
    }

    /*
    Fonction de base pour save dans la base de données.
    Sinon s'il faut faire d'autres actions, il faut surcharger cette fonction dans la classe fille
    et réappeler avec le mot clé super cette fonction.
    Exemple : 

    async save(item:editorItem): Promise<Response> {
        console.log("coucou")

        return super.save(item)
    }

    */
    public async save(item:editorItem): Promise<Response> {      
        let method = item[this.primary] == undefined ? "PUT" : "PATCH" 

        let req = await fetch(this.bddUri, {
            method: method,
            body: JSON.stringify({
                ...item,
                AccessToken:getAccessToken()
            }),
        })
        
        let resp = await req.json()

        if (method=="PUT") {
            item[this.primary] = resp.data.ID
        }

        alert(resp.message)
    
        return req
    }

    public async delete(i:number){
        if (i < 0 || i >= this.items.length){
            alert("L'indice est en dehors des limites")
            return
        } 

        if (this.items[i][this.primary] !== undefined) {
            let formData : editorItem = {}

            formData[this.primary] = this.items[i][this.primary]

            let req = await fetch(this.bddUri, {
                method: "DELETE",
                body:JSON.stringify({
                    ...formData,
                    AccessToken:getAccessToken()
                }),
            });

            let resp = await req.json()

            alert(resp.message)
        }
        
        alert("Bien supprimé")
        this.items.splice(i,1)
    }
}

export class userEditorStructure extends editorItems {
    bddUri: string = apiUri+"/members/update"
    primary = "ID"

    async save(item:editorItem): Promise<Response> {

        let photoInput = this.toBeProcessed["photo"] as HTMLInputElement
        if (photoInput.files?.length == 1){
            let ctx = this

            new Compressor(photoInput.files[0], {
                quality: 0.8,
                mimeType: "image/webp",
                width:128,
                height:128,
                resize:"cover",
                success(result) {
                    ctx.save_to_s3("members/"+item.ID+'.webp','image/webp',result)
                }
            })
        }
        return await super.save(item)
    }

    constructor(data:editorItem[]) {
        super()
        this.items = data;

        this.structure = {
            "ID" : {type:"text",editable:false},
            "nom" : {type:"text",editable:true},
            "contact" : {type:"text",editable:true},
            "rôle" : {type:"text",editable:true},
            "ordre" : {type:"number",editable:true},
            "groupe" : {type:"text",editable:true},
            "photo" : {type:"file",editable:true},
        }
    }
}

export class eventEditorStructure extends editorItems {
    bddUri: string = apiUri+"/events/update"
    primary = "ID"

    async save(item:editorItem): Promise<Response> {

        let photoInput = this.toBeProcessed["photo"] as HTMLInputElement
        if (photoInput.files?.length == 1){
            let ctx = this

            new Compressor(photoInput.files[0], {
                quality: 0.8,
                mimeType: "image/webp",
                success(result) {
                    ctx.save_to_s3("events/"+item.ID+'.webp','image/webp',result)
                }
            })
        }
        return await super.save(item)
    }

    constructor(data:editorItem[]) {
        super()
        this.items = data;

        this.structure = {
            "ID" : {type:"text",editable:false},
            "SUMMARY" : {type:"text",editable:false},
            "LOCATIONS" : {type:"text",editable:false},
            "DTSTART" : {type:"text",editable:false},
            "DTEND" : {type:"text",editable:false},
            "photo" : {type:"file",editable:true},
        }
    }
}

export class salleEditorStructure extends editorItems {
    bddUri: string = apiUri+"/salles/update"
    primary = "ID"

    constructor(data:editorItem[]) {
        super()
        this.items = data;

        this.structure = {
            "ID" : {type:"text",editable:false},
            "salleID" : {type:"text",editable:true},
            "batimentID" : {type:"text",editable:true},
            "url" : {type:"text",editable:true},
            "type" : {type:"text",editable:true},
        }
    }
}

export class articleEditorStructure extends editorItems {
    bddUri: string = apiUri+"/articles"
    primary = "ID"

    async save(item:editorItem): Promise<Response> {
        let outputData = await (this.toBeProcessed["article"] as EditorJS).save()
        item["article"] = outputData

        return await super.save(item)
    }

    async fetch(id:string,key:string) : Promise<Object>{
        const bucket = this.structure[key].bucket

        return (await fetch(bucket+id+".json",{cache: "no-cache"})).json()
    }

    constructor(data:editorItem[]) {
        super()
        this.items = data;

        this.structure = {
            "ID" : {type:"text",editable:false},
            "release-date" : {type:"text",editable:false},
            "update-date" : {type:"text",editable:false},
            "nom" : {type:"text",editable:true},
            "categorie" : {type:"text",editable:true},
            "description" : {type:"text",editable:true},
            "article" : {type:"texteditor",bucket:`${bucket}/articles/`,editable:true},
        }

        this.items.forEach(element => {
            element["article"] = {}
        });
    }
}