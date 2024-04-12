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

<div class="grid gridCal bg-container-700 ring-1 ring-container-700 gap-[1.1px] rounded-lg overflow-hidden">
		{#each ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"] as day}
			<div class="text-center p-2 bg-container-900">
				<span>{day}</span>
			</div>
		{/each}
		{#each days as day}
			<div class="p-2 bg-container-900">
				<time class="leading-6 bg-primary size-5 grid place-items-center text-white font-bold rounded-full text-xs">{day.getDate()}</time>
			
				<ol class="content">
					{#each $events as event}
						{#if day.getDate() == new Date(event.date).getDate() && day.getMonth() == new Date(event.date).getMonth()}
							<a class="eventLink" href={`/article?id=${event.article}`}>{event.nom}</a>	
						{/if}
					{/each}
                </ol>
			</div>
		{/each}

	</div>

    <style>

        .gridCal{
            grid-template-columns: repeat(7,1fr);
            grid-template-rows: auto  repeat(4,100px);
        }

    
        .eventLink{
            background: var(--secondary);
            padding:4px;
            border-radius: 16px;
            width: calc(100% - 8px );
            overflow: hidden;
            display: block;
        }
    

        @media (max-width : 767px) {
            .content {
                grid-template-columns: repeat(1,1fr);
            }
        }
    
    </style>