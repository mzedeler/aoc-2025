#!/usr/bin/env node

let count = 0

const points = require("fs")
  .readFileSync(0)
  .toString()
  .split(/\n/)
  .filter(r => r)
  .map((row, id) => ({ id, coords: row.split(',').map(n => parseInt(n, 10)) }))

const ranges = points.reduce((ranges, point) => ranges.map(([min, max], dim) => [
  Math.min(min, point.coords[dim]),
  Math.max(max, point.coords[dim]),
]), points[0].coords.map(n => [n, n]))

const circuits = new Map(points.map(point => [point.id, new Set([point.id])]))

const distances = points
  .flatMap(point => 
    points.map(other => 
      point.id >= other.id
        ? []
        : [
            Math.sqrt(
              point.coords.reduce((sum, coord, dim) => 
                sum + (coord - other.coords[dim]) ** 2,
              0)
            ),
            [point.id, other.id]
          ]
    )
  )
  .filter(d => d[0] > 0)
  .sort((a, b) => a[0] - b[0])

for (i = 0; i < 1000; i++) {
  const pair = distances[i][1]
  const circuit = circuits.get(pair[0]).union(circuits.get(pair[1]))
  circuit.forEach(id => circuits.set(id, circuit))
}



console.log(
[...new Set([...circuits.values()])]
  .map(circuit => circuit.size)
  .toSorted((a, b) => a - b)
  .reverse()
  .slice(0, 3)
  .reduce((prod, size) => prod * size, 1)
)
