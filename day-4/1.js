#!/usr/bin/env node 

const map = require("fs")
  .readFileSync(0)
  .toString()
  .split(/\n/)
  .filter(r => r)
  .map(row => row.split(''))

const peek = (x, y) => (map[y] || [])[x] === '@' ? 1 : 0

const offsets = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0],           [1, 0],
  [-1, 1],  [0, 1],  [1, 1],
]

const getRemovable = (state) => {
  const removable = []
  for (let y = 0; y < state.length; y++) {
    removable.push([])
    for (let x = 0; x < state[y].length; x++) {
      if (state[y][x] !== '@') {
        removable[y].push(0)
        continue
      }
      let count = 0
      for (let [dx, dy] of offsets) {
        count += peek(x + dx, y + dy)
      }
      removable[y].push(count > 3 ? 0 : 1)
    }
  }
  return removable
}

console.log(getRemovable(map).flat().reduce((a, v) => a + v, 0))
