<script lang="ts">
  import { isMobile } from "$lib/stores";

  type Props = { key: string };
  let { key }: Props = $props();
</script>

{#if !$isMobile}
  <div class="flex items-center">
    <span
      class="bg-secondary/50 border h-min rounded-sm px-1 flex items-center text-xs text-muted-foreground"
    >
      &lsaquo;{key}&rsaquo;
    </span>
  </div>
{/if}
