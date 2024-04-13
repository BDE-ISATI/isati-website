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
    import EmbedCustom from './EmbedCustom';
    import type { editorItems,editorItem } from "$lib/scripts/editorStructure";
    import Button from "../individuels/Button.svelte";
    import DragDrop from 'editorjs-drag-drop';

    let editordiv:HTMLDivElement
    let editor:EditorJS

    export let editorItems:editorItems|undefined = undefined
    export let key:string|undefined = undefined
    export let importedData:EditorJS.OutputData  = {blocks: []}



    function createEditor() {
        
        editordiv.innerHTML = ""
        editor = new EditorJS({
            onReady: () => {
                new DragDrop(editor);
            },
            holder: editordiv,
            placeholder: 'écrivez ici 😉',
            data:importedData,
            tools: { 
                embed: {
                    class:EmbedCustom,
                    inlineToolbar: true,
                },
                header: {
                    class: Header,
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
                

                list: { 
                    class: List, 
                    inlineToolbar: true 
                } 
            }, 
        })
        if (editorItems && key) {
            editorItems.toBeProcessed[key] = editor
        }
    }
    
	onMount(async()=> {
        createEditor()
	})

    async function save(){
        let outputData = await editor.save()

        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(outputData)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = 'file.json';
        a.click();
        a.remove()
    }

    function importer(){
        let input = document.createElement('input');
        input.setAttribute("type","file")
        input.setAttribute("accept","application/json")
        input.click();

        input.onchange = (event) => {
            let input = event.target as HTMLInputElement
            if (input.files) {
                const reader = new FileReader();
                reader.addEventListener('load', (event) => {
                    if (event.target && event.target.result){
                        importedData = JSON.parse(event.target.result as string);
                        createEditor()
                    }
                });
                reader.readAsText(input.files[0],'UTF-8');
            }  
        }

        

        input.remove()  
    }

</script>

<div style="display: flex;flex-direction: column;gap:16px;">
    <div style="display:flex;justify-content:end;gap:16px;">
        <Button on:click={save}>Sauvegarder</Button>
        <Button on:click={importer}>Importer</Button>
    </div>
    <div id="editorjs" bind:this={editordiv}></div>
</div>


<style>
    #editorjs {
        padding:16px 64px;
        background-color: #fff;
        color:black;
        border-radius: 16px;
        border: 1px solid var(--text);
        z-index: 0;
    }

    :global(#editorjs iframe) {
		max-width: 100%;
		margin:auto;
	}

	:global(#editorjs h1) {
		font-size: 3rem; /* 48px */
		line-height: 1;
	}
	:global(#editorjs h2) {
		font-size: 2.25rem; /* 36px */
		line-height: 2.5rem; /* 40px */
	}
	:global(#editorjs h3) {
		font-size: 1.875rem; /* 30px */
		line-height: 2.25rem; /* 36px */
	}
	:global(#editorjs h4) {
		font-size: 1.5rem; /* 24px */
		line-height: 2rem; /* 32px */
	}
	:global(#editorjs h5) {
		font-size: 1.25rem; /* 20px */
		line-height: 1.75rem; /* 28px */
	}
	:global(#editorjs h6) {
		font-size: 1.125rem; /* 18px */
		line-height: 1.75rem; /* 28px */
	}

	:global(#editorjs a[href]) {
		color:var(--primary);
	}
</style>