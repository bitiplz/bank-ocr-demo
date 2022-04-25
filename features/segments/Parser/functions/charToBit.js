export default function charToBit(parser) {
  const {
    config: { mask: MASK, pattern: PATTERN },
  } = parser

  return (char, i) => {
    if (!MASK[PATTERN[i]]) {
      return [false, false]
    }

    const bitValue = MASK[PATTERN[i]].findIndex(
      (acceptedCharacters) =>
        acceptedCharacters.includes('*') || acceptedCharacters.includes(char)
    )

    const isValid = [0, 1].includes(bitValue)

    return isValid ? [Boolean(bitValue), true] : [false, false]
  }
}
