<script lang="ts">
  import { readTheme, writeTheme } from "$lib";
  import PaintIcon from "$lib/assets/paint-icon.svg?raw";
  import { onMount } from "svelte";

  let theme = $state("");

  function handleThemeToggle() {
    theme = theme === "dark" ? "light" : "dark";
  }

  function initialiseTheme() {
    theme = readTheme();
  }

  function updateThemeOnChange() {
    writeTheme(theme);
  }

  onMount(initialiseTheme);
  $effect(updateThemeOnChange);
</script>

<div class="flex w-full items-center justify-between">
  <button class="hover:bg-muted/10 rounded p-2" aria-label={theme} onclick={handleThemeToggle}>
    <!-- eslint-disable-next-line -->
    {@html PaintIcon}
  </button>

  <span class="text-muted text-sm">
    {theme.charAt(0).toUpperCase() + theme.slice(1)}
  </span>
</div>
