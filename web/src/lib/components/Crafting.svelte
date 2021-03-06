<script lang="ts">
  import {flow} from '$lib/blockchain/wallet';
  import {getBalanceStreamed, Player} from '$lib/player/player';

  import {recipes} from '$lib/recipe/recipes';
  import {onMount} from 'svelte';
  import ItemButton from './ItemButton.svelte';
  import Modal from './styled/Modal.svelte';

  export let currentPlayer: Player | null;

  async function craft(id: string) {
    await flow.execute((contracts) => contracts.UnionQuest.craft(id));
  }

  let currentTimestamp = Date.now();
  let showModal = false;

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
    <Modal title="Crafting" on:close={() => (showModal = false)} closeButton={true}>
      {#if !$recipes.step}
        <div>Messages not loaded</div>
      {:else if $recipes.error}
        <div>Error: {$recipes.error}</div>
      {:else if $recipes.step === 'LOADING'}
        <div>Loading Map...</div>
      {:else if !$recipes.data}
        <div>Recipes failed to load!</div>
      {:else}
        <div class="flex flex-col">
          {#each $recipes.data as recipe}
            <div class="text-xl ">Recipe {recipe.id}</div>
            <div class="flex flex-row justify-between m-2 border-2">
              <div>
                {#each recipe.inputs as input, i}
                  <div class="border-2">
                    <div>
                      {Math.round(getBalanceStreamed(currentPlayer, currentTimestamp / 1000, input.item.id))} /
                      <div class="font-bold inline">{input.quantity}</div>
                    </div>
                    <ItemButton item={input.item} />
                  </div>
                {/each}
              </div>
              <div class="text-2xl">➡️</div>
              <div class="flex flex-col">
                <ItemButton item={recipe.output} />
                {#if getBalanceStreamed(currentPlayer, currentTimestamp / 1000, recipe.inputs[0].item.id) > parseInt(recipe.inputs[0].quantity) && getBalanceStreamed(currentPlayer, currentTimestamp / 1000, recipe.inputs[1].item.id) > parseInt(recipe.inputs[1].quantity)}
                  <button class="border-2 bg-green-400 border-gray-500 p-1 m-2" on:click={() => craft(recipe.id)}>
                    Craft
                  </button>
                {:else}
                  <button class="border-2 bg-red-400 border-gray-500 p-1 m-2">Craft</button>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </Modal>
  {/if}

  <div class="text-xl">Crafting</div>
  <button class="border-2 border-gray-700 p-1" on:click={() => (showModal = true)}>View the crafting table</button>
</div>
