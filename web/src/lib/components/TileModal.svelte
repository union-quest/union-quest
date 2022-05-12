<script lang="ts">
  import {flow} from '$lib/blockchain/wallet';
  import {distance, getPosition, getSkill, Player} from '$lib/player/player';
  import type {Players} from '$lib/player/players';
  import type {Tile} from '$lib/tile/tiles';
  import Modal from '$lib/components/styled/Modal.svelte';
  import Blockie from '$lib/components/generic/CanvasBlockie.svelte';
  import {onMount} from 'svelte';
  import Shop from './Shop.svelte';

  export let x: number;
  export let y: number;
  export let tile: Tile | null;
  export let players: Players;
  export let currentPlayer: Player | null;
  export let showModal: boolean;

  const SPEED_DIVISOR = 10;

  let tab = 0;

  const roundGood = (n: number) => Math.round(n * 10) / 10;

  async function move(x, y) {
    await flow.execute((contracts) => contracts.UnionQuest.move(x, y));
  }

  let currentTimestamp = Date.now();
  let residents = [];

  onMount(() => {
    const interval = setInterval(() => {
      currentTimestamp = Date.now();

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
  {#if showModal}
    <Modal title={`Tile (${x},${y})`} on:close={() => (showModal = false)} closeButton={true}>
      <div class="flex flex-col border-2 border-gray-400 h-64 text-center">
        <div class="flex text-4xl justify-start">
          {#each ['🧭', '🏪', '👪', '📜'] as icon, i}
            <button
              class="w-12 border-2 border-gray-700 {tab === i ? 'bg-red-700' : 'bg-neutral-400'}"
              on:click={() => (tab = i)}
            >
              {icon}
            </button>
          {/each}
        </div>
        <div class="p-2 border-2 border-gray-400 h-full">
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

                <div>
                  {#if tile && tile.item}
                    Once you arrive, you will start gathering
                    <span class="inline font-bold">
                      {tile.item.symbol}{tile.item.name}
                    </span>
                    at a rate of
                    <div class="inline font-bold">
                      {Math.round(getSkill(currentPlayer, currentTimestamp / 1000, parseInt(tile.item.id)) / 10)}
                    </div>
                    units/s.
                  {:else}
                    There are no resources on this tile.
                  {/if}
                </div>
                <button
                  on:click={() => move(x, y)}
                  class="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-sm border-4
  text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed m-1"
                  type="button"
                >
                  BEGIN JOURNEY
                </button>
              </div>
            {:else}
              <div>You need to join the game first!</div>
            {/if}
          {:else if tab === 3}
            <div class="text-xl">Lore</div>
            {#if tile && tile.item && tile.item.id === '1'}
              This tile is a forest.
            {:else if tile && tile.item && tile.item.id === '2'}
              This tile is a mine.
            {:else}
              This tile is an empty desert.
            {/if}
          {:else if tab === 1}
            <Shop {currentPlayer} />
          {:else if tab === 2}
            <div class="text-xl">Residents</div>
            <div class="italic">
              There are {residents.length} player(s) at this tile.
            </div>
            <ul class="list-none">
              {#each residents as player}
                <a rel="noopener" target="_blank" href={`https://kovan.union.finance/profile/${player.id}`}>
                  <li class="flex justify-between w-full border-2 border-dashed">
                    <div class="flex">
                      <Blockie address={player.id} class="m-1 h-6 w-6" />
                      <div>
                        {player.id.slice(0, 4)}...{player.id.slice(-4)}
                      </div>
                    </div>
                    <div>
                      <div class="inline font-medium">Total level:</div>
                      {Math.round(
                        getSkill(currentPlayer, currentTimestamp / 1000, 1) +
                          getSkill(currentPlayer, currentTimestamp / 1000, 2)
                      )}
                    </div>
                  </li>
                </a>
              {/each}
            </ul>
          {/if}
        </div>
      </div>
    </Modal>
  {/if}
</div>
