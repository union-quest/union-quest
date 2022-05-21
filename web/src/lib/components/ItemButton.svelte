<script lang="ts">
  import type {Item} from '$lib/item/item';
  import ItemDetail from './ItemDetail.svelte';
  import Modal from './styled/Modal.svelte';

  export let item: Item;

  let showModal = false;
  let selectedItem = '0';
</script>

<div>
  {#if showModal}
    <Modal on:close={() => (showModal = false)} closeButton={true}><ItemDetail id={selectedItem} /></Modal>
  {/if}
  <div
    class="flex flex-col content-center border-2 w-fit"
    on:click={() => {
      showModal = true;
      selectedItem = item.id;
    }}
  >
    <div class="flex justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100">
        {@html item.image}
      </svg>
    </div>
    <div class="border-2 text-xl bg-gray-300 text-center">{item.name}</div>
  </div>
</div>
