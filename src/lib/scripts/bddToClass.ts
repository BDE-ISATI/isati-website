

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
		this.id = json.id
		this.nom = json.nom
		this.contact = json.contact
		this.photo = json.photo
		this.rôle = json.rôle
		this.ordre = json.ordre
		this.filePicture = undefined
		this.delete = false
	}

	changePhoto(e:Event & { currentTarget: EventTarget & HTMLInputElement; }) {
		const inputElement = e.target as HTMLInputElement;
		this.photo = URL.createObjectURL(inputElement.files![0]);
	}

	addToDelete() {
		this.delete = !this.delete
	}

	inBDD(){
		return this.id!=undefined
	}

	async deleteInBDD(){
		const formData = new FormData();
		formData.append("id",this.id!.toString()) 
		formData.append("action","delete") 

		return await fetch("/api", {
			method: "POST",
			body: formData,
		});
	}

	async saveInBDD() {
		const formData = new FormData();

		if ( this.filePicture != undefined ) {
			formData.append("photo",this.filePicture![0])
		}

		if (this.id != undefined) { 
			formData.append("id",this.id.toString()) 
			formData.append("action","update") 
		}
		else {
			formData.append("action","insert") 
		}
		if (this.nom != undefined) { formData.append("nom",this.nom.toString()) }
		if (this.contact != undefined) { formData.append("contact",this.contact.toString()) }
		if (this.rôle != undefined) { formData.append("rôle",this.rôle.toString()) }
		if (this.ordre != undefined) { formData.append("ordre",this.ordre.toString()) }

		let req = await fetch("/api", {
			method: "POST",
			body: formData,
		});

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