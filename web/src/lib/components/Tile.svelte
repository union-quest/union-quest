<script lang="ts">
  import {flow, wallet} from '$lib/blockchain/wallet';
  import type {Player} from '$lib/player/player';
  import type {Players} from '$lib/player/players';
  import type {Village} from '$lib/village/villages';
  import Modal from '$lib/components/styled/Modal.svelte';
  import {onMount} from 'svelte';

  export let x: number;
  export let y: number;
  export let village: Village | null;
  export let players: Players;
  export let currentPlayer: Player | null;

  const DISTANCE_MULTIPLIER = 2;

  let showModal = false;
  let currentTimestamp = Date.now();

  function distance(x0, y0, x1, y1) {
    return Math.abs(x1 - x0) + Math.abs(y1 - y0);
  }

  async function resolveMove() {
    await flow.execute((contracts) => contracts.UnionQuestCore.resolveMove());
  }

  async function beginMove(x, y) {
    await flow.execute((contracts) => contracts.UnionQuestCore.beginMove(x, y));
  }

  onMount(() => {
    const interval = setInterval(() => {
      currentTimestamp = Date.now();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div
  class="border-4 hover:border-green-500 {currentPlayer && players.some((p) => p.id === currentPlayer.id)
    ? 'border-yellow-500 hover:border-yellow-500'
    : 'border-black-500'}"
>
  {#if showModal}
    <Modal
      title={`${village ? `${village.name} (${x},${y})` : `Field (${x},${y})`}`}
      on:close={() => (showModal = false)}
      closeButton={true}
    >
      <div class="flex flex-col">
        <div class="m-2 rounded-md border-4 p-4">
          <div class="text-xl">Overview</div>
          {#if village}
            <div>
              {village.description}
            </div>
          {:else}
            <div>An empty field!</div>
          {/if}
        </div>
        <div class="m-2 rounded-md border-4 p-4 ">
          <div class="text-xl">Players</div>
          <div class="italic">There are {players.length} player(s) in this tile.</div>
          <ul class="list-disc">
            {#each players as player}
              <li>
                <a href={`https://etherscan.io/address/${player.id}`}>{player.id.slice(0, 6)}...{player.id.slice(-4)}</a
                >
              </li>
            {/each}
          </ul>
        </div>

        <div class="m-2 rounded-md border-4 p-4">
          <div class="text-xl">Actions</div>
          <div class="rounded-md border-2 p-4">
            <div class="text-lg">Movement</div>
            {#if currentPlayer && !currentPlayer.arrivalTime}
              <div>
                Distance:
                <span class="italic">
                  |{x} - {currentPlayer.x}| + |{y} - {currentPlayer.y}|
                </span>
                =
                <span class="font-medium">
                  {distance(x, y, currentPlayer.x, currentPlayer.y)} unit(s).
                </span>
              </div>
              <div>
                Your speed:
                <span class="font-medium">
                  {DISTANCE_MULTIPLIER} units/second.
                </span>
              </div>
              <div>
                Travel time:
                <span class="italic">
                  {distance(x, y, currentPlayer.x, currentPlayer.y)} * {DISTANCE_MULTIPLIER}
                </span>
                =
                <span class="font-bold">
                  {DISTANCE_MULTIPLIER * distance(x, y, currentPlayer.x, currentPlayer.y)}
                  seconds
                </span>
                <button
                  on:click={() => beginMove(x, y)}
                  class="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-sm border-4
      text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                  type="button"
                >
                  MOVE HERE
                </button>
              </div>
            {:else if currentPlayer.arrivalTime && currentPlayer.xDestination === x && currentPlayer.yDestination === y && currentPlayer.arrivalTime < currentTimestamp / 1000}
              <div>
                <div>You have arrived!</div>
                <button
                  class="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-sm border-4
        text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                  type="button"
                  disabled={currentPlayer.arrivalTime > currentTimestamp / 1000}
                  on:click={resolveMove}
                >
                  RESOLVE MOVE ({Math.round(currentPlayer.arrivalTime - currentTimestamp / 1000)}s)
                </button>
              </div>
            {:else if currentPlayer.arrivalTime && currentPlayer.xDestination === x && currentPlayer.yDestination === y}
              <div>
                <div>You are travelling here!</div>
                <button
                  class="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-sm border-4
      text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                  type="button"
                  disabled={currentPlayer.arrivalTime > currentTimestamp / 1000}
                  on:click={resolveMove}
                >
                  RESOLVE MOVE ({Math.round(currentPlayer.arrivalTime - currentTimestamp / 1000)}s)
                </button>
              </div>
            {:else}
              <div>You are already travelling to another tile.</div>
            {/if}
          </div>
        </div>
      </div>
    </Modal>
  {/if}
  <svg width="100" on:click={() => (showModal = true)}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
      <rect fill="#009A17" width="1" height="1" />
      <path d="M 0.161,0.178 0.249,0.336" fill="none" stroke="#004400" stroke-width="0.02" />
      <path d="M 0.314,0.173 V 0.33" fill="none" stroke="#004400" stroke-width="0.02" />
      <path d="M 0.469,0.178 0.376,0.336" fill="none" stroke="#004400" stroke-width="0.02" />
      <path d="m 0.48277796,0.53428125 0.088,0.158" fill="none" stroke="#004400" stroke-width="0.02" />
      <path d="m 0.63577796,0.52928125 v 0.157" fill="none" stroke="#004400" stroke-width="0.02" />
      <path d="m 0.79077796,0.53428125 -0.093,0.158" fill="none" stroke="#004400" stroke-width="0.02" />
    </svg>
    {#if village}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
        <polygon fill="gold" points="0.25,0.35 0.5,0.1 0.75,0.35" />
        <rect fill="darkkhaki" x="0.25" y="0.35" width="0.5" height="0.5" />
        <rect fill="brown" x="0.45" y="0.65" width="0.1" height="0.2" />
      </svg>
    {/if}
    {#each players as player}
      {#if currentPlayer && player.id === currentPlayer.id}
        {#if player.arrivalTime}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
            <circle fill="white" stroke-width="0.1" stroke="red" r="0.25" cx="0.5" cy="0.5" />
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
            <circle fill="white" stroke-width="0.1" stroke="green" r="0.25" cx="0.5" cy="0.5" />
          </svg>
        {/if}
      {:else if player.arrivalTime}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
          <circle fill="black" stroke-width="0.1" stroke="red" r="0.25" cx="0.5" cy="0.5" />
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
          <circle fill="black" stroke-width="0.1" stroke="green" r="0.25" cx="0.5" cy="0.5" />
        </svg>
      {/if}
    {/each}
  </svg>
</div>
