<script lang="ts">
    import { events } from "$lib/store";

    var date = new Date();

    var firstDay = new Date();

    firstDay.setHours(-24 * (firstDay.getDay() - 1));

    var lastDay = new Date(firstDay);

    lastDay.setHours(24 * (7*3));
    lastDay.setHours(24 * (7 - lastDay.getDay()));

    let days:Date[] = []

    do {
        days.push(new Date(firstDay))
        firstDay.setHours(24)
    } while(firstDay<=lastDay)
</script>

<div class="grid gridCal bg-container-700 ring-1 ring-container-700 gap-[1.1px] rounded-lg overflow-auto grid-cols-[repeat(7,calc(729.6px_/_7))] grid-rows-[auto_repeat(4,8em)]">
    {#each ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"] as day}
        <div class="text-center p-2 bg-container-900 w-30">
            <span>{day}</span>
        </div>
    {/each}
    {#each days as day}
        <div class="p-2 bg-container-900 height-30">
            <time class="leading-6 bg-primary size-5 grid place-items-center text-white font-bold rounded-full text-xs">{day.getDate()}</time>
        
            <ol class="flex gap-1 flex-col mt-1">
                {#each $events as event}
                    {#if day.getDate() == new Date(event.date).getDate() && day.getMonth() == new Date(event.date).getMonth()}
                        <a class="text-sm text-ellipsis	overflow-hidden bg-container-800 px-1 py-0.5 rounded-lg w-full leading-0" href={event.article ? `/article?id=${event.article}` : undefined}>{event.nom}</a>	
                    {/if}
                {/each}
            </ol>
        </div>
    {/each}
</div>