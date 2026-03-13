export function emailToName(email: string): string {
  const [local = ""] = email.split("@");
  const [beforeTag = ""] = local.split("+");

  const cleaned = beforeTag.replace(/[._-]+/g, " ").trim();
  if (!cleaned) return "Usuário";

  const parts = cleaned
    .split(" ")
    .filter((p): p is string => typeof p === "string" && p.length > 0);

  return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
}
