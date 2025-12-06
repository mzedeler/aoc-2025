#!/usr/bin/env node 

const re = /^(\d+)\1$/

const LENGTH = 12
console.log(
  require("fs")
    .readFileSync(0)
    .toString()
    .split(/\n/)
    .filter(r => r)
    .map(bank => bank.split('').map(Number))
    .map(bank => {
      const digits = []
      let nextAvailable = 0
      do {
        let digit = 0
        for (let i = nextAvailable; i <= bank.length + digits.length - LENGTH; i++) {
          if (digit < bank[i]) {
            digit = bank[i]
            nextAvailable = i + 1
          }
        }
        digits.push(digit)
      } while (digits.length < LENGTH)

      return digits.reduce((acc, digit) => acc * 10 + digit, 0)
    })
    .reduce((acc, pair) => acc + pair, 0)
)
