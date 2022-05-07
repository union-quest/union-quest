<script lang="ts">
  import {getPosition, getSkill, Player} from '$lib/player/player';
  import {onMount} from 'svelte';
  export let currentPlayer: Player | null;

  const roundGood = (n: number) => Math.round(n * 10) / 10;

  let currentTimestamp = Date.now();
  let currentX = 0;
  let currentY = 0;

  onMount(() => {
    const interval = setInterval(() => {
      currentTimestamp = Date.now();

      [currentX, currentY] = getPosition(currentPlayer, currentTimestamp / 1000);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div class="flex flex-col justify-center text-center dark:text-white">
  <div class="text-xl text-center">Player Status:</div>
  {#if currentX === parseInt(currentPlayer.endTile.x) && currentY === parseInt(currentPlayer.endTile.y)}
    <div>
      {#if currentPlayer.endTile.resourceId === '1'}
        Chopping wood at
      {:else if currentPlayer.endTile.resourceId === '2'}
        Mining stone at
      {:else}
        Standing at
      {/if}
      tile ({currentPlayer.endTile.x}, {currentPlayer.endTile.y}).
    </div>
  {:else}
    <div>
      {#if currentPlayer.endTile.resourceId === '1'}
        Walking to chop wood at
      {:else if currentPlayer.endTile.resourceId === '2'}
        Walking to mine stone at
      {:else}
        Walking to
      {/if}
      tile ({currentPlayer.endTile.x}, {currentPlayer.endTile.y}).
    </div>
  {/if}
  <div>
    🌲: {roundGood(getSkill(currentPlayer, currentTimestamp / 1000, 1))}
  </div>
  <div>
    🪨: {roundGood(getSkill(currentPlayer, currentTimestamp / 1000, 2))}
  </div>
</div>
