<script lang="ts" setup>
    import Logo from "./Logo.svelte";

    type MenuItem = {
        title: string;
        route: string;
        class: string;
    };
    
    export let menuItems: MenuItem[]
    export let id : string = ""
    export let actual:string

    let show = false;

    function invert_show() {
        show=!show;
        let menu_classes = document.querySelector(".menu-container")?.classList;

        if (show) menu_classes?.add("hide");
        else menu_classes?.remove("hide");
    }

    </script>
    
    <nav id={id} class="menu-container">
        
        <a href="/" class="menu-item logo">
            <Logo color="white"></Logo>
        </a>

        <div class="navigation">
            {#each menuItems as item }
                <a href={item.route} class="menu-item" class:selected={actual==item.route}>
                    <i class={item.class}></i>
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
    
    i {
        font-size: 30px;
    }
    
    .menu-container {
        position: fixed;
        top: 0;
        left: 0;
        transition: 0.3s;
        color: var(--white) !important;
        z-index: 3000;
        display: flex;
        justify-content: space-between;
        
        background-color: var(--primary);
        user-select: none;
        padding:16px;
        width: calc(100% - 32px);
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
    
    @media screen and (max-width: 720px) {
        .selected{
            color:var(--primary) !important;
        }
        .menu-container{
            border-radius: 32px 32px 0px 0px ;
            padding:8px 16px;
            background-color: var(--container);
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
        
        i {
            font-size: 24px;    
        }
        .item-title {
            --size: 16px;    
        }
    }
    
    
    </style>