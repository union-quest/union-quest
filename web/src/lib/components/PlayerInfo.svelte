<script lang="ts">
  import {chain, flow, wallet} from '$lib/blockchain/wallet';
  import {getPosition, getSkill, Player} from '$lib/player/player';
  import {onMount} from 'svelte';
  import Blockie from '$lib/components/generic/CanvasBlockie.svelte';
  import DaiSymbol from './DaiSymbol.svelte';

  export let currentPlayer: Player | null;

  let tab = 0;

  let currentTimestamp = Date.now();
  let currentX = 0;
  let currentY = 0;

  async function updateTrust() {
    await flow.execute((contracts) => contracts.UnionQuest.updateTrust($wallet.address));
  }

  onMount(() => {
    const interval = setInterval(() => {
      currentTimestamp = Date.now();

      [currentX, currentY] = getPosition(currentPlayer, currentTimestamp / 1000);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div class="flex flex-col justify-center text-center dark:text-white w-52">
  <div class="text-2xl">
    {$wallet.address.slice(0, 6)}...{$wallet.address.slice(-2)}
    <Blockie address={$wallet.address} class="m-1 h-6 w-6" />
  </div>
  <div class="flex text-2xl justify-start">
    <button class="border-2 w-8" on:click={() => (tab = 0)}>🎮</button>
    <button class="border-2 w-8" on:click={() => (tab = 1)}>📊</button>
    <button class="border-2 w-8" on:click={() => (tab = 2)}>🎒</button>
    <button class="border-2 w-8" on:click={() => (tab = 3)}>🏦</button>
  </div>
  <div class="border-2 p-2">
    {#if tab === 0}
      <div>
        <div class="text-xl">Status</div>
        {#if currentX === parseInt(currentPlayer.endTile.x) && currentY === parseInt(currentPlayer.endTile.y)}
          <div>
            {#if currentPlayer.endTile.resourceId === '1'}
              Woodcutting at
            {:else if currentPlayer.endTile.resourceId === '2'}
              Mining at
            {:else}
              Standing at
            {/if}
            tile ({currentPlayer.endTile.x}, {currentPlayer.endTile.y}).
          </div>
        {:else}
          <div>
            {#if currentPlayer.endTile.resourceId === '1'}
              Walking to chop wood at
            {:else if currentPlayer.endTile.resourceId === '2'}
              Walking to mine stone at
            {:else}
              Walking to
            {/if}
            tile ({currentPlayer.endTile.x}, {currentPlayer.endTile.y}).
          </div>
        {/if}
      </div>
    {:else if tab === 1}
      <div>
        <div class="text-xl">Skills</div>
        <div>
          🪵 Woodcutting: {Math.round(getSkill(currentPlayer, currentTimestamp / 1000, 1))}
        </div>
        <div>
          🪨 Mining: {Math.round(getSkill(currentPlayer, currentTimestamp / 1000, 2))}
        </div>
      </div>
    {:else if tab === 2}
      <div>
        <div class="text-xl">Inventory</div>
        <div>Coming soon!</div>
      </div>
    {:else}
      <div>
        <div class="text-xl">Vouching rewards</div>
        <div class="border-2 p-1">
          <div class="text-left">
            <div class="font-bold">True Vouch:</div>
            <div class="flex">
              {currentPlayer.vouch}
              <DaiSymbol />
            </div>
          </div>
          <div class="text-left">
            <div class="font-bold">Potential Vouch:</div>
            <div class="flex">
              {Math.round(
                getSkill(currentPlayer, currentTimestamp / 1000, 1) +
                  getSkill(currentPlayer, currentTimestamp / 1000, 2)
              )}
              <DaiSymbol />
            </div>
          </div>
          <button class="border-2 bg-yellow-400 border-gray-500 p-1" on:click={updateTrust}>Update</button>
        </div>
        <div class="border-2 p-1 text-sm">
          <div class="text-lg">Info</div>
          <div class="p-1">
            As a reward for improving your skills, you are entitled to a credit line from the Bank of UnionQuest.
          </div>
          <div class="p-1">
            Your vouch does <div class="inline font-bold">not</div>
            automatically increase when you perform a task, so must be manually updated. This difference is indicated by
            the<span class="italic">"True Vouch"</span>
            and <span class="italic">"Potential Vouch"</span> above.
          </div>
          <div class="border-2 bg-gray-200 border-gray-500 m-1 p-2">
            <a
              rel="noopener"
              target="_blank"
              href={`https://kovan.union.finance/profile/${chain.contracts.UnionQuest.address}`}
            >
              View the bank on union.finance
            </a>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
