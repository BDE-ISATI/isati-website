<script lang="ts" setup>
    import Isati from "../logo/Isati.svelte";
    
    type MenuItem = {
        title: string;
        route: string;
        icon : any;
    };
    
    export let menuItems: MenuItem[]
    export let id : string = ""
    export let actual:string

</script>

    <nav id={id} class="sm:h-24 sm:rounded-none py-2 px-4 sm:top-0 sm:bottom-auto flex justify-between select-none sm:p-4 g-4 fixed bottom-0 left-0 text-white w-full bg-container-800 z-5 sm:bg-primary rounded-t-3xl shadow-2xl sm:shadow-none z-20">
        
        <a href="/" class="sm:flex w-24 hidden place-items-center cursor-pointer gap-4 p-1 logo no-underline">
	        <Isati color="white"></Isati>
        </a>

        <div class="flex justify-around sm:justify-end flex-1 sm:gap-8">
            {#each menuItems as item }
                <a href={item.route} class:selected={actual==item.route} class="sm:flex-row flex-col sm:gap-4 sm:text-white sm:hover:text-secondary hover:text-primary gap-0 flex place-items-center cursor-pointer text-secondary no-underline">
                    
                    <svelte:component this={item.icon} weight="fill" class="sm:size-8 size-6"/>
                    <span class="sm:text-xl text-base">{item.title}</span>

                </a>
            {/each}
        </div>
    </nav>

<style>

    .selected{
        color:rgb( var(--color-secondary) );
    }
    
    @media screen and (max-width: 384px) {
        .selected{
            color:rgb( var(--color-primary) );
        }
    }

</style>