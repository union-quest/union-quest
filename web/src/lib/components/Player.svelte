<script lang="ts">
  import {getPlayer} from '$lib/player/player';

  export let id: string;

  const player = getPlayer(id);
</script>

<div>
  {#if !$player.step}
    <div>Player not loaded</div>
  {:else if $player.error}
    <div>Error: {$player.error}</div>
  {:else if $player.step === 'LOADING'}
    <div>Loading Player...</div>
  {:else if !$player.data}
    <div>Player failed to load!</div>
  {:else}
    <div class="text-2xl">Player {$player.data.id}</div>
    <div>Vouch: {$player.data.vouch}</div>
    <div class="flex flex-col">
      <div class="text-xl">Inventory</div>
      {#each $player.data.balances as b}
        <div>
          {b.item.symbol}{b.item.name} | balance:{b.value} | skill:{b.skill}
        </div>
      {/each}
    </div>
  {/if}
</div>
