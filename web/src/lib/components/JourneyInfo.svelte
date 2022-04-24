<script lang="ts">
  import {flow} from '$lib/blockchain/wallet';

  import type {Player} from '$lib/player/player';
  import {onMount} from 'svelte';
  export let currentPlayer: Player | null;

  const DISTANCE_MULTIPLIER = 15;

  function manhattanDistance(x0, y0, x1, y1) {
    return Math.abs(x1 - x0) + Math.abs(y1 - y0);
  }

  async function resolveMove() {
    await flow.execute((contracts) => contracts.UnionQuestCore.resolveMove());
  }

  async function resolveWork() {
    await flow.execute((contracts) => contracts.UnionQuestCore.resolveWork());
  }

  const distanceBetween = manhattanDistance(
    currentPlayer.xDestination,
    currentPlayer.yDestination,
    currentPlayer.x,
    currentPlayer.y
  );

  let currentTimestamp = Date.now();

  onMount(() => {
    const interval = setInterval(() => {
      currentTimestamp = Date.now();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div class="flex flex-col justify-center text-center dark:text-white">
  <div class="text-xl text-center">Player Status:</div>
  {#if currentPlayer.arrivalTime}
    <div>
      <div>
        You are travelling from ({currentPlayer.x}, {currentPlayer.y}) to ({currentPlayer.xDestination}, {currentPlayer.yDestination}).
      </div>
      <div class="flex flex-col m-2 p-2 border-2">
        <div class="flex">
          <div class="m-1">
            ({currentPlayer.x}, {currentPlayer.y})
          </div>
          <div class="w-48 bg-gray-200 rounded-full">
            <div
              class="bg-blue-600 h-full font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
              style="width: {currentPlayer.arrivalTime > currentTimestamp / 1000
                ? (100 *
                    (distanceBetween - (currentPlayer.arrivalTime - currentTimestamp / 1000) / DISTANCE_MULTIPLIER)) /
                  distanceBetween
                : 100}%"
            />
          </div>
          <div class="m-1">
            ({currentPlayer.xDestination}, {currentPlayer.yDestination})
          </div>
        </div>
        <button
          class="flex-shrink-0 bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600 text-sm border-4
text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed m-2"
          type="button"
          disabled={currentPlayer.arrivalTime > currentTimestamp / 1000}
          on:click={resolveMove}
        >
          RESOLVE JOURNEY {currentPlayer.arrivalTime > currentTimestamp / 1000
            ? `(${Math.round(currentPlayer.arrivalTime - currentTimestamp / 1000)}s)`
            : ''}
        </button>
      </div>
    </div>
  {:else if currentPlayer.workTime}
    <div>
      <div>
        You are currently working at ({currentPlayer.x}, {currentPlayer.y}).
      </div>
      <div class="flex flex-col m-2 p-2 border-2">
        <div class="flex">
          <div class="m-1 text-2xl">🌲</div>
          <div class="w-48 bg-gray-200 rounded-full">
            <div
              class="bg-blue-600 h-full font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
              style="width: {currentPlayer.workTime > currentTimestamp / 1000
                ? (100 * (60 - (currentPlayer.workTime - currentTimestamp / 1000))) / 60
                : 100}%"
            />
          </div>
          <div class="m-1 text-2xl">🪵</div>
        </div>
        <button
          class="flex-shrink-0 bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600 text-sm border-4
text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed m-2"
          type="button"
          disabled={currentPlayer.workTime > currentTimestamp / 1000}
          on:click={resolveWork}
        >
          RESOLVE WORK {currentPlayer.workTime > currentTimestamp / 1000
            ? `(${Math.round(currentPlayer.workTime - currentTimestamp / 1000)}s)`
            : ''}
        </button>
      </div>
    </div>
  {:else}
    <div>
      You are currently at tile ({currentPlayer.x}, {currentPlayer.y}).
    </div>
  {/if}
</div>
