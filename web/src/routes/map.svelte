<script lang="ts">
  import WalletAccess from '$lib/blockchain/WalletAccess.svelte';
  import {wallet, flow} from '$lib/blockchain/wallet';
  import {onMount} from 'svelte';
  import {combine} from 'union-quest-common';
  import {getPlayer} from '$lib/player/player';
  import {players} from '$lib/player/players';
  import {villages} from '$lib/village/villages';

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

      <table>
        {#each [0, 1, 2, 3, 4, 5] as i}
          <tr>
            {#each [0, 1, 2, 3, 4, 5] as j}
              <td on:click={() => move(i, j)}>
                <svg width="100">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                    <rect fill="#009A17" width="1" height="1" />
                    <path d="M 0.161,0.178 0.249,0.336" fill="none" stroke="#004400" stroke-width="0.02" />
                    <path d="M 0.314,0.173 V 0.33" fill="none" stroke="#004400" stroke-width="0.02" />
                    <path d="M 0.469,0.178 0.376,0.336" fill="none" stroke="#004400" stroke-width="0.02" />
                    <path d="m 0.48277796,0.53428125 0.088,0.158" fill="none" stroke="#004400" stroke-width="0.02" />
                    <path d="m 0.63577796,0.52928125 v 0.157" fill="none" stroke="#004400" stroke-width="0.02" />
                    <path d="m 0.79077796,0.53428125 -0.093,0.158" fill="none" stroke="#004400" stroke-width="0.02" />
                  </svg>
                  {#if $villages.data.some((v) => v.x === i && v.y === j)}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                      <polygon fill="gold" points="0.25,0.35 0.5,0.1 0.75,0.35" />
                      <rect fill="darkkhaki" x="0.25" y="0.35" width="0.5" height="0.5" />
                      <rect fill="brown" x="0.45" y="0.65" width="0.1" height="0.2" />
                    </svg>
                  {/if}
                  {#if $players.data.some((v) => v.x === i && v.y === j)}
                    {#if $players.data.find((v) => v.x === i && v.y === j).id === $wallet.address.toLowerCase()}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                        <circle fill="white" r="0.25" cx="0.5" cy="0.5" />
                      </svg>
                    {:else}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                        <circle fill="black" r="0.25" cx="0.5" cy="0.5" />
                      </svg>
                    {/if}
                  {/if}
                </svg>
              </td>
            {/each}
          </tr>
        {/each}
      </table>
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
