<script lang="ts">
  import {flow} from '$lib/blockchain/wallet';
  import type {Player} from '$lib/player/player';
  import type {Players} from '$lib/player/players';
  import type {Village} from '$lib/village/villages';
  import type {Items} from '$lib/item/items';
  import {getTrusts} from '$lib/trust/trust';
  import Modal from '$lib/components/styled/Modal.svelte';
  import {onMount} from 'svelte';
  import DaiSymbol from './DaiSymbol.svelte';

  export let x: number;
  export let y: number;
  export let village: Village | null;
  export let players: Players;
  export let items: Items;
  export let currentPlayer: Player | null;

  const DISTANCE_MULTIPLIER = 2;

  let showModal = false;
  let currentTimestamp = Date.now();
  let trusts = getTrusts(village ? village.member : '');

  function distance(x0, y0, x1, y1) {
    return Math.abs(x1 - x0) + Math.abs(y1 - y0);
  }

  async function resolveMove() {
    await flow.execute((contracts) => contracts.UnionQuestCore.resolveMove());
  }

  async function fight() {
    await flow.execute((contracts) => contracts.UnionQuestCore.fight());
  }

  async function beginMove(x, y) {
    await flow.execute((contracts) => contracts.UnionQuestCore.beginMove(x, y));
  }

  async function buyItem() {
    await flow.execute((contracts) => contracts.UnionQuestCore.buyItem(0, 1, '0x'));
  }

  onMount(() => {
    const interval = setInterval(() => {
      currentTimestamp = Date.now();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div>
  {#if showModal}
    <Modal
      title={`${village ? `${village.name} (${x},${y})` : `Field (${x},${y})`}`}
      on:close={() => (showModal = false)}
      closeButton={true}
    >
      <div class="flex flex-col">
        <div class="m-2 rounded-md border-4 p-4">
          <div class="text-xl">Overview</div>
          {#if village}
            <div>
              {village.description}
            </div>
          {:else}
            <div>An empty field!</div>
          {/if}
        </div>
        <div class="m-2 rounded-md border-4 p-4 ">
          <div class="text-xl">Players</div>
          <div class="italic">
            There are {players.filter((p) => p.x === x && p.y === y).length} player(s) in this tile.
          </div>
          <ul class="list-disc">
            {#each players.filter((p) => p.x === x && p.y === y) as player}
              <li>
                <a href={`https://etherscan.io/address/${player.id}`}>
                  {player.id.slice(0, 6)}...{player.id.slice(-4)}
                </a>
              </li>
            {/each}
          </ul>
        </div>
        <div class="m-2 rounded-md border-4 p-4 ">
          <div class="text-xl">Leaderboard</div>
          <ul class="list-disc">
            {#if $trusts.data}
              {#each $trusts.data as trust}
                <li>
                  <a href={`https://etherscan.io/address/${trust.borrower.id}`}>
                    {trust.borrower.id.slice(0, 6)}...{trust.borrower.id.slice(-4)}
                  </a>
                  <div class="flex">{trust.trustAmount}<DaiSymbol /></div>
                </li>
              {/each}
            {/if}
          </ul>
        </div>

        <div class="m-2 rounded-md border-4 p-4">
          <div class="text-xl">Actions</div>
          <div class="rounded-md border-2 p-4">
            <div class="text-lg">Movement</div>
            {#if currentPlayer && !currentPlayer.arrivalTime}
              <div>
                Distance:
                <span class="italic">
                  |{x} - {currentPlayer.x}| + |{y} - {currentPlayer.y}|
                </span>
                =
                <span class="font-medium">
                  {distance(x, y, currentPlayer.x, currentPlayer.y)} unit(s).
                </span>
              </div>
              <div>
                Your speed:
                <span class="font-medium">
                  {DISTANCE_MULTIPLIER} units/second.
                </span>
              </div>
              <div>
                Travel time:
                <span class="italic">
                  {distance(x, y, currentPlayer.x, currentPlayer.y)} * {DISTANCE_MULTIPLIER}
                </span>
                =
                <span class="font-bold">
                  {DISTANCE_MULTIPLIER * distance(x, y, currentPlayer.x, currentPlayer.y)}
                  seconds
                </span>
                <button
                  on:click={() => beginMove(x, y)}
                  class="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-sm border-4
      text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                  type="button"
                >
                  MOVE HERE
                </button>

                <button
                  on:click={fight}
                  disabled={currentPlayer.x !== x || currentPlayer.y !== y}
                  class="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-sm border-4
      text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                  type="button"
                >
                  FIGHT
                </button>
              </div>
            {:else if currentPlayer.arrivalTime && currentPlayer.xDestination === x && currentPlayer.yDestination === y && currentPlayer.arrivalTime < currentTimestamp / 1000}
              <div>
                <div>You have arrived!</div>
                <button
                  class="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-sm border-4
        text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                  type="button"
                  disabled={currentPlayer.arrivalTime > currentTimestamp / 1000}
                  on:click={resolveMove}
                >
                  RESOLVE MOVE ({Math.round(currentPlayer.arrivalTime - currentTimestamp / 1000)}s)
                </button>
              </div>
            {:else if currentPlayer.arrivalTime && currentPlayer.xDestination === x && currentPlayer.yDestination === y}
              <div>
                <div>You are travelling here!</div>
                <button
                  class="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-sm border-4
      text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                  type="button"
                  disabled={currentPlayer.arrivalTime > currentTimestamp / 1000}
                  on:click={resolveMove}
                >
                  RESOLVE MOVE ({Math.round(currentPlayer.arrivalTime - currentTimestamp / 1000)}s)
                </button>
              </div>
            {:else}
              <div>You are already travelling to another tile.</div>
            {/if}
          </div>
          {#if village}
            <div class="rounded-md border-2 p-4">
              <div class="text-lg">Shop</div>
              <div class="flex">
                {#each items as item}
                  <div class="border-2 border-dashed w-48">
                    <div>
                      {item.name}
                    </div>
                    <div class="italic">
                      {item.description}
                    </div>
                    <div class="flex">
                      Price: {item.buyPrice / 10 ** 18}
                      <DaiSymbol />
                    </div>
                    <button
                      class="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-sm border-4
text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                      type="button"
                      disabled={currentPlayer.x !== x || currentPlayer.y !== y}
                      on:click={buyItem}
                    >
                      BUY 1
                    </button>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    </Modal>
  {/if}
  <div
    class="border-4 hover:border-green-500 {currentPlayer &&
    players.some((p) => p.x === x && p.y === y && p.id === currentPlayer.id)
      ? 'border-yellow-500 hover:border-yellow-500'
      : 'border-black-500'}"
  >
    <svg width="100" height="100" on:click={() => (showModal = true)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
        <rect fill="#009A17" width="1" height="1" />
        <path d="M 0.161,0.178 0.249,0.336" fill="none" stroke="#004400" stroke-width="0.02" />
        <path d="M 0.314,0.173 V 0.33" fill="none" stroke="#004400" stroke-width="0.02" />
        <path d="M 0.469,0.178 0.376,0.336" fill="none" stroke="#004400" stroke-width="0.02" />
        <path d="m 0.48277796,0.53428125 0.088,0.158" fill="none" stroke="#004400" stroke-width="0.02" />
        <path d="m 0.63577796,0.52928125 v 0.157" fill="none" stroke="#004400" stroke-width="0.02" />
        <path d="m 0.79077796,0.53428125 -0.093,0.158" fill="none" stroke="#004400" stroke-width="0.02" />
      </svg>
      {#if village}
        {#if village.x > 2}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
            <polygon fill="gold" points="0.25,0.35 0.5,0.1 0.75,0.35" />
            <rect fill="darkkhaki" x="0.25" y="0.35" width="0.5" height="0.5" />
            <rect fill="brown" x="0.45" y="0.65" width="0.1" height="0.2" />
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 3">
            <rect fill="burlywood" x="0.25" y="0.3" width="1.5" height="2.5" />
            <rect fill="sienna" x="0.7" y="2.1" width="0.6" height="0.7" />
            <g transform="translate(1 0.7)">
              <path stroke="brown" d="M0 0.8 V -0.8" fill="transparent" stroke-width="0.4">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 0 0"
                  to="360 0 0"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
              <path stroke="brown" d="M0.8 0 H -0.8" fill="transparent" stroke-width="0.4">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 0 0"
                  to="360 0 0"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </svg>
        {/if}
      {/if}
      {#each players as player}
        {#if player.arrivalTime && player.xDestination === x && player.yDestination === y}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
            <circle fill="grey" stroke-width="0.1" stroke="red" r="0.25" cx="0.5" cy="0.5" />
          </svg>
        {:else if !player.arrivalTime && player.x === x && player.y === y}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
            <circle fill="grey" stroke-width="0.1" stroke="green" r="0.25" cx="0.5" cy="0.5" />
          </svg>
        {/if}
      {/each}
    </svg>
  </div>
</div>
