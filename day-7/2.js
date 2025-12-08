#!/usr/bin/env node

let count = 0

const cache = new Map()
const getTimelines = (x, y) => {
  if (y >= map.length) {
    return 1
  }
  const cacheKey = '' + x + ':' + y
  let result = cache.get(cacheKey)
  if (!result) {
    if (map[y][x] === '^') {
      result = getTimelines(x + 1, y + 1) + getTimelines(x - 1, y + 1)
    } else {
      result = getTimelines(x, y + 1)
    }
  }
  cache.set(cacheKey, result)
  return result
}

const map = require("fs")
  .readFileSync(0)
  .toString()
  .split(/\n/)
  .filter(r => r)

console.log(getTimelines(map[0].indexOf('S'), 0))
