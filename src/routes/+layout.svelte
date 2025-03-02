<script lang="ts">
  import "../app.css";

  import FooterBar from "$lib/components/footer-bar.svelte";
  import { Toaster } from "$lib/components/ui/sonner";

  let { children } = $props();
</script>

<Toaster theme="dark" />

<main class="flex min-h-[95vh] flex-col gap-4 py-4">
  {@render children()}
</main>

<FooterBar />
