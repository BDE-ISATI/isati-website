<script lang="ts">
  
    import { CaretDown } from "phosphor-svelte"
    import { scale } from 'svelte/transition';

    export let icon : any = undefined

    export let title = "Ajouter"

    export let options: {"libelle":string,"icone"?:string,action:Function}[]

    let opened = false

    function clickOutside(element, callbackFunction) {
      function onClick(event) {
        if (!element.contains(event.target)) {
          callbackFunction();
        }
      }
      
      document.body.addEventListener('click', onClick);
      
      return {
        update(newCallbackFunction) {
          callbackFunction = newCallbackFunction;
        },
        destroy() {
          document.body.removeEventListener('click', onClick);
        }
      }
    }
</script>

<div class="relative inline-block text-left w-30">
    <div class="w-full">
      <button on:click={() => opened=!opened} use:clickOutside={() => {opened=false}}  type="button" class="text-[var(--text)] flex w-full justify-center items-center gap-x-1.5 rounded-md bg-container-700 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-black ring-opacity-5" id="menu-button" aria-expanded="true" aria-haspopup="true">
        <svelte:component this={icon} class="text-2xl" weight="fill"/>
        {title}
        <CaretDown/>

      </button>
    </div>
  
    <!--
      Dropdown menu, show/hide based on menu state.
  
      Entering: "transition ease-out duration-100"
        From: "transform opacity-0 scale-95"
        To: "transform opacity-100 scale-100"
      Leaving: "transition ease-in duration-75"
        From: "transform opacity-100 scale-100"
        To: "transform opacity-0 scale-95"
    -->
    {#if opened}
    <div transition:scale={{ delay: 0, duration: 300 }} class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-container-700 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="py-1">
        {#each options as option}
          <button on:click={() => {opened=false;option.action()}} class="text-[var(--text)] block px-4 py-2 text-sm" tabindex="-1">{option.libelle}</button>
        {/each}
      </div>
    </div>
    {/if}
  </div>