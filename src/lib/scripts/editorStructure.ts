import { apiUri, getIdToken } from "$lib/config"

export type editorItem = {
    [key:string]:any
}

export abstract class editorItems {
    items : editorItem[] = []
    abstract primary : string
    abstract bddUri: string

    structure : {
        [key:string] : {
            type:string,
            restriction?:string
        }
    } = {}

    addEmpty() {
		this.items.push({})
	}

    public async save(item:editorItem) {

        let method = item[this.primary] == undefined ? "PUT" : "PATCH" 

        let req = await fetch(this.bddUri, {
            method: method,
            body: JSON.stringify(item),
            headers: {
                Authorization: `Bearer ${getIdToken()}`
            }
        })

        if (method=="PUT") {
            let resp = await req.json()
            item[this.primary] = resp[0].id
        }
    
        return req
    }

    public async delete(i:number){
        if (this.items[i][this.primary] == undefined) { 
            this.items.splice(i,1)
        }
        else {
            let formData : {[key:string]:any} = {}

            formData[this.primary] = this.items[i][this.primary]

            await fetch(this.bddUri, {
                method: "DELETE",
                body: JSON.stringify(formData),
                headers: {
                    Authorization: `Bearer ${getIdToken()}`
                }
            });
        }
    }
}

export class userEditorStructure extends editorItems {
    bddUri: string = apiUri+"/members/update"
    primary = "ID"

    constructor(data:editorItem[]) {
        super()
        this.items = data;

        this.structure = {
            "ID" : {type:"text"},
            "nom" : {type:"text"},
            "contact" : {type:"text"},
            "rôle" : {type:"text"},
            "ordre" : {type:"number"},
            // "photo" : {type:"file"},
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
            "ID" : {type:"text"},
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
            "ID" : {type:"text"},
            "salleID" : {type:"text"},
            "batimentID" : {type:"text"},
            "url" : {type:"text"},
            "type" : {type:"text"},
        }
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
