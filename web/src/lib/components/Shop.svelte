<script lang="ts">
  import {chain, flow, wallet} from '$lib/blockchain/wallet';
  import type {Player} from '$lib/player/player';
  import {shopItems} from '$lib/item/items';
  import Modal from './styled/Modal.svelte';
  import {BigNumber} from '@ethersproject/bignumber';
  import ItemButton from './ItemButton.svelte';
  import DaiValue from './DaiValue.svelte';
  import {chainId} from '$lib/config';
  import {onMount} from 'svelte';

  export let currentPlayer: Player | null;

  async function buy(id: string, amount: string) {
    await flow.execute((contracts) => contracts.UnionQuest.buy(id, amount));
  }

  async function sell(id: string, amount: string) {
    await flow.execute((contracts) => contracts.UnionQuest.sell(id, amount));
  }

  let showModal = false;
  let balance = BigNumber.from('0');

  onMount(() => {
    chainId === '1337'
      ? chain.contracts.FaucetERC20.balanceOf($wallet.address).then((x) => (balance = x))
      : chain.contracts.DAI.balanceOf($wallet.address).then((x) => (balance = x));
  });
</script>

<div class="h-full">
  {#if showModal}
    <Modal title="Shop" on:close={() => (showModal = false)} closeButton={true}>
      <div class="flex flex-col">
        <DaiValue value={balance} />
        <div class="border-2 p-2">
          {#if !$shopItems.step}
            <div>Messages not loaded</div>
          {:else if $shopItems.error}
            <div>Error: {$shopItems.error}</div>
          {:else if $shopItems.step === 'LOADING'}
            <div>Loading Map...</div>
          {:else if !$shopItems.data}
            <div>Shop items failed to load!</div>
          {:else}
            {#each $shopItems.data as item}
              <div class="flex flex-col border-2 border-dotted p-1 m-1">
                <div class="flex flex-row justify-between">
                  <ItemButton {item} />
                  <DaiValue value={BigNumber.from(item.stake)} />
                </div>
                {#if currentPlayer}
                  <div class="flex">
                    {#if balance.gt(BigNumber.from(0))}
                      <div class="border-2 w-full m-1" on:click={() => buy(item.id, '1')}>Buy 1</div>
                    {:else}
                      <div class="border-2 w-full m-1 bg-red-400">Buy 1</div>
                    {/if}
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
