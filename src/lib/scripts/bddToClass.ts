import { apiUri, getIdToken } from "$lib/config"

class User{
	id:number|undefined
	nom:string|undefined
	contact:string|undefined
	photo:string|undefined
	rôle:string|undefined
	ordre:number|undefined
	filePicture:FileList|undefined
	delete:boolean

	constructor(json:any){
		this.id = json.ID
		this.nom = json.nom
		this.contact = json.contact
		this.photo = `https://website-members-pictures.s3.eu-west-3.amazonaws.com/${json.ID}.webp`
		this.rôle = json.rôle
		this.ordre = json.ordre
		this.filePicture = undefined
		this.delete = false
	}

	changePhoto(e:Event & { currentTarget: EventTarget & HTMLInputElement; }) {
		const inputElement = e.target as HTMLInputElement;
		this.photo = URL.createObjectURL(inputElement.files![0]);
	}

	async getDataPhoto() : Promise<string> {
		return new Promise((resolve) => {
			var fr = new FileReader();
			fr.onload = function () {
				resolve((fr.result! as string).split(',')[1])
			}
			fr.readAsDataURL(this.filePicture![0]);
		})
	}

	addToDelete() {
		this.delete = !this.delete
	}

	inBDD(){
		return this.id!=undefined
	}

	async deleteInBDD(){
		let formData: {
			photo?:string,
			id?:string,
			nom?:string,
			rôle?:string,
			ordre?:string,
			contact?:string,
		} = {}
		formData["id"] = this.id!.toString()

		return await fetch(apiUri+"/members/update", {
			method: "DELETE",
			body: JSON.stringify(formData),
            headers: {
                Authorization: `Bearer ${getIdToken()}`
            }
		});
	}

	async saveInBDD() {
		let formData: {
			photo?:string,
			id?:string,
			nom?:string,
			rôle?:string,
			ordre?:string,
			contact?:string,
		} = {}

		let method = "PATCH"

		if ( this.filePicture != undefined ) {
			console.log(this.photo)
			formData["photo"] = await this.getDataPhoto()
		}
		if (this.id != undefined) { formData["id"] = this.id.toString() }
		else { method = "PUT" }

		if (this.nom != undefined) { formData["nom"] = this.nom.toString() }
		if (this.contact != undefined) { formData["contact"] = this.contact.toString() }
		if (this.rôle != undefined) { formData["rôle"] = this.rôle.toString() }
		if (this.ordre != undefined) { formData["ordre"] = this.ordre.toString() }

		let req = await fetch(apiUri+"/members/update", {
            method: method,
			body: JSON.stringify(formData),
            headers: {
                Authorization: `Bearer ${getIdToken()}`
            }
        })

		if (this.id == undefined) {
			let resp = await req.json()
			this.id = resp[0].id
		}
		
		return req
	}

	save() {
		if (this.inBDD() && this.delete){
			this.deleteInBDD()
		}
		else if (!this.delete){
			this.saveInBDD()
		}
	}
}

export class Users {
	liste : User[] = []

	constructor(json:any) {
		for (let item of json) {
			this.add(item)
		}
	}

	add(json:any) {
		this.liste.push(new User(json))
	}

	addEmpty() {
		this.add({nom:"nom"})
	}

	save() {
		for (let i in this.liste){
			let j = parseInt(i)
			let user = this.liste[j]

			user.save()

			if (user.delete) {
				delete this.liste[j]
				this.liste.splice(j,1)
			}

		}
	}
}