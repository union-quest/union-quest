<script lang="ts">
  import {getItem} from '$lib/item/item';

  export let id: string;

  const item = getItem(id);
</script>

<div>
  {#if !$item.step}
    <div>Item not loaded</div>
  {:else if $item.error}
    <div>Error: {$item.error}</div>
  {:else if $item.step === 'LOADING'}
    <div>Loading Item...</div>
  {:else if !$item.data}
    <div>Item failed to load!</div>
  {:else}
    <div class="text-2xl">Item #{$item.data.id}</div>
    <div>Name: {$item.data.name}</div>
    <div>Symbol: {$item.data.symbol}</div>
    <div>Stake: {$item.data.stake}</div>
    <div class="flex flex-col">
      <div class="text-xl">Can be mined using:</div>
      {#if $item.data.tools.length > 0}
        {#each $item.data.tools as t}
          <div>
            {t.symbol}{t.name}
          </div>
        {/each}
      {:else}
        This item cannot be mined.
      {/if}
    </div>
    <div class="flex flex-col">
      <div class="text-xl">Can be crafted with:</div>
      {#if $item.data.recipes.length > 0}
        {#each $item.data.recipes as recipe}
          <div class="text-xl ">Recipe {recipe.id}</div>
          <div class="flex flex-row justify-between m-2 border-2">
            <div>
              {#each recipe.inputs as input, i}
                <div class="border-2">
                  <div class="border-2 bg-gray-300">{recipe.inputQuantities[i]}</div>
                  <div class="border-2 text-xl">{input.symbol}</div>
                </div>
              {/each}
            </div>
            <div class="text-2xl">➡️</div>
            <div class="flex flex-col">
              <div class="border-2 text-center">
                <div class="border-2 text-2xl">{recipe.output.symbol}</div>
                <div class="border-2 text-xl bg-gray-300">{recipe.output.name}</div>
              </div>
            </div>
          </div>
        {/each}
      {:else}
        This item cannot be crafted.
      {/if}
    </div>
  {/if}
</div>
