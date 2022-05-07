<script lang="ts">
  import {flow} from '$lib/blockchain/wallet';
  import {distance, getPosition, Player} from '$lib/player/player';
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

  const roundGood = (n: number) => Math.round(n * 10) / 10;

  async function move(x, y) {
    await flow.execute((contracts) => contracts.UnionQuest.move(x, y));
  }

  let currentTimestamp = Date.now();
  let currentX = 0;
  let currentY = 0;
  let playersOnTile = [];

  onMount(() => {
    const interval = setInterval(() => {
      currentTimestamp = Date.now();

      if (currentPlayer) {
        [currentX, currentY] = getPosition(currentPlayer, currentTimestamp / 1000);
      }
      playersOnTile = players.filter(
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
  {#if showModal}
    <Modal title={`Tile (${x},${y})`} on:close={() => (showModal = false)} closeButton={true}>
      <div class="flex flex-col border-2 border-gray-400 h-64 text-center">
        <div class="flex text-4xl justify-start">
          <button
            class="w-12 border-2 border-gray-700 {tab === 0 ? 'bg-red-700' : 'bg-neutral-400'}"
            on:click={() => (tab = 0)}
          >
            🧭
          </button>
          <button
            class="w-12 border-2 border-gray-700 {tab === 1 ? 'bg-red-700' : 'bg-neutral-400'}"
            on:click={() => (tab = 1)}
          >
            📜
          </button>
          <button
            class="w-12 border-2 border-gray-700 {tab === 2 ? 'bg-red-700' : 'bg-neutral-400'}"
            on:click={() => (tab = 2)}
          >
            🏪
          </button>
          <button
            class="w-12 border-2 border-gray-700 {tab === 3 ? 'bg-red-700' : 'bg-neutral-400'}"
            on:click={() => (tab = 3)}
          >
            👪
          </button>
        </div>
        <div class="p-2 border-2 border-gray-400">
          {#if tab === 0}
            <div class="text-xl">Travel</div>
            {#if currentPlayer}
              <div class="p-1">
                <div>
                  This tile is {roundGood(
                    distance(x, y, parseInt(currentPlayer.endTile.x), parseInt(currentPlayer.endTile.y))
                  )} unit(s) from you.
                </div>
                <div>
                  It will take
                  <span class="font-bold">
                    {roundGood(
                      SPEED_DIVISOR *
                        distance(x, y, parseInt(currentPlayer.endTile.x), parseInt(currentPlayer.endTile.y))
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
          {:else if tab === 1}
            <div class="text-xl">Lore</div>
            {#if tile && tile.resourceId === '1'}
              This tile is a forest.
            {:else if tile && tile.resourceId === '2'}
              This tile is a mine.
            {:else}
              This tile is an empty desert.
            {/if}
          {:else if tab === 2}
            <div class="text-xl">Shop</div>
            <div>This tile doesn't have a shop.</div>
          {:else}
            <div class="text-xl">Residents</div>
            <div class="italic">
              There are {playersOnTile.length} player(s) at this tile.
            </div>
            <ul class="list-none">
              {#each playersOnTile as player}
                <li>
                  <div class="flex border-2 border-dashed">
                    <Blockie address={player.id} class="m-1 h-6 w-6" />
                    <a rel="noopener" target="_blank" href={`https://kovan.union.finance/profile/${player.id}`}>
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
    class="border-4 hover:border-gray-400 {currentPlayer && Math.round(currentX) === x && Math.round(currentY) === y
      ? 'border-yellow-500 hover:border-yellow-500'
      : currentPlayer && parseInt(currentPlayer.endTile.x) === x && parseInt(currentPlayer.endTile.y) === y
      ? 'border-red-500 hover:border-red-500'
      : 'border-gray-200'}"
  >
    <div class="absolute grid grid-cols-3">
      {#each playersOnTile.slice(0, 9) as player}
        <Blockie address={player.id} class="m-1 h-6 w-6" />
      {/each}
    </div>
    <div class="flex w-24 h-24 text-5xl justify-center items-center">
      {#if tile && tile.resourceId === '1'}
        🌲
      {:else if tile && tile.resourceId === '2'}
        ⛰️
      {:else}
        🏜️
      {/if}
    </div>
  </div>
</div>
