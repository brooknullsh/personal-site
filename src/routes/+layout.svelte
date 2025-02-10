<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<main class="flex flex-col gap-4 py-4">
  {@render children()}
</main>
