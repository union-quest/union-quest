<script lang="ts">
  import {chain, flow, wallet} from '$lib/blockchain/wallet';
  import {distance, getBalanceStreamed, getPosition, getSkill, Player} from '$lib/player/player';
  import {onMount} from 'svelte';
  import {recipes} from '$lib/recipe/recipes';
  import Blockie from '$lib/components/generic/CanvasBlockie.svelte';
  import DaiSymbol from './DaiSymbol.svelte';
  import Modal from './styled/Modal.svelte';

  export let currentPlayer: Player | null;

  async function craft() {
    await flow.execute((contracts) => contracts.UnionQuest.craft(0));
  }

  async function mint() {
    await flow.execute((contracts) => contracts.FaucetERC20.mint($wallet.address, '100000000000000000000000000000000'));
  }

  async function approve() {
    await flow.execute((contracts) =>
      contracts.FaucetERC20.approve(contracts.UnionQuest.address, '100000000000000000000000000000000')
    );
  }

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

      if (currentPlayer) {
        [currentX, currentY] = getPosition(currentPlayer, currentTimestamp / 1000);
      }
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
    {#each ['🎮', '📊', '🎒', '🛠️', '🏦', '⚙️'] as icon, i}
      <button
        class="w-12 border-2 border-gray-700 {tab === i ? 'bg-red-700' : 'bg-neutral-400'}"
        on:click={() => (tab = i)}
      >
        {icon}
      </button>
    {/each}
  </div>
  <div class="border-2 border-gray-700 p-2 h-full">
    {#if tab === 0}
      <div>
        <div class="text-xl">Status</div>
        <div>Location: ({Math.round(currentX)}, {Math.round(currentY)})</div>
        {#if currentX === parseInt(currentPlayer.endTile.x) && currentY === parseInt(currentPlayer.endTile.y)}
          {#if !currentPlayer.endTile.item}
            <div class="border-2 border-gray-600">There's nothing to do here!</div>
          {:else}
            <div class="border-2 border-gray-600">
              <div>
                {#if currentPlayer.endTile.item.id === '1'}
                  Woodcutting
                {:else}
                  Mining
                {/if}
              </div>
              <div class="text-left">
                <div>
                  {currentPlayer.endTile.item.id === '1' ? '🪓' : '⛏️'}
                  {Math.round(
                    getSkill(currentPlayer, currentTimestamp / 1000, parseInt(currentPlayer.endTile.item.id))
                  )}
                  <div class="inline text-sm text-green-700">(+0.1 point/s)</div>
                </div>
                <div>
                  {currentPlayer.endTile.item.symbol}
                  {Math.round(
                    getBalanceStreamed(currentPlayer, currentTimestamp / 1000, currentPlayer.endTile.item.id)
                  )}
                  <div class="inline text-sm text-green-700">
                    (+{roundBest(
                      getSkill(currentPlayer, currentTimestamp / 1000, parseInt(currentPlayer.endTile.item.id)) / 10
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
            </div>
            <div class="border-2 rounded-lg border-gray-600 m-1 w-16 text-center">
              🪓 {Math.round(getSkill(currentPlayer, currentTimestamp / 1000, 1))}
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
        {#each currentPlayer.balances as balance}
          {#if Math.round(getBalanceStreamed(currentPlayer, currentTimestamp / 1000, balance.item.id)) > 0}
            <div>
              {balance.item.symbol}{balance.item.name}: {Math.round(
                getBalanceStreamed(currentPlayer, currentTimestamp / 1000, balance.item.id)
              )}
            </div>
          {/if}
        {/each}
      </div>
    {:else if tab === 4}
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
    {:else if tab === 3}
      <div>
        <div class="text-xl">
          Crafting
          <button class="border-2 border-gray-700">ℹ️</button>
        </div>

        {#if !$recipes.step}
          <div>Messages not loaded</div>
        {:else if $recipes.error}
          <div>Error: {$recipes.error}</div>
        {:else if $recipes.step === 'LOADING'}
          <div>Loading Map...</div>
        {:else if !$recipes.data}
          <div>Something failed to load!</div>
        {:else}
          {#each $recipes.data as recipe}
            <div class="flex flex-row justify-center">
              <div class="border-2 m-1">
                🪵 {Math.round(getBalanceStreamed(currentPlayer, currentTimestamp / 1000, '1'))}
              </div>
              <div class="border-2 m-1">
                🪨 {Math.round(getBalanceStreamed(currentPlayer, currentTimestamp / 1000, '2'))}
              </div>
            </div>
            <div class="flex flex-row justify-around">
              <div>
                {#each recipe.inputs as input}
                  <div class="border-2">
                    <div class="border-2 bg-gray-300">100</div>
                    <div class="border-2 text-xl">{input.symbol}</div>
                  </div>
                {/each}
              </div>
              <div>➡️</div>
              <div>
                <div class="border-2">
                  <div class="border-2 text-2xl">{recipe.output.symbol}</div>
                  <div class="border-2 text-xl bg-gray-300">{recipe.output.name}</div>
                </div>
                <button
                  class="border-2 {getBalanceStreamed(currentPlayer, currentTimestamp / 1000, '1') > 100 &&
                  getBalanceStreamed(currentPlayer, currentTimestamp / 1000, '2') > 100
                    ? 'bg-green-400'
                    : 'bg-red-400'} border-gray-500 p-1 m-2"
                  on:click={craft}>Craft</button
                >
              </div>
            </div>
          {/each}
        {/if}
      </div>
    {:else}
      <div>
        <div class="text-xl">Settings</div>
        <div>
          <div on:click={mint} class="border-2">Mint free testnet DAI</div>
          <div on:click={approve} class="border-2">Set DAI allowance for shops</div>
        </div>
      </div>
    {/if}
  </div>
</div>
