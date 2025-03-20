<script lang="ts">
  import { Content, Group, GroupHeading, Item, Root, Trigger } from "$lib/components/ui/select";
  import { Separator } from "$lib/components/ui/separator";
  import { type Snippet, onMount } from "svelte";

  type Props = {
    children: Snippet;
    title: string;
    subtitle: string;
  };

  let { children, title, subtitle }: Props = $props();
  let theme = $state("");

  function readTheme() {
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    theme = localStorage.getItem("theme") || system;
  }

  function adjustElementClass(element: HTMLElement) {
    const previousTheme = theme === "dark" ? "light" : "dark";
    element.classList.remove(`code-block-${previousTheme}`);
    element.classList.add(`code-block-${theme}`);
  }

  function updateTheme() {
    document.documentElement.setAttribute("class", theme);
    localStorage.setItem("theme", theme);

    document.querySelectorAll("pre").forEach(adjustElementClass);
    document.querySelectorAll("code").forEach(adjustElementClass);
  }

  onMount(readTheme);
  $effect(updateTheme);
</script>

<nav
  class="bg-background/10 sticky top-0 z-50 flex h-20 items-center justify-between px-8 backdrop-blur-lg"
>
  <div class="flex w-1/2 flex-col gap-2">
    <h1 class="truncate text-3xl font-bold" {title}>{title}</h1>
    <p class="text-muted-foreground truncate text-sm" title={subtitle}>
      {subtitle}
    </p>
  </div>
  <div class="flex justify-end gap-2">
    <Root type="single" bind:value={theme}>
      <Trigger class="w-min">
        {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </Trigger>
      <Content>
        <Group>
          <GroupHeading>Theme</GroupHeading>
          <Separator />
          <Item value="dark">Dark</Item>
          <Item value="light">Light</Item>
        </Group>
      </Content>
    </Root>
    <Separator orientation="vertical" />
    {@render children()}
  </div>
</nav>
