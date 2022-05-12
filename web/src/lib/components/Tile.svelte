<script lang="ts">
  import {getPosition, Player} from '$lib/player/player';
  import type {Players} from '$lib/player/players';
  import type {Tile} from '$lib/tile/tiles';
  import Blockie from '$lib/components/generic/CanvasBlockie.svelte';
  import {onMount} from 'svelte';
  import TileModal from './TileModal.svelte';

  export let x: number;
  export let y: number;
  export let tile: Tile | null;
  export let players: Players;
  export let currentPlayer: Player | null;

  let showModal = false;

  let currentTimestamp = Date.now();
  let currentX = 0;
  let currentY = 0;
  let residents = [];

  onMount(() => {
    const interval = setInterval(() => {
      currentTimestamp = Date.now();

      if (currentPlayer) {
        [currentX, currentY] = getPosition(currentPlayer, currentTimestamp / 1000);
      }
      residents = players.filter(
        (p) =>
          Math.round(getPosition(p, currentTimestamp / 1000)[0]) === x &&
          Math.round(getPosition(p, currentTimestamp / 1000)[1]) === y
      );
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div>
  <TileModal {x} {y} {tile} {players} {currentPlayer} bind:showModal />
  <div
    on:click={() => (showModal = true)}
    class="border-4 hover:border-gray-400 {currentPlayer && Math.round(currentX) === x && Math.round(currentY) === y
      ? 'border-blue-500 hover:border-blue-500'
      : currentPlayer && parseInt(currentPlayer.endTile.x) === x && parseInt(currentPlayer.endTile.y) === y
      ? 'border-red-500 hover:border-red-500'
      : 'border-gray-200'}"
  >
    <div class="absolute grid grid-cols-3">
      {#each residents.slice(0, 9) as player}
        <Blockie address={player.id} class="m-1 h-6 w-6 border-2 border-gray-900" />
      {/each}
    </div>
    <div>
      {#if tile && tile.item && tile.item.id === '1'}
        <div class="flex w-24 h-24 text-5xl justify-center items-center bg-green-300">🌲</div>
      {:else if tile && tile.item && tile.item.id === '2'}
        <div class="flex w-24 h-24 text-5xl justify-center items-center bg-gray-300">⛰️</div>
      {:else}
        <div class="flex w-24 h-24 text-5xl justify-center items-center bg-yellow-500">🏜️</div>
      {/if}
    </div>
  </div>
</div>
