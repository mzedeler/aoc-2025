#!/usr/bin/env node 

const re = /^(\d+)\1$/

console.log(
  require("fs")
    .readFileSync(0)
    .toString()
    .split(/\n/)
    .filter(r => r)
    .map(bank => bank.split('').map(Number))
    .map(bank => {
      let left = 0
      let pos = left + 1
      while (pos < bank.length - 1) {
        if (bank[pos] > bank[left]) {
          left = pos
        }
        pos++
      }

      let right = left + 1
      pos = right + 1
      while (pos < bank.length) {
        if (bank[pos] > bank[right]) {
          right = pos
        }
        pos++
      }

      return bank[left] * 10 + bank[right]
    })
    .reduce((acc, pair) => acc + pair, 0)
)
