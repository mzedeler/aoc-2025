#!/usr/bin/env node 

const re = /^(\d+)\1$/

console.log(
  require("fs")
    .readFileSync(0)
    .toString()
    .split(/,/)
    .filter(r => r)
    .map(range => range.split(/-/).map(Number))
    .flatMap(([start, end]) => {
      const result = []
      for (let i = start; i <= end; i++) {
        result.push(i)
      }
      return result
    })
    .filter(id => re.exec(id))
    .reduce((acc, id) => acc + id, 0)
)
