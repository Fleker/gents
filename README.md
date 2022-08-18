# 🎩 Gents

This is a project borne out of some of the limitations I found in the
TypeScript types system.

Namely, there are times when I have a map of key-value pairs that I want to use
elsewhere in the code with the benefit of type-safety. However, you can't just
convert keys of a map into a type. However, trying to maintain a separate list
of types to use in the map is cumbersome and annoying. It doesn't scale.

Gents basically helps out here. Files with the `.gents` file extension will,
when this tool is run, be executed using Node. You use `console.log` to
generate the output, which is then saved as the same filename but as the `.ts`
extension instead.

```
npm install @fleker/gents
```

## Library Usage

```typescript
import { assert } from '@fleker/gents'

interface Item {
  label: string
}

export const ITEM_MAP = {
  potion: assert<Item>({
    label: 'Potion'
  })
}

export type ItemId = keyof typeof ITEM_MAP
```

## Example

### all-items.ts

```typescript
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
```

### item-usage.ts

```typescript
export function useItem(player: Character, selection: ItemId) {
  const item = ITEM_MAP[selection] // I want to ensure this value is going to be a known item
  player.heal(item.recovery)
}
```

### battle-rewards.ts

```typescript
export function giveRewardAfterBattle() {
  const possibleRewards: ItemId[] = [
    'potion',
    'elixir',
    // 'wishdust', // No this is too powerful for a normal reward
  ]
}
```

Here in this example I want to ensure that every reward and item being used
is going to be a known type. If it hasn't been registered, I should be alerted.
This will also help me catch potential typos.

Over time, the number of items may grow too high to justify maintaining a
manual `ItemId` type. Rather, I'd like to go the other way, where the map then
creates the type automatically.

### type-item.gents

```javascript
const {ITEM_MAP} = require('./all-items') // Need JS transpilation of 'all-item.ts'

const validItems = Object.keys(ITEM_MAP)

console.log(`export type ItemId =`)
console.log(' ', validItems.map(item => `'${item}'`).join(' |\n  '))
```

To execute:

```
$ ./node_modules/.bin/tsc *.ts # Compile files to first!
$ node gents.js /path/to/folder
```

The output becomes:

```
$ gents ./example
Generate example/type-item.gents as example/type-item.ts
    OK
```

### type-item.ts

```typescript
export type ItemId =
  'potion' |
  'elixir' |
  'wishdust'
```

As you control the contents of the `.gents` file, you have a lot of flexibility
over what the generated file looks like.

The benefit is that, after running this process, you can then simply just:

```typescript
import {ItemId} from './type-item'
```

## Build

```
yarn build
```
