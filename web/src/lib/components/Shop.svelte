<script lang="ts">
  import {flow} from '$lib/blockchain/wallet';
  import type {Player} from '$lib/player/player';
  import {items} from '$lib/item/items';

  export let currentPlayer: Player | null;

  async function buy(id: string, amount: string) {
    await flow.execute((contracts) => contracts.UnionQuest.buy(id, amount));
  }

  async function sell(id: string, amount: string) {
    await flow.execute((contracts) => contracts.UnionQuest.sell(id, amount));
  }
</script>

<div class="h-full">
  <div class="text-xl">Shop</div>

  <div class="flex flex-row justify-around">
    <div>
      {#if !$items.step}
        <div>Messages not loaded</div>
      {:else if $items.error}
        <div>Error: {$items.error}</div>
      {:else if $items.step === 'LOADING'}
        <div>Loading Map...</div>
      {:else if !$items.data}
        <div>Something failed to load!</div>
      {:else}
        {#each $items.data as item}
          <div class="flex">
            <div>
              {item.symbol}{item.name}
            </div>
            {#if currentPlayer}
              <div class="border-2" on:click={() => buy(item.id, '1')}>Buy</div>
              <div class="border-2" on:click={() => sell(item.id, '1')}>Sell</div>
            {/if}
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>
