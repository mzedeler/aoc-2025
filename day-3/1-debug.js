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
      let result = 0
      for (let left = 0; left < bank.length - 1; left++) {
        for (let right = left + 1; right < bank.length; right++) {
          const pair = bank[left] * 10 + bank[right]
          if (result < pair) {
            result = pair
          }
        }
      }
      return result
    })
    // .reduce((acc, pair) => acc + pair, 0)
)
