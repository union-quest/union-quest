<script lang="ts">
  import {flow} from '$lib/blockchain/wallet';
  import {distance, getItem, getPosition, getSkill, Player} from '$lib/player/player';
  import Modal from '$lib/components/styled/Modal.svelte';
  import {onMount} from 'svelte';

  export let x: number;
  export let y: number;
  export let currentPlayer: Player | null;
  export let showModal: boolean;

  const SPEED_DIVISOR = 10;

  const roundGood = (n: number) => Math.round(n * 10) / 10;

  async function move(x, y) {
    await flow.execute((contracts) => contracts.UnionQuest.move(x, y, {gasLimit: '100000'}));
  }

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
  {#if showModal}
    <Modal title={`Tile (${x},${y})`} on:close={() => (showModal = false)} closeButton={true}>
      <div class="flex flex-col border-2 border-gray-400 text-center">
        <div class="p-2 border-2 border-gray-400 h-full">
          {#if currentPlayer}
            <div class="p-1">
              <div>
                This tile is {roundGood(
                  distance(
                    x,
                    y,
                    getPosition(currentPlayer, currentTimestamp / 1000)[0],
                    getPosition(currentPlayer, currentTimestamp / 1000)[1]
                  )
                )} unit(s) from you.
              </div>
              <div>
                It will take
                <span class="font-bold">
                  {roundGood(
                    SPEED_DIVISOR *
                      distance(
                        x,
                        y,
                        getPosition(currentPlayer, currentTimestamp / 1000)[0],
                        getPosition(currentPlayer, currentTimestamp / 1000)[1]
                      )
                  )} seconds</span
                >
                to walk here.
              </div>

              <div>
                {#if getItem(x, y) !== 0}
                  Once you arrive, you will start gathering
                  <span class="inline font-bold">
                    {getItem(x, y) === 1 ? '🪵' : '🪨'}
                  </span>
                  at a rate of
                  <div class="inline font-bold">
                    {Math.round(getSkill(currentPlayer, currentTimestamp / 1000, getItem(x, y)))}
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
                MOVE HERE
              </button>
            </div>
          {:else}
            <div>You need to join the game first!</div>
          {/if}
          {#if x === 0 && y === 0}
            <div class="italic">This is the spawn tile. All new players enter the UnionQuest world from here.</div>
          {/if}
        </div>
      </div>
    </Modal>
  {/if}
</div>
