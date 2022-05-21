<script lang="ts">
  import {getBalanceStreamed, Player} from '$lib/player/player';
  import {onMount} from 'svelte';
  import ItemButton from './ItemButton.svelte';

  export let player: Player | null;

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

<div>
  <div class="text-xl">Inventory</div>
  <div class="flex">
    {#if player.balances.filter((balance) => Math.round(getBalanceStreamed(player, currentTimestamp / 1000, balance.item.id)) > 0).length > 0}
      {#each player.balances.filter((balance) => Math.round(getBalanceStreamed(player, currentTimestamp / 1000, balance.item.id)) > 0) as balance}
        <div class="border-2">
          <ItemButton item={balance.item} />
          <div>
            {Math.round(getBalanceStreamed(player, currentTimestamp / 1000, balance.item.id))}
          </div>
        </div>
      {/each}
    {:else}
      You don't own any items.
    {/if}
  </div>
</div>
