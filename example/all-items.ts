interface Item {
  label: string
  description: string
  recovery: number
}

export const ITEM_MAP: Record<string, Item> = {
  potion: {
    label: 'Potion',
    description: 'Heals 50 HP',
    recovery: 50,
  },
  elixir: {
    label: 'Elixir',
    description: 'Heals 100 HP',
    recovery: 100,
  },
  wishdust: {
    label: 'Wish Dust',
    description: 'Heals all HP',
    recovery: Infinity
  },
}