<script lang="ts">
  import DaiSymbol from './DaiSymbol.svelte';
  import type {BigNumber} from '@ethersproject/bignumber';

  export let value: BigNumber;
</script>

<div class="flex ">
  {value.div('1000000000000000000')}
  <DaiSymbol />
</div>
