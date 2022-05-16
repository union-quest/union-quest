<script lang="ts">
  import WalletAccess from '$lib/blockchain/WalletAccess.svelte';
  import {wallet, flow} from '$lib/blockchain/wallet';
  import {players} from '$lib/player/players';
  import PlayerInfo from '$lib/components/PlayerInfo.svelte';
  import MapCanvas from '$lib/components/MapCanvas.svelte';
  import NavButton from '$lib/components/styled/navigation/NavButton.svelte';
  import {url} from '$lib/utils/url';

  async function join() {
    await flow.execute((contracts) => contracts.UnionQuest.move(0, 0));
  }
</script>

<symbol id="icon-spinner6" viewBox="0 0 32 32">
  <path
    d="M12 4c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM24.719 16c0 0 0 0 0 0 0-1.812 1.469-3.281 3.281-3.281s3.281 1.469 3.281 3.281c0 0 0 0 0 0 0 1.812-1.469 3.281-3.281 3.281s-3.281-1.469-3.281-3.281zM21.513 24.485c0-1.641 1.331-2.972 2.972-2.972s2.972 1.331 2.972 2.972c0 1.641-1.331 2.972-2.972 2.972s-2.972-1.331-2.972-2.972zM13.308 28c0-1.487 1.205-2.692 2.692-2.692s2.692 1.205 2.692 2.692c0 1.487-1.205 2.692-2.692 2.692s-2.692-1.205-2.692-2.692zM5.077 24.485c0-1.346 1.092-2.438 2.438-2.438s2.438 1.092 2.438 2.438c0 1.346-1.092 2.438-2.438 2.438s-2.438-1.092-2.438-2.438zM1.792 16c0-1.22 0.989-2.208 2.208-2.208s2.208 0.989 2.208 2.208c0 1.22-0.989 2.208-2.208 2.208s-2.208-0.989-2.208-2.208zM5.515 7.515c0 0 0 0 0 0 0-1.105 0.895-2 2-2s2 0.895 2 2c0 0 0 0 0 0 0 1.105-0.895 2-2 2s-2-0.895-2-2zM28.108 7.515c0 2.001-1.622 3.623-3.623 3.623s-3.623-1.622-3.623-3.623c0-2.001 1.622-3.623 3.623-3.623s3.623 1.622 3.623 3.623z"
  />
</symbol>
<WalletAccess>
  {#if !$players.step}
    <div>Messages not loaded</div>
  {:else if $players.error}
    <div>Error: {$players.error}</div>
  {:else if $players.step === 'LOADING'}
    <div>Loading Map...</div>
  {:else if !$players.data}
    <div>Players failed to load!</div>
  {:else}
    <MapCanvas
      players={$players.data}
      currentPlayer={$players.data.find((p) => ($wallet.address ? p.id === $wallet.address.toLowerCase() : false))}
    />
    <div class="relative">
      <div class="fixed bottom-0 left-0 m-2">
        <NavButton href={url('/')} label="Home">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
            />
          </svg>
        </NavButton>
      </div>

      <div class="fixed bottom-0 right-0 border-8 border-double border-gray-700 bg-gray-300 p-1">
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
            on:click={() => join()}>Click here to join the game!</button
          >
        {/if}
      </div>
    </div>
  {/if}
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
