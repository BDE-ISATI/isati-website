import { BDDEvents, BDDUsers, BDDCoursSalles } from '$lib/scripts/bdd'

export async function load() {
	let bddsalles = new BDDCoursSalles()
	let bddevents = new BDDEvents()
	let bddusers = new BDDUsers()
	
	let req_salles = await bddsalles.fetch()
	let req_events = await bddevents.fetch(4)
	let req_users = await bddusers.fetch(4)

	return {
		salles : req_salles,
		events : req_events,
		users : req_users,
	}
}