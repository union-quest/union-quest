<script lang="ts">
  import {flow} from '$lib/blockchain/wallet';
  import type {Player} from '$lib/player/player';
  import type {Players} from '$lib/player/players';
  import type {Village} from '$lib/village/villages';
  import type {Items} from '$lib/item/items';
  import {getTrusts} from '$lib/trust/trust';
  import Modal from '$lib/components/styled/Modal.svelte';
  import DaiSymbol from './DaiSymbol.svelte';
  import Blockie from '$lib/components/generic/CanvasBlockie.svelte';
  import NavButton from './styled/navigation/NavButton.svelte';

  export let x: number;
  export let y: number;
  export let village: Village | null;
  export let players: Players;
  export let items: Items;
  export let currentPlayer: Player | null;

  const DISTANCE_MULTIPLIER = 15;

  let showModal = false;
  let tab = 0;
  let trusts = getTrusts(village ? village.member : '');

  function distance(x0, y0, x1, y1) {
    return Math.abs(x1 - x0) + Math.abs(y1 - y0);
  }

  async function beginWork() {
    await flow.execute((contracts) => contracts.UnionQuestCore.beginWork());
  }

  async function beginMove(x, y) {
    await flow.execute((contracts) => contracts.UnionQuestCore.beginMove(x, y));
  }

  async function buyItem(id: string) {
    await flow.execute((contracts) => contracts.DAI.approve(contracts.UnionQuestCore.address, '100000000000000000000'));
    await flow.execute((contracts) => contracts.UnionQuestCore.buyItem(id, 1, '0x'));
  }
</script>

<div>
  {#if showModal}
    <Modal
      title={`${village ? `${village.name} (${x},${y})` : `Field (${x},${y})`}`}
      on:close={() => (showModal = false)}
      closeButton={true}
    >
      <div class="flex flex-col h-96">
        <div>
          <button
            class="flex-shrink-0 bg-gray-500 hover:bg-gray-600 {tab === 0
              ? 'border-yellow-500'
              : 'border-gray-500'}  hover:border-gray-600 text-sm border-4
text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
            type="button"
            on:click={() => (tab = 0)}>Overview</button
          >
          <button
            class="flex-shrink-0 bg-gray-500 hover:bg-gray-600 {tab === 1
              ? 'border-yellow-500'
              : 'border-gray-500'} hover:border-gray-600 text-sm border-4
text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
            type="button"
            on:click={() => (tab = 1)}>Residents</button
          >
          {#if village}
            <button
              class="flex-shrink-0 bg-gray-500 hover:bg-gray-600 {tab === 2
                ? 'border-yellow-500'
                : 'border-gray-500'} hover:border-gray-600 text-sm border-4
text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
              type="button"
              on:click={() => (tab = 2)}>Vouches</button
            >
            <button
              class="flex-shrink-0 bg-gray-500 hover:bg-gray-600 {tab === 3
                ? 'border-yellow-500'
                : 'border-gray-500'} hover:border-gray-600 text-sm border-4
text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
              type="button"
              on:click={() => (tab = 3)}>Shop</button
            >
          {/if}
        </div>
        <div class="p-2">
          {#if tab === 0}
            <div class="text-xl">Overview</div>
            {#if village}
              <div>
                {village.description}
                <div class="w-fit mt-1">
                  <NavButton blank={true} href={`https://kovan.union.finance/profile/${village.member}`}>
                    View on Union
                  </NavButton>
                </div>
              </div>
            {:else}
              <div>An empty field!</div>
            {/if}
            <div class="rounded-md border-2 m-1">
              <div class="p-2 border-2 border-dashed">
                <div class="text-lg">Travel</div>
                {#if currentPlayer && !currentPlayer.arrivalTime && !currentPlayer.workTime}
                  <div>
                    <div class="p-1">
                      This tile is {distance(x, y, currentPlayer.x, currentPlayer.y)} unit(s) from you. It will take
                      <span class="font-bold"
                        >{DISTANCE_MULTIPLIER * distance(x, y, currentPlayer.x, currentPlayer.y)} seconds</span
                      >
                      to walk there.
                    </div>
                    <button
                      on:click={() => beginMove(x, y)}
                      class="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-sm border-4
        text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                      type="button"
                    >
                      BEGIN JOURNEY
                    </button>
                  </div>
                {:else}
                  <div>You are already busy.</div>
                {/if}
              </div>
              {#if village}
                <div class="p-2 border-2 border-dashed">
                  <div class="text-lg">Employment</div>
                  {#if currentPlayer && !currentPlayer.arrivalTime && !currentPlayer.workTime}
                    <div>Work at this town to gain vouches.</div>
                    <button
                      on:click={beginWork}
                      disabled={currentPlayer.x !== x || currentPlayer.y !== y}
                      class="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-sm border-4
  text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                      type="button"
                    >
                      WORK
                    </button>
                  {:else}
                    <div>You are already busy.</div>
                  {/if}
                </div>
              {/if}
            </div>
          {/if}
          {#if tab === 1}
            <div class="text-xl">Residents</div>
            <div class="italic">
              There are {players.filter((p) => p.x === x && p.y === y).length} player(s) in this tile.
            </div>
            <ul class="list-none">
              {#each players.filter((p) => p.x === x && p.y === y) as player}
                <li>
                  <div class="flex border-2 border-dashed">
                    <Blockie address={player.id} class="m-1 h-6 w-6" />
                    <a href={`https://kovan.union.finance/profile/${player.id}`}>
                      {player.id.slice(0, 4)}...{player.id.slice(-4)}
                    </a>
                  </div>
                </li>
              {/each}
            </ul>
          {/if}

          {#if tab === 2}
            <div class="text-xl">Vouch Leaderboard</div>
            <ul class="list-none">
              {#if $trusts.data.length === 0}No players have gained this town's trust yet.{/if}
              {#each $trusts.data as trust}
                <li>
                  <div class="flex border-2 border-dashed">
                    <Blockie address={trust.borrower} class="m-1 h-6 w-6" />
                    <a rel="noopener" target="_blank" href={`https://kovan.union.finance/profile/${trust.borrower.id}`}>
                      {trust.borrower.slice(0, 4)}...{trust.borrower.slice(-4)}
                    </a>
                    : {Math.round(trust.trustAmount / 10 ** 18)}<DaiSymbol />
                  </div>
                </li>
              {/each}
            </ul>
          {/if}

          {#if tab === 3}
            <div class="text-lg">Shop</div>
            <div class="flex">
              {#each items as item}
                <div class="border-2 border-dashed w-48 p-2">
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
                    on:click={() => buyItem(item.id)}
                  >
                    BUY 1
                  </button>
                </div>
              {/each}
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
    <div class="absolute grid grid-cols-3">
      {#each players.slice(0, 9) as player}
        {#if !player.arrivalTime && player.x === x && player.y === y}
          <Blockie address={player.id} class="m-1 h-6 w-6" />
        {/if}
      {/each}
    </div>
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
    </svg>
  </div>
</div>
