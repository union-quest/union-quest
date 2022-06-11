<script lang="ts">
  import DaiSymbol from './DaiSymbol.svelte';
  import type {BigNumber} from '@ethersproject/bignumber';

  export let value: BigNumber;

  const DECIMALS = '1000000000000000000';
</script>

<div class="flex">
  {value.div(DECIMALS)}
  <DaiSymbol />
</div>
