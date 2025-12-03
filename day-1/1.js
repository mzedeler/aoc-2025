#!/usr/bin/env node 

console.log(
  require("fs")
    .readFileSync(0)
    .toString()
    .replaceAll("L", "-")
    .replaceAll("R", "")
    .split(/\s+/)
    .filter(r => r)
    .map(r => parseInt(r, 10))
    .reduce((acc, r) => [(acc[0] + r + 100) % 100, ...acc], [50])
    .filter(r => r === 0)
    .length
)
