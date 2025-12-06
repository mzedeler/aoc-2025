#!/usr/bin/env node 

const state = require("fs")
  .readFileSync(0)
  .toString()
  .split(/\n/)
  .filter(r => r)
  .map(row => row.split(''))

const peek = (x, y) => (state[y] || [])[x] === '@' ? 1 : 0

const offsets = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0],           [1, 0],
  [-1, 1],  [0, 1],  [1, 1],
]

const getRemovable = () => {
  const removable = []
  for (let y = 0; y < state.length; y++) {
    for (let x = 0; x < state[y].length; x++) {
      if (state[y][x] !== '@') {
        continue
      }
      let neighbors = 0
      for (let [dx, dy] of offsets) {
        neighbors += peek(x + dx, y + dy)
      }
      if (neighbors > 3 ? 0 : 1) {
        removable.push([x, y])
      }
    }
  }
  return removable
}

let count = 0
const remove = (removable) => {
  for (let [x, y] of removable) {
    state[y][x] = '.'
    count++
  }
}

let removable = []
do {
  removable = getRemovable()
  remove(removable)
} while (removable.length > 0)

console.log(count)
