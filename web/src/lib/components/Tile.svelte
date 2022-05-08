<script lang="ts">
  import {flow, wallet} from '$lib/blockchain/wallet';
  import {distance, getBalanceStreamed, getPosition, getSkill, Player} from '$lib/player/player';
  import type {Players} from '$lib/player/players';
  import type {Tile} from '$lib/tile/tiles';
  import Modal from '$lib/components/styled/Modal.svelte';
  import Blockie from '$lib/components/generic/CanvasBlockie.svelte';
  import {onMount} from 'svelte';
  import {items} from '$lib/item/items';

  export let x: number;
  export let y: number;
  export let tile: Tile | null;
  export let players: Players;
  export let currentPlayer: Player | null;

  const SPEED_DIVISOR = 10;

  let showModal = false;
  let tab = 0;

  const roundGood = (n: number) => Math.round(n * 10) / 10;

  async function move(x, y) {
    await flow.execute((contracts) => contracts.UnionQuest.move(x, y));
  }

  async function transfer(id: string, amount: string) {
    await flow.execute((contracts) =>
      contracts.UnionQuest.safeTransferFrom(
        $wallet.address,
        '0xb19BC46C52A1352A071fe2389503B6FE1ABD50Ff',
        id,
        amount,
        []
      )
    );
  }

  async function mint(id: string, amount: string) {
    await flow.execute((contracts) => contracts.UnionQuest.mint($wallet.address, id, amount, []));
  }

  let currentTimestamp = Date.now();
  let currentX = 0;
  let currentY = 0;
  let residents = [];

  onMount(() => {
    const interval = setInterval(() => {
      currentTimestamp = Date.now();

      if (currentPlayer) {
        [currentX, currentY] = getPosition(currentPlayer, currentTimestamp / 1000);
      }
      residents = players.filter(
        (p) =>
          Math.round(getPosition(p, currentTimestamp / 1000)[0]) === x &&
          Math.round(getPosition(p, currentTimestamp / 1000)[1]) === y
      );
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div>
  {#if showModal}
    <Modal title={`Tile (${x},${y})`} on:close={() => (showModal = false)} closeButton={true}>
      <div class="flex flex-col border-2 border-gray-400 h-64 text-center">
        <div class="flex text-4xl justify-start">
          <button
            class="w-12 border-2 border-gray-700 {tab === 0 ? 'bg-red-700' : 'bg-neutral-400'}"
            on:click={() => (tab = 0)}
          >
            🧭
          </button>
          <button
            class="w-12 border-2 border-gray-700 {tab === 1 ? 'bg-red-700' : 'bg-neutral-400'}"
            on:click={() => (tab = 1)}
          >
            📜
          </button>
          <button
            class="w-12 border-2 border-gray-700 {tab === 2 ? 'bg-red-700' : 'bg-neutral-400'}"
            on:click={() => (tab = 2)}
          >
            🏪
          </button>
          <button
            class="w-12 border-2 border-gray-700 {tab === 3 ? 'bg-red-700' : 'bg-neutral-400'}"
            on:click={() => (tab = 3)}
          >
            👪
          </button>
        </div>
        <div class="p-2 border-2 border-gray-400">
          {#if tab === 0}
            <div class="text-xl">Travel</div>
            {#if currentPlayer}
              <div class="p-1">
                <div>
                  This tile is {roundGood(
                    distance(x, y, parseInt(currentPlayer.endTile.x), parseInt(currentPlayer.endTile.y))
                  )} unit(s) from you.
                </div>
                <div>
                  It will take
                  <span class="font-bold">
                    {roundGood(
                      SPEED_DIVISOR *
                        distance(x, y, parseInt(currentPlayer.endTile.x), parseInt(currentPlayer.endTile.y))
                    )} seconds</span
                  >
                  to walk here.
                </div>

                <div>
                  {#if tile && tile.item}
                    Once you arrive, you will start gathering
                    <span class="inline font-bold">
                      {tile.item.symbol}{tile.item.name}
                    </span>
                    at a rate of
                    <div class="inline font-bold">
                      {Math.round(getSkill(currentPlayer, currentTimestamp / 1000, parseInt(tile.item.id)) / 10)}
                    </div>
                    units/s.
                  {:else}
                    There are no resources on this tile.
                  {/if}
                </div>
                <button
                  on:click={() => move(x, y)}
                  class="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-sm border-4
  text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed m-1"
                  type="button"
                >
                  BEGIN JOURNEY
                </button>
              </div>
            {:else}
              <div>You need to join the game first!</div>
            {/if}
          {:else if tab === 1}
            <div class="text-xl">Lore</div>
            {#if tile && tile.item && tile.item.id === '1'}
              This tile is a forest.
            {:else if tile && tile.item && tile.item.id === '2'}
              This tile is a mine.
            {:else}
              This tile is an empty desert.
            {/if}
          {:else if tab === 2}
            <div class="text-xl">Shop</div>
            <div>
              <div>
                <div class="text-xl">Shop inventory</div>
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
                    <div on:click={() => mint(item.id, '100')}>
                      {item.symbol}{item.name}: {100}
                    </div>
                  {/each}
                {/if}
              </div>
            </div>
            <div>
              <div>
                <div class="text-xl">Your inventory</div>
                {#each currentPlayer.balances as balance}
                  {#if Math.round(getBalanceStreamed(currentPlayer, currentTimestamp / 1000, balance.item.id)) > 0}
                    <div on:click={() => transfer(balance.item.id, '20')}>TWENTY</div>
                    <div
                      on:click={() =>
                        transfer(
                          balance.item.id,
                          Math.floor(
                            getBalanceStreamed(currentPlayer, currentTimestamp / 1000, balance.item.id)
                          ).toString()
                        )}
                    >
                      {balance.item.symbol}{balance.item.name}: {Math.round(
                        getBalanceStreamed(currentPlayer, currentTimestamp / 1000, balance.item.id)
                      )}
                    </div>
                  {/if}
                {/each}
              </div>
            </div>
          {:else}
            <div class="text-xl">Residents</div>
            <div class="italic">
              There are {residents.length} player(s) at this tile.
            </div>
            <ul class="list-none">
              {#each residents as player}
                <li>
                  <div class="flex border-2 border-dashed">
                    <Blockie address={player.id} class="m-1 h-6 w-6" />
                    <a rel="noopener" target="_blank" href={`https://kovan.union.finance/profile/${player.id}`}>
                      {player.id.slice(0, 4)}...{player.id.slice(-4)}
                    </a>
                  </div>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      </div>
    </Modal>
  {/if}
  <div
    on:click={() => (showModal = true)}
    class="border-4 hover:border-gray-400 {currentPlayer && Math.round(currentX) === x && Math.round(currentY) === y
      ? 'border-blue-500 hover:border-blue-500'
      : currentPlayer && parseInt(currentPlayer.endTile.x) === x && parseInt(currentPlayer.endTile.y) === y
      ? 'border-red-500 hover:border-red-500'
      : 'border-gray-200'}"
  >
    <div class="absolute grid grid-cols-3">
      {#each residents.slice(0, 9) as player}
        <Blockie address={player.id} class="m-1 h-6 w-6" />
      {/each}
    </div>
    <div class="flex w-24 h-24 text-5xl justify-center items-center">
      {#if tile && tile.item && tile.item.id === '1'}
        🌲
      {:else if tile && tile.item && tile.item.id === '2'}
        ⛰️
      {:else}
        🏜️
      {/if}
    </div>
  </div>
</div>
