/*
import * as DEFAULTS from './defaults'

const CHARMAP = {
  ...DEFAULTS.CHARACTER_MAP,
  A: ' _ ' + '|_|' + '| |',
  B: ' _ ' + '|_\\' + '|_/',
  C: ' _ ' + '|  ' + '|_ ',
  D: ' _ ' + '| \\' + '|_/',
  E: ' _ ' + '|_ ' + '|_ ',
  F: ' _ ' + '|_ ' + '|  ',
}

export const dumpRandomEntries = (n = 20) => {
  return Array(n)
    .fill(0)
    .map(() =>
      Array(DEFAULTS.ENTRY_CHARACTERS)
        .fill(0)
        .map(() => {
          const value = Math.floor(Math.random(15) * 15)
            .toString(16)
            .toUpperCase()
          const mapped = Object.entries(CHARMAP)
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
}

*/
