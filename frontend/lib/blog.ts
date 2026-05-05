// Shared blog utilities. Used by both the index card and the post detail page.

export function authorInitials(name: string | null): string {
  if (!name) return "AP";
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "A";
  const b = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (a + b).toUpperCase();
}
