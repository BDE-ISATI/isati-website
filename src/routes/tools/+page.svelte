<script lang="ts">
import TexteEditor from "$lib/components/editor/TexteEditor.svelte"
    import { writable } from "svelte/store";

let selected = writable({})

let data = undefined

</script>

<p>Un bouton export est prévu pour les gens non admins :)</p>

<TexteEditor></TexteEditor>
