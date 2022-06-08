<script lang="ts">
  import {chain, flow, wallet} from '$lib/blockchain/wallet';
  import {distance, getBalanceStreamed, getItem, getPosition, getSkill, Player} from '$lib/player/player';
  import {onMount} from 'svelte';
  import Blockie from '$lib/components/generic/CanvasBlockie.svelte';
  import Modal from './styled/Modal.svelte';
  import Shop from './Shop.svelte';
  import Crafting from './Crafting.svelte';
  import {BigNumber} from '@ethersproject/bignumber/src.ts';
  import {chainId} from '$lib/config';
  import Inventory from './Inventory.svelte';
  import DaiValue from './DaiValue.svelte';
  import DarkSwitch from './styled/DarkSwitch.svelte';
  import ItemButton from './ItemButton.svelte';

  export let currentPlayer: Player | null;

  async function mint() {
    await flow.execute((contracts) =>
      chainId === '1337'
        ? contracts.FaucetERC20.mint($wallet.address, '100000000000000000000')
        : contracts.DAI.mint($wallet.address, '100000000000000000000')
    );
  }

  async function approve() {
    await flow.execute((contracts) =>
      chainId === '1337'
        ? contracts.FaucetERC20.approve(contracts.UnionQuest.address, '100000000000000000000000000000000')
        : contracts.DAI.approve(contracts.UnionQuest.address, '100000000000000000000000000000000')
    );
  }

  async function approveNFT() {
    await flow.execute((contracts) => contracts.UnionQuest.setApprovalForAll(contracts.UnionQuest.address, true));
  }

  async function updateTrust() {
    await flow.execute((contracts) => contracts.UnionQuest.updateTrust($wallet.address));
  }

  let tab = 0;
  let showModal = false;

  let currentTimestamp = Date.now();
  let currentX = 0;
  let currentY = 0;

  const roundBest = (n: number) => Math.round(n * 10) / 10;

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

<div class="flex flex-col text-center bg-neutral-300 w-64 h-72 border-8 border-double border-gray-700 p-1">
  {#if showModal}
    <Modal title="Info" on:close={() => (showModal = false)} closeButton={true}>
      <div class="p-1">
        As a reward for improving your skills, you are entitled to a credit line from the Bank of UnionQuest.
      </div>
      <div class="p-1">
        Your vouch must be manually updated and does <div class="inline font-bold">not</div>
        automatically increase when you perform an activity. This difference is indicated by the
        <span class="italic"> "Actual Vouch" </span>
        and <span class="italic">"Potential Vouch"</span> amounts.
      </div>
      <div class="border-2 bg-gray-200 border-gray-500 m-1 p-2">
        <a
          rel="noopener"
          target="_blank"
          href={`https://${
            chainId === '42161' ? 'arbitrum' : chainId === '42' ? 'kovan' : 'app'
          }.union.finance/profile/${chain.contracts.UnionQuest.address}`}
        >
          View the Bank on
          {#if chainId === '42161'}
            arbitrum.union.finance
          {:else if chainId === '42'}
            kovan.union.finance
          {:else}
            app.union.finance
          {/if}
        </a>
      </div>
    </Modal>
  {/if}
  <div class="flex text-2xl justify-center p-2">
    {$wallet.address.slice(0, 4)}...{$wallet.address.slice(-4)}
    <Blockie address={$wallet.address} class="m-1 h-6 w-6" />
  </div>
  <div class="flex text-2xl justify-start">
    {#each ['🎮', '📊', '🎒', '🏪', '🛠️', '🏦', '⚙️'] as icon, i}
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
          {#if getItem(parseInt(currentPlayer.endTile.x), parseInt(currentPlayer.endTile.y)) === 0}
            <div class="border-2 border-gray-600">There's nothing to do here!</div>
          {:else}
            <div class="border-2 border-gray-600">
              <div>
                Activity:
                {#if getItem(parseInt(currentPlayer.endTile.x), parseInt(currentPlayer.endTile.y)) === 1}
                  Woodcutting
                {:else}
                  Mining
                {/if}
              </div>
              <div class="flex">
                <div>
                  {getItem(parseInt(currentPlayer.endTile.x), parseInt(currentPlayer.endTile.y)) === 1 ? '🪓' : '⛏️'}
                  {Math.round(
                    getSkill(
                      currentPlayer,
                      currentTimestamp / 1000,
                      getItem(parseInt(currentPlayer.endTile.x), parseInt(currentPlayer.endTile.y))
                    )
                  )}
                </div>
                <div class="border-2">
                  <ItemButton item={currentPlayer.endTile.item} />
                  <div>
                    {Math.round(
                      getBalanceStreamed(currentPlayer, currentTimestamp / 1000, currentPlayer.endTile.item.id)
                    )}
                  </div>
                </div>
                {#if !currentPlayer.balances.some((b) => currentPlayer.endTile.item.tools.some((t) => t.tool.id === b.item.id) && parseInt(b.value) > 0)}
                  {#if currentPlayer.endTile.item.id === '1'}
                    <div class="text-red-500">You do not have an axe.</div>
                  {:else if currentPlayer.endTile.item.id === '2'}
                    <div class="text-red-500">You do not have a pickaxe.</div>
                  {/if}
                {:else}
                  <div class="text-green-800">
                    Equipment boost: {currentPlayer.balances
                      .find((b) => b.item.id === currentPlayer.endTile.item.id)
                      .item.tools.filter((t) =>
                        currentPlayer.balances.some((b) => t.tool.id === b.item.id && parseInt(b.value) > 0)
                      )
                      ? Math.max(
                          ...currentPlayer.balances
                            .find((b) => b.item.id === currentPlayer.endTile.item.id)
                            .item.tools.filter((t) =>
                              currentPlayer.balances.some((b) => t.tool.id === b.item.id && parseInt(b.value) > 0)
                            )
                            .map((t) => parseInt(t.bonus))
                        )
                      : 0}
                  </div>
                {/if}
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
            <div class="border-2 rounded-lg border-gray-600 m-1 w-full text-center">
              ⛏️ {Math.round(getSkill(currentPlayer, currentTimestamp / 1000, 2))}
            </div>
            <div class="border-2 rounded-lg border-gray-600 m-1 w-full text-center">
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
      <Inventory player={currentPlayer} />
    {:else if tab === 3}
      <Shop {currentPlayer} />
    {:else if tab === 4}
      <Crafting {currentPlayer} />
    {:else if tab === 5}
      <div>
        <div class="text-xl">
          Vouching Rewards
          <button class="border-2 border-gray-700" on:click={() => (showModal = true)}>ℹ️</button>
        </div>
        <div class="p-1">
          <div class="text-left flex">
            <div class="font-bold">Actual Vouch:</div>
            <DaiValue value={BigNumber.from(currentPlayer.vouch)} />
          </div>
          <div class="text-left flex">
            <div class="font-bold">Potential Vouch:</div>
            <DaiValue
              value={BigNumber.from(
                Math.round(
                  getSkill(currentPlayer, currentTimestamp / 1000, 1) +
                    getSkill(currentPlayer, currentTimestamp / 1000, 2)
                )
              ).mul('10000000000000000')}
            />
          </div>
          <button class="border-2 bg-yellow-400 border-gray-500 p-1" on:click={updateTrust}>Update</button>
        </div>
      </div>
    {:else}
      <div>
        <div class="text-xl">Settings</div>
        <div>
          {#if chainId === '1337'}
            <div on:click={mint} class="border-2">Mint free testnet DAI</div>
          {/if}
          <div on:click={approve} class="border-2">Allow DAI transfers for The Shop</div>
          <div on:click={approveNFT} class="border-2">Allow NFT transfers for The Shop</div>
          <DarkSwitch />
        </div>
      </div>
    {/if}
  </div>
</div>
