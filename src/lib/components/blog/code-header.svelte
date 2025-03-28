<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { toast } from "svelte-sonner";

  type Props = { fileName: string };
  let { fileName }: Props = $props();

  let headerElement = $state<HTMLDivElement | null>(null);
  let codeContent = $derived.by(() => {
    if (!headerElement || typeof window === "undefined") return "";

    const preElement = headerElement.nextElementSibling;
    if (!preElement) return "";

    const { firstElementChild: codeElement } = preElement;
    return codeElement ? codeElement.textContent : "";
  });
</script>

<div
  class="flex items-center justify-between pl-3 border border-b-0 rounded-t bg-secondary/50"
  bind:this={headerElement}
>
  <p class="text-muted-foreground text-sm">{fileName}</p>
  <Button
    variant="ghost"
    onclick={async () => {
      if (!codeContent) return;
      await navigator.clipboard.writeText(codeContent);
      toast.success("Success", { description: `Snippet "${fileName}" copied` });
    }}
  >
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 4C16.93 4 17.395 4 17.7765 4.10222C18.8117 4.37962 19.6204 5.18827 19.8978 6.22354C20 6.60504 20 7.07003 20 8V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V8C4 7.07003 4 6.60504 4.10222 6.22354C4.37962 5.18827 5.18827 4.37962 6.22354 4.10222C6.60504 4 7.07003 4 8 4M9.6 6H14.4C14.9601 6 15.2401 6 15.454 5.89101C15.6422 5.79513 15.7951 5.64215 15.891 5.45399C16 5.24008 16 4.96005 16 4.4V3.6C16 3.03995 16 2.75992 15.891 2.54601C15.7951 2.35785 15.6422 2.20487 15.454 2.10899C15.2401 2 14.9601 2 14.4 2H9.6C9.03995 2 8.75992 2 8.54601 2.10899C8.35785 2.20487 8.20487 2.35785 8.10899 2.54601C8 2.75992 8 3.03995 8 3.6V4.4C8 4.96005 8 5.24008 8.10899 5.45399C8.20487 5.64215 8.35785 5.79513 8.54601 5.89101C8.75992 6 9.03995 6 9.6 6Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </Button>
</div>
