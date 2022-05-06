<script lang="ts">
  import type {Player} from '$lib/player/player';
  import {onMount} from 'svelte';
  export let currentPlayer: Player | null;

  let currentTimestamp = Date.now();
  let x = 0;
  let y = 0;

  onMount(() => {
    const interval = setInterval(() => {
      currentTimestamp = Date.now();

      const distanceTravelled = (currentTimestamp / 1000 - parseInt(currentPlayer.startTimestamp)) / 10;

      const angle = Math.atan2(parseInt(currentPlayer.endX), parseInt(currentPlayer.endY));

      x = Math.round(distanceTravelled * Math.sin(angle));
      y = Math.round(distanceTravelled * Math.cos(angle));
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div class="flex flex-col justify-center text-center dark:text-white">
  <div class="text-xl text-center">Player Status:</div>
  You started walking {Math.round(currentTimestamp / 1000) - parseInt(currentPlayer.startTimestamp)} seconds ago.
  <div>
    You are at tile ({x}, {y}).
  </div>
  <div>
    You are walking towards tile ({currentPlayer.endX}, {currentPlayer.endY}).
  </div>
</div>
