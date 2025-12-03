#!/usr/bin/env node 

const rotate = (p, r) => ((p + r) % 100 + 100) % 100
const getClicks = (p, r) => {
  const [_p, _r] = r < 0 ? [rotate(100, -p), -r] : [p, r]
  return Math.abs(Math.floor((_p + _r)/100))
}

console.log(
  require("fs")
    .readFileSync(0)
    .toString()
    .replaceAll("L", "-")
    .replaceAll("R", "")
    .split(/\s+/)
    .filter(r => r)
    .map(r => parseInt(r, 10))
    .reduce(
      (acc, r) => {
        const p = acc.at(-1)[0]
        const clicks = getClicks(p, r)
        const result = [...acc, [rotate(p, r), clicks] ]
        console.log({ last: acc.at(-1), r, clicks, result })
        return result
      }, [[50, 0]]
    )
)
