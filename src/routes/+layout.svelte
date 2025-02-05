<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<main class="container flex flex-col gap-4 py-8">
  {@render children()}
</main>
