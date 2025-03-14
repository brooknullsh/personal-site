<script lang="ts">
  import FooterBar from "$lib/components/footer-bar.svelte";
  import { Toaster } from "$lib/components/ui/sonner";
  import "../app.css";

  let { children } = $props();
</script>

<Toaster theme="dark" />

<main class="flex min-h-[95vh] flex-col">
  {@render children()}
</main>

<FooterBar />
