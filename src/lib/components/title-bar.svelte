<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { Root, Trigger, Content, Group, GroupHeading, Item } from "$lib/components/ui/select";
  import { Separator } from "$lib/components/ui/separator";

  type Props = {
    children?: Snippet;
    title: string;
    subtitle: string;
  };

  let { children, title, subtitle }: Props = $props();
  let theme = $state("");

  const readTheme = () => {
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    theme = localStorage.getItem("theme") || system;
  };

  const adjustElementClass = (element: HTMLElement) => {
    const previousTheme = theme === "dark" ? "light" : "dark";
    element.classList.remove(`code-block-${previousTheme}`);
    element.classList.add(`code-block-${theme}`);
  };

  const updateTheme = () => {
    document.documentElement.setAttribute("class", theme);
    localStorage.setItem("theme", theme);

    document.querySelectorAll("pre").forEach(adjustElementClass);
    document.querySelectorAll("code").forEach(adjustElementClass);
  };

  onMount(readTheme);
  $effect(updateTheme);
</script>

<nav class="sticky top-0 flex h-20 items-center justify-between bg-card/50 px-8 backdrop-blur-sm">
  <div class="flex w-1/2 flex-col gap-2">
    <h1 class="truncate text-3xl font-bold" {title}>{title}</h1>
    <p class="truncate text-xs text-muted-foreground" title={subtitle}>{subtitle}</p>
  </div>

  <div class="flex w-1/2 justify-end gap-2">
    <Root type="single" bind:value={theme}>
      <Trigger class="w-max">{theme.charAt(0).toUpperCase() + theme.slice(1)}</Trigger>
      <Content>
        <Group class="flex flex-col gap-1">
          <GroupHeading>Theme</GroupHeading>
          <Separator />
          <Item value="dark">Dark</Item>
          <Item value="light">Light</Item>
        </Group>
      </Content>
    </Root>

    {#if children}
      <Separator orientation="vertical" />
      {@render children()}
    {/if}
  </div>
</nav>
