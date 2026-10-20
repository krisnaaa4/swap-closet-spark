export function toggleSwapSelection(selected: string[], id: string, directExchange: boolean): string[] {
  if (selected.includes(id)) return selected.filter(value => value !== id);
  return directExchange ? [id] : [...selected, id];
}

export function isValidSwapSelection(selected: string[], directExchange: boolean): boolean {
  return selected.length > 0 && new Set(selected).size === selected.length && (!directExchange || selected.length === 1);
}

export function canPayForSwap(directExchange: boolean, selected: string[]): boolean {
  return directExchange && isValidSwapSelection(selected, true);
}