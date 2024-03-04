<script lang="ts" setup>
    import Logo from "./Logo.svelte";

    type MenuItem = {
        title: string;
        route: string;
        class: string;
    };
    
    export let menuItems: MenuItem[]
    export let id : string = ""

    let show = false;

    function invert_show() {
        show=!show;
        let menu_classes = document.querySelector(".menu-container")?.classList;

        if (show) menu_classes?.add("hide");
        else menu_classes?.remove("hide");
    }

    </script>
    
    <nav id={id} class="menu-container">
        
        <a class="menu-item">
            <div class="icon-container">
                <Logo></Logo>
            </div>
        </a>
        {#each menuItems as item }
            <a href={item.route} class="menu-item">
                <div class="icon-container">
                    <i class={item.class}></i>
                    <span class="item-title">{item.title}</span>
                </div>
            </a>
        {/each}
    </nav>

<style>


a {
    color:var(--text);
    text-decoration: unset;
    font-size: 20px;
}

.icon-container > i {
    font-size: 30px;
}

.hide{
    margin-bottom:-80px;
    margin-left:0px;
}


.menu-container {
    position: relative;
	transition: 0.3s;
	color: var(--text);

	display: grid;
	grid-auto-flow: column;

	background-color: var(--primary);
	user-select: none;
}

.menu-container > .menu-item {
	display: flex;
	align-items: center;
	cursor: pointer;
}

.menu-container > .menu-item > .icon-container {
	/* width: 65px; */
	display: grid;
	place-items: center;
    width:unset;
    flex:auto;
    gap:8px;
}

.menu-container > .menu-item:hover * {
	border-color: var(--red);
	color: var(--red);
	fill: var(--red);
}


.hide > #show_btn > i{
	transform: rotate(180deg);
}

#show_btn{
	transition: 0.3s;
	position: absolute;
    left:50%;
    transform:translate(-50%,-40px) rotate(-90deg) ;
	padding: 15px 5px;
	background: var(--compl);
	border-radius: 0 1em 1em 0;
}

@media screen and (max-width: 1200px) {
    .menu-container > .menu-item > .item-title {
        display: none;
    }
}

@media screen and (max-width: 540px) {
	#show_btn{
		display: none;
	}

	.hide{
		margin: unset;
	}

}
    </style>