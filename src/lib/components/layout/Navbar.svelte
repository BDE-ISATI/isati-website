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

    <nav id={id} class="menu-container w-full bg-container-800 md:bg-primary z-5">
        
        <a href="/" class="menu-item logo">
            <Logo color="white"></Logo>
        </a>

        <div class="navigation">
            {#each menuItems as item }
                <a href={item.route} class="menu-item" class:selected={actual==item.route}>
                    
                    <svelte:component this={item.icon} weight="fill" class="md:size-8 size-6"/>
                    <span class="item-title">{item.title}</span>

                </a>
            {/each}
        </div>
    </nav>

<style>

    
    
    a {
        color:var(--white);
        text-decoration: unset;
    }

    .menu-item:hover{
        color:var(--secondary);
    }
    
    .item-title {
        --size: 20px;
        font-size: var(--size);
        /* padding-top: calc(var(--size) / 4); */
    }
    
    .menu-container {
        position: fixed;
        top: 0;
        left: 0;
        transition: 0.3s;
        color: var(--white) !important;
        display: flex;
        justify-content: space-between;
        
        /* background-color: var(--primary); */
        user-select: none;
        padding:16px;
        gap:16px;
    }
    
    .navigation {
        display: flex;
        justify-content: flex-end;
        flex:1;
        gap: 32px;
    }
    
    .menu-item {
        display: flex;
        place-items: center;
        cursor: pointer;
        gap:16px;
    }
    
    .menu-item:hover * {
        border-color: var(--red);
        color: var(--red);
        fill: var(--red);
    }

    .selected{
        color:var(--secondary);
    }
    
    @media screen and (max-width: 767px) {
        .selected{
            color:var(--primary) !important;
        }
        .menu-container{
            border-radius: 32px 32px 0px 0px ;
            padding:8px 16px;
            box-shadow: var(--shadow);
            top:unset;
            bottom: 0;
        }
        
        .menu-item:hover{
            color:var(--primary);
        }
        
        .logo{
            display: none;
        }
        
        .navigation {
            justify-content: space-around;
            gap:unset;
        }
        
        .menu-item{
            flex-direction: column;
            gap:0px;
            color:var(--secondary);
        }

        .item-title {
            --size: 16px;    
        }
    }
    
    
    </style>