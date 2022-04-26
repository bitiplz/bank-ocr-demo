// prettier-ignore
export const CHARACTER_MAP = {
0:   ' _ '
    +'| |'
    +'|_|'
,
1:   '   '
    +'  |'
    +'  |'

,
2:   ' _ '
    +' _|'
    +'|_ '

,
3:   ' _ '
    +' _|'
    +' _|'

,
4:   '   '
    +'|_|'
    +'  |'

,
5:   ' _ '
    +'|_ '
    +' _|'

,
6:   ' _ '
    +'|_ '
    +'|_|'

,
7:   ' _ '
    +'  |'
    +'  |'

,
8:   ' _ '
    +'|_|'
    +'|_|'

,
9:   ' _ '
    +'|_|'
    +' _|'
}

export const MASK = {
  V: [[' '], ['|']],
  H: [[' '], ['_']],
  E: [[' '], ['*']],
}

// prettier-ignore
export const PATTERN = [
    ['E','H','E'],
    ['V','H','V'],
    ['V','H','V'],
  ]

export const ENTRY_CHARACTERS = 9
