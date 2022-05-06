<script lang="ts">
  import {flow} from '$lib/blockchain/wallet';
  import type {Player} from '$lib/player/player';
  import type {Players} from '$lib/player/players';
  import type {Tile} from '$lib/tile/tiles';
  import Modal from '$lib/components/styled/Modal.svelte';
  import Blockie from '$lib/components/generic/CanvasBlockie.svelte';
  import {onMount} from 'svelte';

  export let x: number;
  export let y: number;
  export let tile: Tile | null;
  export let players: Players;
  export let currentPlayer: Player | null;

  const SPEED_DIVISOR = 10;

  let showModal = false;
  let tab = 0;

  function distance(x0: number, y0: number, x1: number, y1: number) {
    const xDiff = x1 - x0;
    const yDiff = y1 - y0;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  }

  const roundGood = (n: number) => Math.round(n * 10) / 10;

  async function move(x, y) {
    await flow.execute((contracts) => contracts.UnionQuest.move(x, y));
  }

  let currentTimestamp = Date.now();
  let currentX = 0;
  let currentY = 0;

  onMount(() => {
    const interval = setInterval(() => {
      currentTimestamp = Date.now();

      const distanceNeeded = distance(
        parseInt(currentPlayer.startX),
        parseInt(currentPlayer.startY),
        parseInt(currentPlayer.endX),
        parseInt(currentPlayer.endY)
      );
      const distanceTravelled = (currentTimestamp / 1000 - parseInt(currentPlayer.startTimestamp)) / SPEED_DIVISOR;

      if (distanceTravelled < distanceNeeded) {
        const angle = Math.atan2(parseInt(currentPlayer.endX), parseInt(currentPlayer.endY));

        currentX = Math.round(distanceTravelled * Math.sin(angle));
        currentY = Math.round(distanceTravelled * Math.cos(angle));
      } else {
        currentX = parseInt(currentPlayer.endX);
        currentY = parseInt(currentPlayer.endY);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div>
  {#if showModal}
    <Modal title={`Tile (${x},${y})`} on:close={() => (showModal = false)} closeButton={true}>
      <div class="flex flex-col h-96">
        <div>
          <button
            class="flex-shrink-0 bg-gray-500 hover:bg-gray-600 {tab === 0
              ? 'border-yellow-500'
              : 'border-gray-500'}  hover:border-gray-600 text-sm border-4
text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
            type="button"
            on:click={() => (tab = 0)}>Overview</button
          >
          <button
            class="flex-shrink-0 bg-gray-500 hover:bg-gray-600 {tab === 1
              ? 'border-yellow-500'
              : 'border-gray-500'} hover:border-gray-600 text-sm border-4
text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
            type="button"
            on:click={() => (tab = 1)}>Residents</button
          >
        </div>
        <div class="p-2">
          {#if tab === 0}
            <div class="text-xl">Overview</div>
            {#if tile && tile.resourceId === '1'}
              A forest.
            {:else if tile && tile.resourceId === '2'}
              A mine.
            {:else}
              An empty desert.
            {/if}
            <div class="rounded-md border-2 m-1">
              <div class="p-2 border-2 border-dashed">
                <div class="text-lg">Travel</div>
                {#if currentPlayer}
                  <div class="p-1">
                    <div>
                      This tile is {roundGood(
                        distance(x, y, parseInt(currentPlayer.endX), parseInt(currentPlayer.endY))
                      )} unit(s) from you.
                    </div>
                    <div>
                      It will take
                      <span class="font-bold"
                        >{roundGood(
                          SPEED_DIVISOR * distance(x, y, parseInt(currentPlayer.endX), parseInt(currentPlayer.endY))
                        )} seconds</span
                      >
                      to walk here.
                    </div>
                    <button
                      on:click={() => move(x, y)}
                      class="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-sm border-4
        text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                      type="button"
                    >
                      BEGIN JOURNEY
                    </button>
                  </div>
                {:else}
                  <div>You are already busy.</div>
                {/if}
              </div>
            </div>
          {/if}
          {#if tab === 1}
            <div class="text-xl">Residents</div>
            <div class="italic">
              There are {players.filter((p) => p.endX === x.toString() && p.endX === y.toString()).length} player(s) at this
              tile.
            </div>
            <ul class="list-none">
              {#each players.filter((p) => p.endX === x.toString() && p.endX === y.toString()) as player}
                <li>
                  <div class="flex border-2 border-dashed">
                    <Blockie address={player.id} class="m-1 h-6 w-6" />
                    <a href={`https://kovan.union.finance/profile/${player.id}`}>
                      {player.id.slice(0, 4)}...{player.id.slice(-4)}
                    </a>
                  </div>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      </div>
    </Modal>
  {/if}
  <div
    on:click={() => (showModal = true)}
    class="border-4 hover:border-green-500 {currentPlayer && Math.round(currentX) === x && Math.round(currentY) === y
      ? 'border-yellow-500 hover:border-yellow-500'
      : currentPlayer && parseInt(currentPlayer.endX) === x && parseInt(currentPlayer.endY) === y
      ? 'border-red-500 hover:border-red-500'
      : 'border-black-500'}"
  >
    <div class="absolute grid grid-cols-3">
      {#each players
        .filter((player) => player.endX === x.toString() && player.endY === y.toString())
        .slice(0, 9) as player}
        <Blockie address={player.id} class="m-1 h-6 w-6" />
      {/each}
    </div>
    <div class="absolute grid grid-cols-3">
      {#each players
        .filter((player) => player.endX === x.toString() && player.endY === y.toString())
        .slice(0, 9) as player}
        <Blockie address={player.id} class="m-1 h-6 w-6" />
      {/each}
    </div>
    <div class="flex w-24 h-24 text-4xl justify-center">
      {#if tile && tile.resourceId === '1'}
        🌲
      {:else if tile && tile.resourceId === '2'}
        🪨
      {:else}
        🏜️
      {/if}
    </div>
  </div>
</div>
