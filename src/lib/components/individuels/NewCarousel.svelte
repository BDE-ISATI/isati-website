
<script lang="ts">
    import { bucket } from "$lib/config";
    import * as Hammer from "hammerjs";
    import { onMount } from "svelte";

    export let events

    events = events.filter((row) => {
        return row.POSTER
    })

    let carousel:HTMLDivElement
    let globalIndex = 0

    onMount(() =>{
        var mc = new Hammer.Manager(carousel)

        var Pan = new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL });
        mc.add(Pan);

        mc.on("panend", function(ev) {
            if (ev.direction == 2) {
                globalIndex = Math.min(events.length-1,globalIndex+1)
            }
            else if (ev.direction == 4) {
                globalIndex = Math.max(globalIndex-1,0)
            }
        })

    })

    function getSide(globalIndex:number,index:number) {
        if (globalIndex>index) return "-left-20 -rotate-3 scale-75 opacity-60 z-0"
        if (globalIndex==index) return "left-0 z-10"
        if (globalIndex<index) return "-right-20 rotate-3 scale-75 opacity-60 z-0"
    }

</script>

<div bind:this={carousel}>
    <div class="relative w-80 aspect-[0.707]">
        {#if events.length == 0}

            <div class="grid place-center rounded-3xl bg-container-800 w-80 aspect-[0.707]">
                <div class="flex flex-col justify-center gap-4 w-36 m-auto">
                    <svg class="h-28 fill-container-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 133 112" fill="none">
                        <path d="M119.99 35.0206C101.464 13.4647 72.0404 15.394 68.3701 15.6953C69.1558 20.9128 71.0798 24.4754 73.4288 26.9536C75.2397 28.8721 75.977 28.7403 78.3987 31.1512C82.3057 35.0421 84.1597 39.1428 85.0934 41.2551C87.324 46.3057 86.985 48.5498 88.0694 51.7895C89.4739 55.9737 93.1038 61.3687 103.132 66.1906C100.517 69.4276 95.8 74.3221 88.6855 76.7681C69.9604 83.2017 55.6104 65.4291 34.4313 67.014C26.1867 67.6302 14.0728 71.3919 0 87.3913C6.78078 85.1256 15.6577 83.643 25.3095 86.2477C26.4074 86.5437 27.4729 86.8827 28.5008 87.2541C27.5886 87.6684 26.5096 88.2658 25.3714 89.1322C24.5534 89.7565 23.8646 90.3915 23.2995 90.9862C27.5994 91.2095 30.7906 92.2966 32.8464 93.198C41.6399 97.0512 43.997 103.749 54.2758 107.978C54.2758 107.978 56.3262 108.821 59.5928 109.679C71.3246 112.765 109.491 116.094 125.969 91.492C132.416 81.8644 132.871 71.9462 132.976 68.8222C133.573 50.8262 122.918 38.4244 119.99 35.0206ZM109.87 46.5963L108.729 50.993L92.7217 46.8412L103.797 35.9677L97.2799 34.2779L98.4181 29.8812L113.772 33.8608L102.645 44.7208L109.87 46.5963Z" fill="#7E7E7E"/>
                        <path d="M84.8727 54.3942C83.1533 49.5535 84.2216 46.3461 81.9801 40.8972C79.9378 35.9408 76.569 32.5692 73.9508 30.4516C72.7104 29.4668 71.3112 28.1079 70.0788 26.2728C66.1556 20.4123 66.8256 13.9786 67.1512 11.8099C64.3313 13.3409 61.0808 15.6711 58.3685 19.2418C57.9541 19.78 57.5801 20.3208 57.2357 20.8509C56.0168 19.1907 54.6821 17.0165 53.5978 14.3204C51.2352 8.43292 51.2971 3.09709 51.5958 0C48.5552 1.88086 43.6984 5.43807 39.5842 11.4358C36.4655 15.9779 34.8699 20.3262 34.0196 23.3883C31.7943 24.6099 14.3742 34.5443 12.3265 53.3636C11.6135 59.9157 12.9884 65.4641 14.3581 69.2123C25.5517 63.0155 34.4959 62.1356 40.604 62.48C60.026 63.5752 70.9129 78.2023 86.0836 73.7463C91.0292 72.2933 94.53 69.3711 96.6072 67.2938C89.1645 62.8567 86.1831 58.0806 84.8727 54.3942ZM30.718 49.8791C28.9448 50.1831 27.3788 50.6298 26.0441 51.1061C29.1251 53.6354 32.2033 56.1647 35.2843 58.6941C32.0042 57.1092 28.6165 55.336 25.1589 53.3475C23.8404 52.5914 22.5569 51.8272 21.3057 51.063C22.7721 50.0567 28.369 46.4725 35.1766 47.8879C37.2512 48.3184 38.9437 49.1122 40.2219 49.8844C37.8486 49.4808 34.5443 49.2225 30.718 49.8791Z" fill="#7E7E7E"/>
                        <path d="M107.013 11.8637L114.926 12.3991L110.465 18.7467L114.189 18.9996L114.035 21.2599L105.786 20.7002L110.22 14.3499L106.859 14.1212L107.013 11.861V11.8637Z" fill="#7E7E7E"/>
                    </svg>
                    <span class="text-container-500 text-center font-extrabold text-sm">Aucun évenement n’est prévu pour les jours à venir</span>
                </div>
            </div>
        {:else}
            {#each events as event,i }
                <img draggable=false class="select-none transition duration-300 absolute rounded-3xl w-80 aspect-[0.707] { getSide(globalIndex,i) }" src={bucket + "/events/" + event.ID + ".webp"} alt="">
            {/each}
        {/if}
    </div>
</div>