#!/usr/bin/env node 

const rotate = (l, r) => ((l + r) % 100 + 100) % 100
const clicks = (l, r) => Math.abs(Math.floor(r/100)) + ((l + r) >= 100 || (l + r) <= 0) ? 1 : 0

console.log(
  require("fs")
    .readFileSync(0)
    .toString()
    .replaceAll("L", "-")
    .replaceAll("R", "")
    .split(/\s+/)
    .filter(r => r)
    .map(r => parseInt(r, 10))
    .reduce((acc, r) => [...acc, [rotate(acc.at(-1)[0], r), clicks(acc.at(-1)[0], r)] ], [[50, 0]])
)
