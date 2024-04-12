<script lang="ts">

    import { scale } from 'svelte/transition';

    export let options = [{
        action : () => {},
        value: "Test",
        icon: "",
    }]

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

<div class="relative inline-block text-left w-24 bg-white">
    <div class="w-full">
      <button on:click={() => opened=!opened} type="button" class="flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
        Options
        <svg class="-mr-1 size-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
    <div transition:scale={{ delay: 0, duration: 300 }} class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="py-1" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <a href="#" on:click={() => {opened=false;option.action}} class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
        <a href="#" on:click={() => {opened=false;option.action}} class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
        <a href="#" on:click={() => {opened=false;option.action}} class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
      </div>
    </div>
    {/if}
  </div>
    <!-- 
    <style>
        .dropbox{
            position:relative;
        }

        .fold {
            position:absolute;
            flex-direction:column;
            height:300px;
            padding:0;
            width:100%;

            top : 0;
            left:0;
        }
        
        button,li{
            border: 26px;
            all:unset;
            cursor:pointer;
            display:flex;
            gap:16px;
            align-items:center;
            padding:10px 16px;
            width:calc( 100% - 32px);
            justify-content: space-between;
            background:var(--container);
            box-shadow: var(--shadow);
        }
        
        button:hover,li:hover {
            background:var(--container);
        }
        
        /* button::after {
            font-size:10px;
            content:"▼";
        }
        */
        li {
            display:block;
            width:100%;
        }    
    </style> -->