<script lang="ts">
    import { apiUri } from "$lib/config";
    import { onMount } from "svelte";
    import EditorJS from '@editorjs/editorjs'
    import Header from '@editorjs/header'; 
    import List from '@editorjs/list'; 
    import Table from '@editorjs/table';
    import Paragraph from '@editorjs/paragraph';
    import Quote from '@editorjs/quote';
    // import Delimiter from '@editorjs/delimiter';
    import Image from '@editorjs/image';
    import Link from '@editorjs/link';
    import Attaches from '@editorjs/attaches';
    import Marker from '@editorjs/marker';
    import Embed from '@editorjs/embed';
    import type { editorItems,editorItem } from "$lib/scripts/editorStructure";

    let editordiv:HTMLDivElement
    let editor:EditorJS

    export let editorItems:editorItems
    export let key:string
    export let importedData:EditorJS.OutputData  = {blocks: []}

	onMount(async()=> {

        editor= new EditorJS({
            holder: editordiv,
            data:importedData,
            tools: { 
                header: {
                    class: Header,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+H',
                },
                table: {
                    class:Table,
                    inlineToolbar: true,
                },
                paragraph: {
                    class:Paragraph,
                    inlineToolbar: true,
                },
                quote: {
                    class:Quote,
                    inlineToolbar: true,
                },
                image: {
                    class: Image,
                    inlineToolbar: true,
                    config: {
                        endpoints: {
                            byFile: apiUri + "/image/format"
                        }
                    }
                },
                Marker: {
                    class: Marker,
                    shortcut: 'CMD+SHIFT+M',
                    inlineToolbar: true,
                },
                // link: Link,
                // attaches: Attaches,
                embed: {
                    class:Embed,
                    inlineToolbar: true,
                },

                list: { 
                    class: List, 
                    inlineToolbar: true 
                } 
            }, 
        })
        editorItems.toBeProcessed[key] = editor
	})

</script>
<div id="editorjs" bind:this={editordiv}></div>


<style>
    #editorjs {
        padding:16px 64px;
        background-color: #fff;
        border-radius: 16px;
        border: 1px solid var(--text);
    }
</style>