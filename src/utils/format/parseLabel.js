export function parseLabel(label = "") {
  const [linha1 = "", linha2 = ""] = String(label).split("\n");
  return { linha1, linha2 };
}