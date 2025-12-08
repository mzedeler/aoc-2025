#!/usr/bin/env node 

const input = require("fs")
  .readFileSync(0)
  .toString()
  .split(/\n/)
  .filter(r => r)
  .map(r => r.replace(/(^\s+|\s+$)/g, '').split(/\s+/))
  .map(r => r.map(value => parseInt(value, 10) || value))

let total = 0
for (let x = 0; x < input[0].length; x++) {
  let op
  let operands = []
  for (let y = input.length - 1; y >= 0; y--) {
    const cell = input[y][x]
    if (typeof cell === 'number') {
      operands.push(cell)
    } else {
      op = cell === '+' ? operands => operands.reduce((a, b) => a + b, 0) : operands => operands.reduce((a, b) => a * b, 1)
    }
  }

  total += op(operands) 
}

console.log(total)
