<script lang="ts">
  import WalletAccess from '$lib/blockchain/WalletAccess.svelte';
  import {wallet, flow} from '$lib/blockchain/wallet';
  import {players} from '$lib/player/players';
  import {tiles} from '$lib/tile/tiles';
  import Tile from '$lib/components/Tile.svelte';
  import PlayerInfo from '$lib/components/PlayerInfo.svelte';

  async function join() {
    await flow.execute((contracts) => contracts.UnionQuest.updateTrust($wallet.address));
  }
</script>

<symbol id="icon-spinner6" viewBox="0 0 32 32">
  <path
    d="M12 4c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM24.719 16c0 0 0 0 0 0 0-1.812 1.469-3.281 3.281-3.281s3.281 1.469 3.281 3.281c0 0 0 0 0 0 0 1.812-1.469 3.281-3.281 3.281s-3.281-1.469-3.281-3.281zM21.513 24.485c0-1.641 1.331-2.972 2.972-2.972s2.972 1.331 2.972 2.972c0 1.641-1.331 2.972-2.972 2.972s-2.972-1.331-2.972-2.972zM13.308 28c0-1.487 1.205-2.692 2.692-2.692s2.692 1.205 2.692 2.692c0 1.487-1.205 2.692-2.692 2.692s-2.692-1.205-2.692-2.692zM5.077 24.485c0-1.346 1.092-2.438 2.438-2.438s2.438 1.092 2.438 2.438c0 1.346-1.092 2.438-2.438 2.438s-2.438-1.092-2.438-2.438zM1.792 16c0-1.22 0.989-2.208 2.208-2.208s2.208 0.989 2.208 2.208c0 1.22-0.989 2.208-2.208 2.208s-2.208-0.989-2.208-2.208zM5.515 7.515c0 0 0 0 0 0 0-1.105 0.895-2 2-2s2 0.895 2 2c0 0 0 0 0 0 0 1.105-0.895 2-2 2s-2-0.895-2-2zM28.108 7.515c0 2.001-1.622 3.623-3.623 3.623s-3.623-1.622-3.623-3.623c0-2.001 1.622-3.623 3.623-3.623s3.623 1.622 3.623 3.623z"
  />
</symbol>
<WalletAccess>
  <section class="py-8 px-4">
    {#if !$tiles.step}
      <div>Messages not loaded</div>
    {:else if $tiles.error}
      <div>Error: {$tiles.error}</div>
    {:else if $tiles.step === 'LOADING'}
      <div>Loading Map...</div>
    {:else if !$tiles.data || !$players.data}
      <div>Something failed to load!</div>
    {:else}
      <div class="flex flex-col">
        <div class="flex justify-center">
          <div class="grid grid-cols-6 w-fit h-fit">
            {#each [0, 1, 2, 3, 4] as x}
              {#each [0, 1, 2, 3, 4, 5] as y}
                <Tile
                  {x}
                  {y}
                  tile={$tiles.data.find((v) => v.x === x.toString() && v.y === y.toString())}
                  players={$players.data}
                  currentPlayer={$players.data.find((p) =>
                    $wallet.address ? p.id === $wallet.address.toLowerCase() : false
                  )}
                />
              {/each}
            {/each}
          </div>
        </div>
        <div class="flex justify-center">
          <div class="border-2 w-fit p-2 m-2">
            {#if $wallet.address && $players.data.find((p) => p.id === $wallet.address.toLowerCase())}
              <PlayerInfo
                currentPlayer={$players.data.find((p) =>
                  $wallet.address ? p.id === $wallet.address.toLowerCase() : false
                )}
              />
            {:else}
              <button
                class="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-xl border-4
        text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                type="button"
                on:click={() => join()}>Press me to join the game!</button
              >
            {/if}
          </div>
        </div>
      </div>
    {/if}
  </section>
</WalletAccess>

<style>
  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: gray;
    opacity: 0.5;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: gray;
    opacity: 0.5;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: gray;
    opacity: 0.5;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: gray;
    opacity: 0.5;
  }
  @media (prefers-color-scheme: dark) {
    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: pink;
      opacity: 0.5;
    }
    ::-moz-placeholder {
      /* Firefox 19+ */
      color: pink;
      opacity: 0.5;
    }
    :-ms-input-placeholder {
      /* IE 10+ */
      color: pink;
      opacity: 0.5;
    }
    :-moz-placeholder {
      /* Firefox 18- */
      color: pink;
      opacity: 0.5;
    }
  }
</style>
