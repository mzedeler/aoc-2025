#!/usr/bin/env node 

const { ingredients, ranges } =
  require("fs")
    .readFileSync(0)
    .toString()
    .split(/\n/)
    .filter(r => r)
    .reduce(
      ({ ingredients, ranges }, row) => {
        const data = row.match(/(\d+)-(\d+)/)?.slice(1).map(Number) || Number(row)
        if (data instanceof Array) {
          return {
            ingredients,
            ranges: [...ranges, data],
          }
        }
        return {
          ingredients: [...ingredients, data],
          ranges,
        }
      },
    { ingredients: [], ranges: []}
  )

let count = 0
for (let ingredient of ingredients) {
  for (let [min, max] of ranges) {
    if (ingredient >= min && ingredient <= max) {
      count++
      break
    }
  }
}

console.log(count)
