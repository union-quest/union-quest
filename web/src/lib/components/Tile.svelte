<script lang="ts">
  import {flow, wallet} from '$lib/blockchain/wallet';
  import type {Players} from '$lib/player/players';
  import type {Village} from '$lib/village/villages';

  export let x: number;
  export let y: number;
  export let village: Village;
  export let players: Players;

  async function move(x, y) {
    await flow.execute((contracts) => contracts.UnionQuestCore.move(x, y));
  }
</script>

<svg width="100" on:click={() => move(x, y)}>
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
