import { articleBucket } from '$lib/config.js';

import edjsHTML from "editorjs-html";


export async function load({ params }) {
	
    const edjsParser = edjsHTML();
    let req = await fetch( articleBucket + params.slug + ".json" )
    let data = await req.json()

	return {
        html : edjsParser.parse(data)
    }
}