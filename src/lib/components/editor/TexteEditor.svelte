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
        const url = "data:application/json;base64," + btoa(JSON.stringify(outputData));
        let a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'file.json';
        document.body.appendChild(a);
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
                reader.readAsText(input.files[0],'ISO-8859-1');
            }  
        }

        

        input.remove()  
    }

    $:console.log(importedData)


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
    }
</style>