/*
import * as DEFAULTS from './defaults'

export const dumpRandomEntries = (n = 20) =>
  Array(n)
    .fill(0)
    .map(() =>
      Array(DEFAULTS.ENTRY_CHARACTERS)
        .fill(0)
        .map(() => {
          const value = Math.floor(Math.random(9) * 10).toString(10)
          const mapped = Object.entries(DEFAULTS.CHARACTER_MAP)
            .find(([k]) => k === value)?.[1]
            .split('')
          return Array(DEFAULTS.CHAR_RESOLUTION.y)
            .fill(0)
            .map((_, i) =>
              mapped
                .slice(
                  i * DEFAULTS.CHAR_RESOLUTION.x,
                  (i + 1) * DEFAULTS.CHAR_RESOLUTION.x
                )
                .join('')
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
*/
