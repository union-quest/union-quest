<script lang="ts">
  import {flow, wallet} from '$lib/blockchain/wallet';
  import type {Player} from '$lib/player/player';
  import type {Players} from '$lib/player/players';
  import type {Village} from '$lib/village/villages';
  import Modal from '$lib/components/styled/Modal.svelte';

  export let x: number;
  export let y: number;
  export let village: Village | null;
  export let players: Players;
  export let currentPlayer: Player | null;

  const DISTANCE_MULTIPLIER = 2;

  let showModal = false;

  function distance(x0, y0, x1, y1) {
    return Math.abs(x1 - x0) + Math.abs(y1 - y0);
  }

  async function move(x, y) {
    await flow.execute((contracts) => contracts.UnionQuestCore.move(x, y));
  }
</script>

<div
  class="border-4 hover:border-green-500 {players.some((p) => p.id === $wallet.address.toLowerCase())
    ? 'border-yellow-500 hover:border-yellow-500'
    : 'border-black-500'}"
>
  {#if showModal}
    <Modal title={`Tile ${x},${y}`} on:close={() => (showModal = false)} closeButton={true}>
      {#if village}
        <div>
          <div>Name: {village.name}</div>
          <div>Description: {village.description}</div>
        </div>
        <div>This tile is a village.</div>
      {:else}
        <div>This tile is an empty field.</div>
      {/if}
      <div>There are {players.length} player(s) in this square.</div>
      {#if currentPlayer}
        <div>
          This tile is {distance(x, y, currentPlayer.x, currentPlayer.y)} units away. It will take
          {DISTANCE_MULTIPLIER * distance(x, y, currentPlayer.x, currentPlayer.y)} seconds to travel to.
        </div>
      {/if}
      <button
        on:click={() => move(x, y)}
        class="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-sm border-4
        text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
        type="button"
      >
        MOVE
      </button>
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
      {#if player.id === $wallet.address.toLowerCase()}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
          <circle fill="white" r="0.25" cx="0.5" cy="0.5" />
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
          <circle fill="black" r="0.25" cx="0.5" cy="0.5" />
        </svg>
      {/if}
    {/each}
  </svg>
</div>
