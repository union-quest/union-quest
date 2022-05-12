<script lang="ts">
  import {flow, wallet} from '$lib/blockchain/wallet';
  import {getBalanceStreamed, Player} from '$lib/player/player';
  import {onMount} from 'svelte';
  import {items} from '$lib/item/items';
  import DaiSymbol from './DaiSymbol.svelte';
  import Modal from './styled/Modal.svelte';

  export let currentPlayer: Player | null;

  async function buy(id: string, amount: string) {
    await flow.execute((contracts) => contracts.UnionQuest.buy(id, amount));
  }

  async function sell(id: string, amount: string) {
    await flow.execute((contracts) => contracts.UnionQuest.sell(id, amount));
  }

  let showModal = false;
  let currentTimestamp = Date.now();

  onMount(() => {
    const interval = setInterval(() => {
      currentTimestamp = Date.now();
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div class="h-full">
  {#if showModal}
    <Modal title={`buy`} on:close={() => (showModal = false)} closeButton={true}>
      <div>hi</div>
    </Modal>
  {/if}
  <div class="text-xl">Shop</div>
  {#if currentPlayer}
    <div class="flex flex-row justify-around">
      <div class="border-2 w-full">
        <div class="text-lg">MY EQUIPMENT</div>
        <div>
          {#each currentPlayer.balances as balance}
            {#if ['3', '4'].includes(balance.item.id) && Math.round(getBalanceStreamed(currentPlayer, currentTimestamp / 1000, balance.item.id)) > 0}
              <div class="flex">
                <div on:click={() => sell(balance.item.id, '1')}>
                  {balance.item.symbol}{balance.item.name} ({Math.round(
                    getBalanceStreamed(currentPlayer, currentTimestamp / 1000, balance.item.id)
                  )})
                </div>
              </div>
            {/if}
          {/each}
        </div>
        <div class="flex border-2">
          0
          <DaiSymbol />
        </div>
      </div>
      <div class="border-2 w-full">
        <div class="text-lg">SHOP</div>
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
                <div on:click={() => buy(item.id, '1')}>
                  {item.symbol}{item.name} (∞)
                </div>
              </div>
            {/each}
          {/if}
        </div>
        <div class="flex border-2">
          0
          <DaiSymbol />
        </div>
      </div>
    </div>
  {:else}
    You need to join the game first!
  {/if}
</div>
