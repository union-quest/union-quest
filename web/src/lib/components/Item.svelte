<script lang="ts">
  import {flow, wallet} from '$lib/blockchain/wallet';

  import {getItem} from '$lib/item/item';

  export let id: string;

  async function transfer(id: string) {
    await flow.execute((contracts) =>
      contracts.UnionQuest.safeTransferFrom($wallet.address, '0xb19BC46C52A1352A071fe2389503B6FE1ABD50Ff', id, 1, [])
    );
  }

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
    <div>Description: {$item.data.description}</div>
    <div>Symbol: {$item.data.symbol}</div>
    <div>Stake: {$item.data.stake}</div>
    <button on:click={() => transfer(id)}>Transfer 1</button>
    <div class="flex flex-col">
      <div class="text-xl">Can be mined with:</div>
      {#if $item.data.tools.length > 0}
        {#each $item.data.tools as t}
          <div>
            {t.tool.symbol}{t.tool.name}
          </div>
        {/each}
      {:else}
        This item cannot be mined.
      {/if}
    </div>
    <div class="flex flex-col">
      <div class="text-xl">Is used to mine:</div>
      {#if $item.data.isTools.length > 0}
        {#each $item.data.isTools as t}
          <div>
            {t.item.symbol}{t.item.name}
          </div>
        {/each}
      {:else}
        This item isn't used to mine anything.
      {/if}
    </div>
    <div class="flex flex-col">
      <div class="text-xl">Can be crafted with:</div>
      {#if $item.data.outputRecipes.length > 0}
        {#each $item.data.outputRecipes as recipe}
          <div class="text-xl ">Recipe {recipe.id}</div>
          <div class="flex flex-row justify-between m-2 border-2">
            <div>
              {#each recipe.inputs as input, i}
                <div class="border-2">
                  <div class="border-2 bg-gray-300">{recipe.inputs[i].quantity}</div>
                  <div class="border-2 text-xl">{input.item.symbol}</div>
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
    <div class="flex flex-col">
      <div class="text-xl">Is used to craft:</div>
      {#if $item.data.inputs.length > 0}
        {#each $item.data.inputs as input}
          <div class="text-xl ">Recipe {input.recipe.id}</div>
          <div class="flex flex-row justify-between m-2 border-2">
            <div>
              {#each input.recipe.inputs as input, i}
                <div class="border-2">
                  <div class="border-2 bg-gray-300">{input.quantity}</div>
                  <div class="border-2 text-xl">{input.item.symbol}</div>
                </div>
              {/each}
            </div>
            <div class="text-2xl">➡️</div>
            <div class="flex flex-col">
              <div class="border-2 text-center">
                <div class="border-2 text-2xl">{input.recipe.output.symbol}</div>
                <div class="border-2 text-xl bg-gray-300">{input.recipe.output.name}</div>
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
