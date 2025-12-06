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

const result = []
let count = 0
for (let y = 0; y < map.length; y++) {
  result.push([])
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] !== '@') {
      result[y].push(0)
      continue
    }
    let count = 0
    for (let [dx, dy] of offsets) {
      count += peek(x + dx, y + dy)
    }
    result[y].push(count > 3 ? 0 : 1)
  }
}

console.log(result.flat().reduce((a, v) => a + v, 0))
