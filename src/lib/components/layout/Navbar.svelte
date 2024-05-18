<script lang="ts" setup>
    import type { SvelteComponent } from "svelte";
    import Logo from "./Logo.svelte";

    type MenuItem = {
        title: string;
        route: string;
        icon : any;
    };
    
    export let menuItems: MenuItem[]
    export let id : string = ""
    export let actual:string

</script>

    <nav id={id} class="md:rounded-none py-2 px-4 md:top-0 md:bottom-auto flex justify-between select-none md:p-4 g-4 fixed bottom-0 left-0 text-[var--white] w-full bg-container-800 z-5 md:bg-primary rounded-t-3xl shadow-2xl md:shadow-none">
        
        <a href="/" class="md:flex hidden place-items-center cursor-pointer gap-4 logo no-underline">
            <Logo color="white"></Logo>
        </a>

        <div class="flex justify-around md:justify-end flex-1 md:gap-8">
            {#each menuItems as item }
                <a href={item.route} class:selected={actual==item.route} class="md:flex-row flex-col md:gap-4 md:text-[var(--white)] md:hover:text-[var(--secondary)] hover:text-[var(--primary)] gap-0 flex place-items-center cursor-pointer text-[var(--secondary)] no-underline">
                    
                    <svelte:component this={item.icon} weight="fill" class="md:size-8 size-6"/>
                    <span class="md:text-xl text-base">{item.title}</span>

                </a>
            {/each}
        </div>
    </nav>

<style>

    .selected{
        color:var(--secondary);
    }
    
    @media screen and (max-width: 767px) {
        .selected{
            color:var(--primary) !important;
        }

    }
    
    
    </style>