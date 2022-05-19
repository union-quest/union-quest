<script lang="ts">
  import {getBalanceStreamed, Player} from '$lib/player/player';
  import {onMount} from 'svelte';
  import Item from './Item.svelte';
  import Modal from './styled/Modal.svelte';

  export let player: Player | null;

  let currentTimestamp = Date.now();
  let showModal = false;
  let selectedItem = '0';

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
    <Modal on:close={() => (showModal = false)} closeButton={true}><Item id={selectedItem} /></Modal>
  {/if}
  <div class="text-xl">Inventory</div>
  {#if player.balances.filter((balance) => Math.round(getBalanceStreamed(player, currentTimestamp / 1000, balance.item.id)) > 0).length > 0}
    {#each player.balances.filter((balance) => Math.round(getBalanceStreamed(player, currentTimestamp / 1000, balance.item.id)) > 0) as balance}
      <div
        class="border-2"
        on:click={() => {
          showModal = true;
          selectedItem = balance.item.id;
        }}
      >
        {balance.item.symbol}{balance.item.name}: {Math.round(
          getBalanceStreamed(player, currentTimestamp / 1000, balance.item.id)
        )}
      </div>
    {/each}
  {:else}
    You don't own any items.
  {/if}
</div>
