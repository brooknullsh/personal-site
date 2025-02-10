<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { Root, Trigger, Content, Group, GroupHeading, Item } from "$lib/components/ui/select";

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

  const updateTheme = () => {
    document.documentElement.setAttribute("class", theme);
    localStorage.setItem("theme", theme);
  };

  onMount(readTheme);
  $effect(updateTheme);
</script>

<section
  class="sticky top-0 flex h-20 w-full items-center justify-between bg-white/10 px-8 backdrop-blur-md dark:bg-black/10"
>
  <div class="flex w-1/2 flex-col gap-2">
    <h1 class="truncate text-3xl font-bold" {title}>{title}</h1>
    <p class="truncate text-xs text-muted-foreground" title={subtitle}>{subtitle}</p>
  </div>

  <div class="flex w-1/2 justify-end gap-2">
    <Root type="single" bind:value={theme}>
      <Trigger class="w-max">{theme}</Trigger>
      <Content>
        <Group>
          <GroupHeading>Theme</GroupHeading>
          <Item value="dark">dark</Item>
          <Item value="light">light</Item>
        </Group>
      </Content>
    </Root>

    {@render children?.()}
  </div>
</section>
