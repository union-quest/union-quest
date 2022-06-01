<script lang="ts">
  import {chainId} from '$lib/config';

  import {getPlayer} from '$lib/player/player';
  import ItemButton from './ItemButton.svelte';

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
    <div class="border-2 bg-gray-200 border-gray-500 m-1 p-2">
      <a
        rel="noopener"
        target="_blank"
        href={`https://${chainId === '42161' ? 'arbitrum' : chainId === '42' ? 'kovan' : 'app'}.union.finance/profile/${
          $player.data.id
        }`}
      >
        View on
        {#if chainId === '42161'}
          arbitrum.union.finance
        {:else if chainId === '42'}
          kovan.union.finance
        {:else}
          app.union.finance
        {/if}
      </a>
    </div>
    <div class="flex flex-col">
      <div class="text-xl">Inventory</div>
      {#each $player.data.balances as b}
        <div>
          <ItemButton item={b.item} />
          | balance:{b.value} | skill:{b.skill}
        </div>
      {/each}
    </div>
  {/if}
</div>
