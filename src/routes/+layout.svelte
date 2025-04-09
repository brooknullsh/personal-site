<script lang="ts">
  import ContentBar from "$lib/components/content-bar.svelte";
  import "../app.css";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

  let { children } = $props();

  injectAnalytics();
  injectSpeedInsights();
</script>

<main class="flex-col sm:flex sm:flex-row">
  <ContentBar />

  <section class="container flex flex-col gap-6 overflow-x-auto py-12">
    {@render children()}
  </section>
</main>
