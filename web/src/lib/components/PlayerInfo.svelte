<script lang="ts">
  import {chain, flow, wallet} from '$lib/blockchain/wallet';
  import {distance, getBalanceStreamed, getPosition, getSkill, Player} from '$lib/player/player';
  import {onMount} from 'svelte';
  import Blockie from '$lib/components/generic/CanvasBlockie.svelte';
  import DaiSymbol from './DaiSymbol.svelte';
  import Modal from './styled/Modal.svelte';

  export let currentPlayer: Player | null;

  let tab = 0;
  let showModal = false;

  let currentTimestamp = Date.now();
  let currentX = 0;
  let currentY = 0;

  const roundBest = (n: number) => Math.round(n * 10) / 10;
  const roundGood = (n: number) => Math.round(n * 100) / 100;

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

<div class="flex flex-col text-center bg-neutral-300 w-60 h-72">
  {#if showModal}
    <Modal title={`Info`} on:close={() => (showModal = false)} closeButton={true}>
      <div class="p-1">
        As a reward for improving your skills, you are entitled to a credit line from the Bank of UnionQuest.
      </div>
      <div class="p-1">
        Your vouch must be manually updated and does <div class="inline font-bold">not</div>
        automatically increase when you perform an activity. This difference is indicated by the<span class="italic"
          >"True Vouch"</span
        >
        and <span class="italic">"Potential Vouch"</span> amounts.
      </div>
      <div class="border-2 bg-gray-200 border-gray-500 m-1 p-2">
        <a
          rel="noopener"
          target="_blank"
          href={`https://kovan.union.finance/profile/${chain.contracts.UnionQuest.address}`}
        >
          View the Bank on union.finance
        </a>
      </div></Modal
    >
  {/if}
  <div class="flex text-2xl justify-center p-2">
    {$wallet.address.slice(0, 4)}...{$wallet.address.slice(-4)}
    <Blockie address={$wallet.address} class="m-1 h-6 w-6" />
  </div>
  <div class="flex text-2xl justify-start">
    <button
      class="w-8 border-2 border-gray-700 {tab === 0 ? 'bg-red-700' : 'bg-neutral-400'}"
      on:click={() => (tab = 0)}>🎮</button
    >
    <button
      class="w-8 border-2 border-gray-700 {tab === 1 ? 'bg-red-700' : 'bg-neutral-400'}"
      on:click={() => (tab = 1)}>📊</button
    >
    <button
      class="w-8 border-2 border-gray-700 {tab === 2 ? 'bg-red-700' : 'bg-neutral-400'}"
      on:click={() => (tab = 2)}>🎒</button
    >
    <button
      class="w-8 border-2 border-gray-700 {tab === 3 ? 'bg-red-700' : 'bg-neutral-400'}"
      on:click={() => (tab = 3)}>🏦</button
    >
  </div>
  <div class="border-2 border-gray-700 p-2">
    {#if tab === 0}
      <div>
        <div class="text-xl">Status</div>
        <div>Location: ({Math.round(currentX)}, {Math.round(currentY)})</div>
        {#if currentX === parseInt(currentPlayer.endTile.x) && currentY === parseInt(currentPlayer.endTile.y)}
          {#if currentPlayer.endTile.resourceId === '0'}
            <div class="border-2 border-gray-600">There's nothing to do here!</div>
          {:else}
            <div class="border-2 border-gray-600">
              <div>
                {#if currentPlayer.endTile.resourceId === '1'}
                  Woodcutting
                {:else}
                  Mining
                {/if}
              </div>
              <div class="text-left">
                <div>
                  {currentPlayer.endTile.resourceId === '1' ? '🪓' : '⛏️'}
                  {Math.round(
                    getSkill(currentPlayer, currentTimestamp / 1000, parseInt(currentPlayer.endTile.resourceId))
                  )}
                  <div class="inline text-sm text-green-700">(+0.1 point/s)</div>
                </div>
                <div>
                  {currentPlayer.endTile.resourceId === '1' ? '🪵' : '🪨'}
                  {Math.round(
                    getBalanceStreamed(
                      currentPlayer,
                      currentTimestamp / 1000,
                      parseInt(currentPlayer.endTile.resourceId)
                    )
                  )}
                  <div class="inline text-sm text-green-700">
                    (+{Math.round(
                      getSkill(currentPlayer, currentTimestamp / 1000, parseInt(currentPlayer.endTile.resourceId))
                    )} units/s)
                  </div>
                </div>
              </div>
            </div>
          {/if}
        {:else}
          <div class="border-2 border-gray-600">
            <div>Walking</div>
            <div class="text-left">
              <div>
                Walking to: ({currentPlayer.endTile.x}, {currentPlayer.endTile.y})
              </div>
              <div>👟0.1</div>
              <div>
                Distance: {roundBest(
                  distance(currentX, currentY, parseInt(currentPlayer.endTile.x), parseInt(currentPlayer.endTile.y))
                )} tiles
                <div class="inline text-sm text-green-700">(-0.1 tiles/s)</div>
              </div>
            </div>
          </div>
        {/if}
      </div>
    {:else if tab === 1}
      <div>
        <div class="text-xl">Skills</div>
        <div class="text-left text-lg">
          <div class="flex">
            <div class="border-2 rounded-lg border-gray-600 m-1 w-16 text-center">
              ⛏️ {Math.round(getSkill(currentPlayer, currentTimestamp / 1000, 2))}
              {#if currentX === parseInt(currentPlayer.endTile.x) && currentY === parseInt(currentPlayer.endTile.y) && currentPlayer.endTile.resourceId === '2'}
                <div class="inline text-sm text-green-700">(+0.1 point/s)</div>
              {/if}
            </div>
            <div class="border-2 rounded-lg border-gray-600 m-1 w-16 text-center">
              🪓 {Math.round(getSkill(currentPlayer, currentTimestamp / 1000, 1))}
              {#if currentX === parseInt(currentPlayer.endTile.x) && currentY === parseInt(currentPlayer.endTile.y) && currentPlayer.endTile.resourceId === '1'}
                <div class="inline text-sm text-green-700">(+0.1 point/s)</div>
              {/if}
            </div>
          </div>
          <div class="border-2 rounded-lg border-gray-600 m-1 text-center">
            <div class="inline font-medium">Total level:</div>
            {Math.round(
              getSkill(currentPlayer, currentTimestamp / 1000, 1) + getSkill(currentPlayer, currentTimestamp / 1000, 2)
            )}
          </div>
        </div>
      </div>
    {:else if tab === 2}
      <div>
        <div class="text-xl">Inventory</div>
        <div>
          🪨 Stone: {Math.round(getBalanceStreamed(currentPlayer, currentTimestamp / 1000, 2))}
        </div>
        <div>
          🪵 Wood: {Math.round(getBalanceStreamed(currentPlayer, currentTimestamp / 1000, 1))}
        </div>
      </div>
    {:else}
      <div>
        <div class="text-xl">
          Vouching rewards
          <button class="border-2 border-gray-700" on:click={() => (showModal = true)}>ℹ️</button>
        </div>
        <div class="p-1">
          <div class="text-left flex">
            <div class="font-bold">True Vouch:</div>
            <div class="flex">
              {roundGood(parseInt(currentPlayer.vouch) / 10 ** 18)}
              <DaiSymbol />
            </div>
          </div>
          <div class="text-left flex">
            <div class="font-bold">Potential Vouch:</div>
            <div class="flex">
              {roundGood(
                (getSkill(currentPlayer, currentTimestamp / 1000, 1) +
                  getSkill(currentPlayer, currentTimestamp / 1000, 2)) /
                  10 ** 2
              )}
              <DaiSymbol />
            </div>
          </div>
          <button class="border-2 bg-yellow-400 border-gray-500 p-1" on:click={updateTrust}>Update</button>
        </div>
      </div>
    {/if}
  </div>
</div>
