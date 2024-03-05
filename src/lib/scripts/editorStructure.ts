import { apiUri, articleBucket, getIdToken, imgBucket } from "$lib/config"
import type EditorJS from '@editorjs/editorjs'



export type editorItem = {
    [key:string]:any
}

export abstract class editorItems {
    items : editorItem[] = []

    actionsBeforeSave : Function[] = []

    abstract primary : string
    abstract bddUri: string

    structure : {
        [key:string] : {
            type:string,
            restriction?:string,
            const?:boolean,
            bucket?:string
        }
    } = {}

    addEmpty() {
		this.items.push({})
	}

    public async beforeSave(item:editorItem){

    }

    public async save(item:editorItem) {

        await this.beforeSave(item)

        console.log(JSON.stringify(item))


        let method = item[this.primary] == undefined ? "PUT" : "PATCH" 

        let req = await fetch(this.bddUri, {
            method: method,
            body: JSON.stringify(item),
            headers: {
                Authorization: `Bearer ${getIdToken()}`
            }
        })

        let resp = await req.json()

        if (method=="PUT") {
            item[this.primary] = resp.data.ID
        }

        alert(resp.message)
    
        return req
    }

    public async delete(i:number){
        if (this.items[i][this.primary] !== undefined) {
            let formData : {[key:string]:any} = {}

            formData[this.primary] = this.items[i][this.primary]

            let req = await fetch(this.bddUri, {
                method: "DELETE",
                body: JSON.stringify(formData),
                headers: {
                    Authorization: `Bearer ${getIdToken()}`
                }
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

    constructor(data:editorItem[]) {
        super()
        this.items = data;

        this.structure = {
            "ID" : {type:"text",const:true},
            "nom" : {type:"text"},
            "contact" : {type:"text"},
            "rôle" : {type:"text"},
            "ordre" : {type:"number"},
            "photo" : {type:"file",bucket:imgBucket},
        }
    }
}

export class eventEditorStructure extends editorItems {
    bddUri: string = apiUri+"/events/update"
    primary = "ID"

    constructor(data:editorItem[]) {
        super()
        this.items = data;

        this.structure = {
            "ID" : {type:"text",const:true},
            "nom" : {type:"text"},
            "emplacement" : {type:"text"},
            "date" : {type:"date"},
            "type" : {type:"text"},
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
            "ID" : {type:"text",const:true},
            "salleID" : {type:"text"},
            "batimentID" : {type:"text"},
            "url" : {type:"text"},
            "type" : {type:"text"},
        }
    }
}

export class articleEditorStructure extends editorItems {
    bddUri: string = apiUri+"/articles"
    primary = "ID"
    editeurs:{[key:string]:EditorJS} = {}

    async beforeSave(item:editorItem): Promise<void> {

        let outputData = await this.editeurs["article"].save()
        item["article"] = outputData
    }

    async fetch(selected:editorItem,key:string) : Promise<Object>{
        const id = selected.ID
        const bucket = this.structure[key].bucket

        return (await fetch(bucket+id+".json")).json()
    }

    constructor(data:editorItem[]) {
        super()
        this.items = data;

        this.structure = {
            "ID" : {type:"text",const:true},
            "release-date" : {type:"text",const:true},
            "update-date" : {type:"text",const:true},
            "nom" : {type:"text"},
            "categorie" : {type:"text"},
            "article" : {type:"texteditor",bucket:articleBucket},
        }

        this.items.forEach(element => {
            element["article"] = {}
        });
    }
}


// async saveInBDD() {
//     let formData: {
//         photo?:string,
//         id?:string,
//         nom?:string,
//         rôle?:string,
//         ordre?:string,
//         contact?:string,
//     } = {}

//     let method = "PATCH"

//     if ( this.filePicture != undefined ) {
//         console.log(this.photo)
//         formData["photo"] = await this.getDataPhoto()
//     }
//     if (this.id != undefined) { formData["id"] = this.id.toString() }
//     else { method = "PUT" }

//     if (this.nom != undefined) { formData["nom"] = this.nom.toString() }
//     if (this.contact != undefined) { formData["contact"] = this.contact.toString() }
//     if (this.rôle != undefined) { formData["rôle"] = this.rôle.toString() }
//     if (this.ordre != undefined) { formData["ordre"] = this.ordre.toString() }

//     let req = await fetch(apiUri+"/members/update", {
//         method: method,
//         body: JSON.stringify(formData),
//         headers: {
//             Authorization: `Bearer ${getIdToken()}`
//         }
//     })

//     if (this.id == undefined) {
//         let resp = await req.json()
//         this.id = resp[0].id
//     }
    
//     return req
// }

