<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<main class="container gap-12 py-8">
  {@render children()}
</main>
