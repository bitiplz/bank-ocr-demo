import { unique } from '../../util'

export default function generateNeighbours(charMap = {}) {
  const allPossibleCharacters = Object.values(charMap)
    .join('')
    .split('')
    .filter(unique)

  return Object.fromEntries(
    Object.entries(charMap).map(([k, v]) => {
      const series = v.split('')
      const n = series.map((char, i, src) => {
        return allPossibleCharacters
          .filter((possibleChar) => possibleChar !== char)
          .map((c) => {
            const res = [...src]
            res[i] = c
            return res.join('')
          })
      })

      return [k, n.flat()]
    })
  )
}
