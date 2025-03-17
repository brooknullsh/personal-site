<script lang="ts">
  import { onMount } from "svelte";

  type Props = { key: string };
  let { key }: Props = $props();

  let isMobile = $state(true);

  onMount(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    isMobile = /iphone|ipad|ipod|android/i.test(userAgent);
  });
</script>

{#if !isMobile}
  <div class="flex items-center">
    <span
      class="bg-secondary border h-min rounded-sm px-1 flex items-center text-xs text-muted-foreground"
    >
      &lsaquo;{key}&rsaquo;
    </span>
  </div>
{/if}
