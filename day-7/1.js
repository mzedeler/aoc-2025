#!/usr/bin/env node

let count = 0

require("fs")
  .readFileSync(0)
  .toString()
  .split(/\n/)
  .filter(r => r)
  .map(row => row.split('').map(c => c === '.' ? undefined : c))
  .reduce((state, row) => {
    if (!state) return row
    for (let i = 0; i < state.length; i++) {
      if (row[i] === '^' && (state[i] === 'S' || state[i] === '|')) {
        count++
        state[i] = undefined
        state[i + 1] = '|'
        state[i - 1] = '|'
      }
    }
    console.log(state.map(c => c || '.').join(''))
    return state
  })

console.log(count)
