<script lang="ts">
  import "../app.css";

  import FooterBar from "$lib/components/footer-bar.svelte";

  let { children } = $props();
</script>

<main class="flex min-h-[95vh] flex-col gap-4 py-4">
  {@render children()}
</main>

<FooterBar />
