import { CHARACTER_MAP, ENTRY_CHARACTERS, PATTERN } from '../defaults'

export const dumpRandomEntries = (n = 20) =>
  Array(n)
    .fill(0)
    .map(() =>
      Array(ENTRY_CHARACTERS)
        .fill(0)
        .map(() => {
          const value = Math.floor(Math.random(9) * 10).toString(10)
          const mapped = Object.entries(CHARACTER_MAP)
            .find(([k]) => k === value)?.[1]
            .split('')
          return PATTERN.map((l, i) =>
            mapped.slice(i * l.length, (i + 1) * l.length).join('')
          )
        })
    )
    .map((entry) =>
      entry
        .reduce(
          ([a, b, c], [ia, ib, ic]) => [`${a}${ia}`, `${b}${ib}`, `${c}${ic}`],
          ['', '', '']
        )
        .join('\n')
    )
    .join('\n\n')
