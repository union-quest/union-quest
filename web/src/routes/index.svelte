<script context="module">
  // export const hydrate = false;
</script>

<script lang="ts">
  import NavButton from '$lib/components/styled/navigation/NavButton.svelte';
  import {url} from '$lib/utils/url';
  const name = 'Union Quest';

  function _select(elem: HTMLElement) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(elem);
    console.log({selection: range.toString()});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (selection as any).removeAllRanges();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (selection as any).addRange(range);
  }
  function select(e: MouseEvent) {
    _select(e.currentTarget as HTMLElement);
  }
</script>

<section class="py-2 px-4 text-center">
  <div class="max-w-auto md:max-w-lg mx-auto">
    <img
      class="mb-8 mx-auto"
      src="images/Logo/Union Quest Long.svg"
      alt={name}
      style="width:800px;height:256px;"
      width="800px"
      height="500px"
    />
    <h2 class="text-6xl font-black mb-2 font-heading text-black dark:text-white">
      {name}
    </h2>
    <p class="m-6 text-gray-800 dark:text-gray-300 text-xl">A fully on-chain MMORPG.</p>
    <div class="max-w-md mx-auto pt-1 mt-5 space-y-3 md:mt-8 md:space-y-5">
      <div class="space-y-5 sm:flex sm:justify-center sm:space-y-0 sm:space-x-3">
        <NavButton class="big secondary" href={url('map/')} label="World map">World map</NavButton>
        <NavButton
          blank={true}
          class="big secondary"
          href="https://github.com/union-quest/union-quest"
          label="Check it out on github!"
        >
          Github
        </NavButton>
      </div>
    </div>
  </div>
</section>
