<script lang="ts">
  import WalletAccess from '$lib/blockchain/WalletAccess.svelte';
  import {wallet, flow} from '$lib/blockchain/wallet';
  import {onMount} from 'svelte';
  import {combine} from 'union-quest-common';
  import {getPlayer} from '$lib/player/player';
  import {players} from '$lib/player/players';
  import {villages} from '$lib/village/villages';
  import Modal from '$lib/components/styled/Modal.svelte';
  import Tile from '$lib/components/Tile.svelte';

  let showModal = false;
  let player = getPlayer('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199');

  async function move(x, y) {
    await flow.execute((contracts) => contracts.UnionQuestCore.move(x, y));
  }

  onMount(() => {
    console.log('mount demo', {
      combine: combine(wallet.address || '0x0000000000000000000000000000000000000000', 'hi').toString(),
    });
  });
</script>

<symbol id="icon-spinner6" viewBox="0 0 32 32">
  <path
    d="M12 4c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM24.719 16c0 0 0 0 0 0 0-1.812 1.469-3.281 3.281-3.281s3.281 1.469 3.281 3.281c0 0 0 0 0 0 0 1.812-1.469 3.281-3.281 3.281s-3.281-1.469-3.281-3.281zM21.513 24.485c0-1.641 1.331-2.972 2.972-2.972s2.972 1.331 2.972 2.972c0 1.641-1.331 2.972-2.972 2.972s-2.972-1.331-2.972-2.972zM13.308 28c0-1.487 1.205-2.692 2.692-2.692s2.692 1.205 2.692 2.692c0 1.487-1.205 2.692-2.692 2.692s-2.692-1.205-2.692-2.692zM5.077 24.485c0-1.346 1.092-2.438 2.438-2.438s2.438 1.092 2.438 2.438c0 1.346-1.092 2.438-2.438 2.438s-2.438-1.092-2.438-2.438zM1.792 16c0-1.22 0.989-2.208 2.208-2.208s2.208 0.989 2.208 2.208c0 1.22-0.989 2.208-2.208 2.208s-2.208-0.989-2.208-2.208zM5.515 7.515c0 0 0 0 0 0 0-1.105 0.895-2 2-2s2 0.895 2 2c0 0 0 0 0 0 0 1.105-0.895 2-2 2s-2-0.895-2-2zM28.108 7.515c0 2.001-1.622 3.623-3.623 3.623s-3.623-1.622-3.623-3.623c0-2.001 1.622-3.623 3.623-3.623s3.623 1.622 3.623 3.623z"
  />
</symbol>
<WalletAccess>
  {#if showModal}
    <Modal title={item.itemType.name} on:close={() => (showModal = false)} closeButton={true}>
      <p class="w-64 text-black-500 p-1">
        {item.itemType.description}
      </p>
      <p class="w-64 text-black-500 p-1">
        Can only be place on
        {#if item.itemType.tileType === 0}
          <span class="w-64 text-blue-500">water</span>
        {:else}
          <span class="w-64 text-green-500">land</span>
        {/if}
        tiles.
      </p>
      <p class="w-64 text-blue-500 p-1">
        You own {item.value}.
      </p>
    </Modal>
  {/if}
  <section class="py-8 px-4">
    {#if !$player.step}
      <div>Messages not loaded</div>
    {:else if $player.error}
      <div>Error: {$player.error}</div>
    {:else if $player.step === 'LOADING'}
      <div>Loading Messages...</div>
    {:else if !$player.data}
      <button on:click={() => move(0, 0)}>move</button>
    {:else if !$villages.data || !$players.data}
      <div>loading map...</div>
    {:else}
      x: {$player.data.x}
      y: {$player.data.y}

      <div class="grid grid-cols-6 w-fit">
        {#each [0, 1, 2, 3, 4, 5] as x}
          {#each [0, 1, 2, 3, 4, 5] as y}
            <Tile
              {x}
              {y}
              village={$villages.data.find((v) => v.x === x && v.y === y)}
              players={$players.data.filter((v) => v.x === x && v.y === y)}
            />
          {/each}
        {/each}
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
