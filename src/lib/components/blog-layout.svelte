<script lang="ts">
  import TitleBar from "./title-bar.svelte";

  let { children, title, description, published } = $props();

  published = new Date(published).toLocaleDateString(undefined, { dateStyle: "full" });
</script>

<svelte:head>
  <title>{title} | brooknullsh</title>
</svelte:head>

<TitleBar {title} {published} />

<hr />

<p class="text-muted-foreground">{description}</p>

{@render children()}
