<script lang="ts">

    import { scale } from 'svelte/transition';

    export let icon = "ph-calendar-plus"

    export let title = "Ajouter"

    export let options: {"libelle":string,"icone"?:string,action:Function}[]

    let opened = false
</script>

<!-- <div class="dropbox">
    <button class="relative" on:click={() => opened=!opened}>Ajouter au calendrier</button>
    
    {#if opened}
        <ul class="fold" transition:scale={{ delay: 0, duration: 300 }}>
            {#each options as option}
            <li on:click={() => {opened=false;option.action}}>{option.value}</li>
            {/each}
        </ul>
    {/if}
</div> -->

<div class="relative inline-block text-left w-30">
    <div class="w-full">
      <button on:click={() => opened=!opened} type="button" class="text-[var(--text)] flex w-full justify-center items-center gap-x-1.5 rounded-md bg-container-700 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-black ring-opacity-5" id="menu-button" aria-expanded="true" aria-haspopup="true">
        
        <i class="ph-fill {icon} s-BbGST1k5acv4"></i>
        {title}
        <svg class="-mr-1 size-4 " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
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