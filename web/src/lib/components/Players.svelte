<script lang="ts">
  import {getSkill, Player as PlayerType} from '$lib/player/player';
  import {onMount} from 'svelte';
  import Modal from './styled/Modal.svelte';
  import Blockie from '$lib/components/generic/CanvasBlockie.svelte';
  import Player from '$lib/components/Player.svelte';

  export let players: PlayerType[];

  let currentTimestamp = Date.now();
  let showModal = false;
  let selectedPlayer = '0';

  onMount(() => {
    const interval = setInterval(() => {
      currentTimestamp = Date.now();
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div>
  {#if showModal}
    <Modal on:close={() => (showModal = false)} closeButton={true}><Player id={selectedPlayer} /></Modal>
  {/if}
  <div class="text-xl">Players</div>
  <div class="flex flex-col">
    {#each players as player}
      <div class="flex justify-between p-1">
        <div
          class="flex"
          on:click={() => {
            showModal = true;
            selectedPlayer = player.id;
          }}
        >
          <Blockie address={player.id} class="h-6 w-6" />
          {player.id.slice(0, 4)}...{player.id.slice(-4)}
        </div>
        <div>
          <div class="inline font-medium">Total level:</div>
          {Math.round(getSkill(player, currentTimestamp / 1000, 1) + getSkill(player, currentTimestamp / 1000, 2))}
        </div>
      </div>
      <div />
    {/each}
  </div>
</div>

<!-- <a rel="noopener" target="_blank" href={`https://kovan.union.finance/profile/${player.id}`}>
  <div class="flex">
    <Blockie address={player.id} class="h-6 w-6" />
    {player.id.slice(0, 4)}...{player.id.slice(-4)}
  </div>
</a> -->
