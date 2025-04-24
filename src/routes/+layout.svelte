<script lang="ts">
  import ContentBar from "$lib/components/content-bar.svelte";
  import "../app.css";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

  let { children } = $props();

  injectAnalytics();
  injectSpeedInsights();

  const HOST = "https://brooknullsh.com";
  const TITLE = "Brook Nash";
  const DESCRIPTION = "Brook Nash's personal site.";
</script>

<svelte:head>
  <title>Brooknullsh | Brook Nash</title>
  <meta name="description" content="Brook Nash's personal website." />
  <meta name="author" content="Brook Nash" />
  <meta property="og:description" content={DESCRIPTION} />
  <meta property="og:title" content={TITLE} />
  <meta property="og:url" content={HOST} />
  <meta name="twitter:card" property="twitter:card" content="summary_large_image" />
  <meta name="twitter:image:alt" property="twitter:title" content={TITLE} />
  <meta name="twitter:title" property="twitter:title" content={TITLE} />
  <meta name="twitter:description" property="twitter:description" content={DESCRIPTION} />
  <meta
    property="og:image"
    content={`${HOST}/api/metadata?title=${TITLE}&subtitle=${DESCRIPTION}`}
  />
  <meta
    name="twitter:image"
    property="twitter:image"
    content={`${HOST}/api/metadata?title=${TITLE}&subtitle=${DESCRIPTION}`}
  />
</svelte:head>

<main class="flex-col sm:flex sm:flex-row">
  <ContentBar />

  <section class="container flex flex-col gap-6 overflow-x-auto py-12">
    {@render children()}
  </section>
</main>
