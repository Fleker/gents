import { ITEM_MAP } from "./all-items"
import { ItemId } from "./type-item"

interface Character {
  heal: (hp: number) => void
}

export function useItem(player: Character, selection: ItemId) {
  const item = ITEM_MAP[selection] // I want to ensure this value is going to be a known item
  player.heal(item.recovery)
}