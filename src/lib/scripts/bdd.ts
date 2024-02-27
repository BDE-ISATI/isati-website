// import postgres from 'postgres'
// import sharp from 'sharp'

// abstract class BDD{
// 	protected static load(database:string){
// 		return postgres({ 
// 			host     : import.meta.env.VITE_host,
// 			port     : import.meta.env.VITE_port,
// 			database : database,
// 			username : import.meta.env.VITE_user,
// 			password : import.meta.env.VITE_pass,
// 		})
// 	}
// }

// class BDDIsati extends BDD {
// 	static sql:postgres.Sql<{}>
// 	static database = "Isati"

// 	static get instance() {
// 		if (!this.sql) { this.sql = this.load(this.database) }
// 		return this.sql        
// 	}
// }

// class BDDSalles extends BDD {
// 	static sql:postgres.Sql<{}>
// 	static database = "Salles"

// 	static get instance() {
// 		if (!this.sql) { this.sql = this.load(this.database) }
// 		return this.sql        
// 	}
// }

// async function formatImage(imageByte:any) : Promise<string>{
// 	let convert = sharp(imageByte).resize(100, 100)
// 	let buff = await convert.toBuffer()
// 	return buff
// }

// export class BDDUsers  {
// 	async fetch(i:number|undefined = undefined) {

// 		let req_users

// 		if (i == undefined) {
// 			req_users =  await BDDIsati.instance`SELECT * FROM users ORDER BY ordre`
// 		}
// 		else {
// 			req_users = await BDDIsati.instance`SELECT * FROM users ORDER BY ordre LIMIT ${i}`
// 		}

// 		for (let row of req_users) {
// 			if (row.photo){
// 				row.photo = "data:image/webp;base64," + row.photo.toString("base64")
// 			}
// 			else{
// 				row.photo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0ibm9uZSIgeG1sbnM6dj0iaHR0cHM6Ly92ZWN0YS5pby9uYW5vIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDY0djY0SDB6Ii8+PHBhdGggZD0iTTUxLjk5OCA1My43NzJjLS41MDktOC41NDMtNi4yOTctMTUuNjUtMTQuMTIyLTE4LjA2NiA0Ljc0LTIuMjMxIDguMDMxLTcuMDc5IDguMDMxLTEyLjY5OUM0NS45MDcgMTUuMjcyIDM5LjY3OSA5IDMxLjk5NyA5cy0xMy45MSA2LjI3Mi0xMy45MSAxNC4wMDhhMTQuMDIgMTQuMDIgMCAwIDAgOC4wMzcgMTIuNjk5Yy03LjgyNSAyLjQxNS0xMy42MTIgOS41MjMtMTQuMTIyIDE4LjA2Ni0uMDQuNjYzLjQ4MSAxLjIyOCAxLjE0NSAxLjIyOC42MDEgMCAxLjEwNS0uNDczIDEuMTQ1LTEuMDc4LjU0NC05LjM2NyA4LjI2Ni0xNi43OTIgMTcuNzA1LTE2Ljc5MnMxNy4xNjIgNy40MjUgMTcuNzExIDE2Ljc5MmMuMDM0LjYwNS41MzggMS4wNzggMS4xNDUgMS4wNzguNjY0IDAgMS4xODUtLjU2NSAxLjE0NS0xLjIyOHpNMjAuMzc3IDIzLjAwOGMwLTYuNDYyIDUuMjAzLTExLjcwMiAxMS42Mi0xMS43MDJzMTEuNjIgNS4yNCAxMS42MiAxMS43MDItNS4yMDMgMTEuNzAyLTExLjYyIDExLjcwMi0xMS42Mi01LjI0LTExLjYyLTExLjcwMnoiIGZpbGw9IiMwMDAiLz48L3N2Zz4="
// 			}
// 		}

// 		return req_users
// 	}

// 	static async update(data:any) {
// 		let datatosend: { nom: any; contact: any; rôle: any; ordre: any; photo?: any } = {
// 			nom:data.get("nom"),
// 			contact:data.get("contact"),
// 			rôle:data.get("rôle"),
// 			ordre:data.get("ordre"),
// 		}
		
// 		if (data.get("photo")){
// 			let img = await data.get("photo").arrayBuffer()
// 			datatosend.photo = await formatImage(img)
// 		}
	
// 		return await BDDIsati.instance`
// 			UPDATE users SET ${BDDIsati.instance(datatosend)} WHERE ${BDDIsati.instance({id:data.get("id")})}
// 		`
// 	}
	
// 	static async insert(data:any) {
// 		if (data.get("photo")){
// 			let datatosend = {
// 				nom:data.get("nom"),
// 				contact:data.get("contact"),
// 				rôle:data.get("rôle"),
// 				ordre:data.get("ordre"),
// 				photo : await formatImage( await data.get("photo").arrayBuffer() )
// 			}
	
// 			return await BDDIsati.instance`
// 				INSERT INTO users(nom, contact, rôle, ordre, photo) VALUES ${BDDIsati.instance(datatosend)} RETURNING id
// 			`
// 		}
// 		else {
// 			const datatosend = {
// 				nom:data.get("nom"),
// 				contact:data.get("contact"),
// 				rôle:data.get("rôle"),
// 				ordre:data.get("ordre"),
// 			}
	
// 			let req = BDDIsati.instance`
// 				INSERT INTO users(nom, contact, rôle, ordre) VALUES ${BDDIsati.instance(datatosend)} RETURNING id
// 			`
	
// 			return await req
// 		}
// 	}
	
// 	static async delete(data:any) {
// 		return await BDDIsati.instance`
// 			DELETE FROM users WHERE id=${data.get("id")}
// 		`
// 	}
// }

// export class BDDEvents{
// 	database: string = "Isati"

// 	async fetch(i:number|undefined = undefined) {
// 		return await BDDIsati.instance`SELECT * FROM events WHERE NOW() <= date ORDER BY date`
// 	}

// }

// export class BDDCoursSalles{
// 	database: string = "Salles"

// 	async fetch(i:number|undefined = undefined) {

// 		let req_salles = await BDDSalles.instance`
// 			SELECT * FROM (
// 				SELECT batiments.num_batiment,salles.nom_salle,NULL as state,NULL as jusque
// 				FROM salles
// 				JOIN batiments USING(id_batiment) 
// 				WHERE salles.id_salle NOT IN (SELECT id_salle FROM events WHERE NOW() < events.dtend)

// 				UNION

				// SELECT batiments.num_batiment,salles.nom_salle,'Libre' as state,MIN(events.dtstart) as jusque
				// FROM events 
				// JOIN salles USING(id_salle) 
				// JOIN batiments USING(id_batiment) 
				// WHERE now() < events.dtstart 
				// GROUP BY batiments.num_batiment,salles.id_salle

// 				UNION

// 				SELECT batiments.num_batiment,salles.nom_salle,'Occupé' as state,events.dtend as jusque
// 				FROM events
// 				JOIN salles USING(id_salle) 
// 				JOIN batiments USING(id_batiment) 
// 				WHERE NOW() BETWEEN events.dtstart AND events.dtend
// 			) AS foo ORDER BY num_batiment,nom_salle
// 		`
		
// 		return req_salles
// 	}

// }
