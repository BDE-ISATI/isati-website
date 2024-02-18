import {json} from "@sveltejs/kit"

import { BDDUsers } from "$lib/scripts/bdd"

export async function POST(event:any) {
	const data = await event.request.formData()

	let retour

	switch (data.get("action")){
		case "delete" : { retour = BDDUsers.delete(data); break;}
		case "insert" : { retour = BDDUsers.insert(data); break;}
		case "update" : { retour = BDDUsers.update(data); break;}
	}

	return json(await retour);
}
