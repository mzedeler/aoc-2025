#!/usr/bin/env node 

const input = require("fs")
  .readFileSync(0)
  .toString()
  .split(/\n/)
  .filter(r => r)
  .reverse()

input.push(input.shift())

// Too low?!?: 10182371959283
//             10182371959283
// Using perl: 10188206723429

let op = '+'
let numbers = []
let total = 0
let parsingNumber = false
for (let x = 0; x < input[0].length; x++) {
  for (let y = input.length - 1; y >= 0; y--) {
    const char = input[y][x]
    if (char === '+' || char === '*') {
      if (op === '+') {
        total += numbers.reduce((acc, n) => acc + n, 0)
      } else {
        total += numbers.reduce((acc, n) => acc * n, 1)
      }
      op = char
      numbers = []
      parsingNumber = false
    } else if (char === ' ') {
      parsingNumber = false
    } else {
      if (!parsingNumber) {
        numbers.push(0)
        parsingNumber = true
      }
      numbers[numbers.length - 1] *= 10
      numbers[numbers.length - 1] += parseInt(char, 10)
    }
  }
}

console.log(total)