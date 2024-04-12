<script lang="ts">
    import { onMount } from "svelte";

    import animationData from "./animationData.json"
    
    import lottie from 'lottie-web';

    let lottieDiv:HTMLDivElement

    onMount(()=>{
        lottie.loadAnimation({
            container: lottieDiv,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData
        });
    })

</script>

<div bind:this={lottieDiv}></div>