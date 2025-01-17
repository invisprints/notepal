import { MantineTheme } from "@mantine/core";

export function mq(
  theme: MantineTheme,
  size: "sx" | "sm" | "md" | "lg" | "xl"
) {
  return `@media (min-width: ${theme.breakpoints[size]}px)`;
}

export function downloadText(filename: string, data: string) {
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + data], { type: "text/csv;charset=utf-8" });
  const elem = window.document.createElement("a");
  elem.href = window.URL.createObjectURL(blob);
  elem.download = filename;
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}
