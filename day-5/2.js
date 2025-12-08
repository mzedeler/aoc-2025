#!/usr/bin/env node 

const ranges =
  require("fs")
    .readFileSync(0)
    .toString()
    .split(/\n/)
    .filter(r => r.indexOf('-') >= 0)
    .map(row => row.split('-')?.map(Number))
    .sort((a, b) => a[0] - b[0])

const merged = []
let current = 0
while (current < ranges.length) {
  let [min, max] = ranges[current]
  let target = current + 1
  let currentMax = max
  while (ranges[target] && ranges[target][0] <= currentMax) {
    currentMax = Math.max(currentMax, ranges[target][1])
    target++
  }
  merged.push([min, currentMax])
  current = target
}

console.log(merged.reduce((sum, [min, max]) => sum + (max - min + 1), 0))
