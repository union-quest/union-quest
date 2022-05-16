<script lang="ts">
  import {flow} from '$lib/blockchain/wallet';
  import type {Player} from '$lib/player/player';
  import {shopItems} from '$lib/item/items';
  import Modal from './styled/Modal.svelte';
  import DaiSymbol from './DaiSymbol.svelte';
  import type {BigNumber} from '@ethersproject/bignumber';

  export let currentPlayer: Player | null;
  export let balance: BigNumber;

  async function buy(id: string, amount: string) {
    await flow.execute((contracts) => contracts.UnionQuest.buy(id, amount));
  }

  async function sell(id: string, amount: string) {
    await flow.execute((contracts) => contracts.UnionQuest.sell(id, amount));
  }

  let showModal = false;
</script>

<div class="h-full">
  {#if showModal}
    <Modal title={`Shop`} on:close={() => (showModal = false)} closeButton={true}>
      <div class="flex flex-col">
        <div class="flex border-2 justify-center m-2 w-fit">
          You own
          {balance.div('1000000000000000000')}
          <DaiSymbol />
        </div>
        <div class="border-2 p-2">
          {#if !$shopItems.step}
            <div>Messages not loaded</div>
          {:else if $shopItems.error}
            <div>Error: {$shopItems.error}</div>
          {:else if $shopItems.step === 'LOADING'}
            <div>Loading Map...</div>
          {:else if !$shopItems.data}
            <div>Something failed to load!</div>
          {:else}
            {#each $shopItems.data as item}
              <div class="flex flex-col border-2 border-dotted p-1">
                <div class="flex flex-row justify-between">
                  <div>
                    {item.symbol}{item.name}
                  </div>
                  <div class="flex">
                    {item.stake}
                    <DaiSymbol />
                  </div>
                </div>
                {#if currentPlayer}
                  <div class="flex">
                    <div class="border-2 w-full m-1" on:click={() => buy(item.id, '1')}>Buy 1</div>
                    <div class="border-2 w-full m-1" on:click={() => sell(item.id, '1')}>Sell 1</div>
                  </div>
                {/if}
              </div>
            {/each}
          {/if}
        </div>
      </div>
    </Modal>
  {/if}
  <div class="text-xl">Shop</div>
  <button class="border-2 border-gray-700 p-1" on:click={() => (showModal = true)}>Enter the shop</button>
</div>
