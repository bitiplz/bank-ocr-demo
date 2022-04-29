export default function getPossibleCharsPerIndex(
  inputCharacters = [],
  neighbours = {}
) {
  return inputCharacters.map((input) =>
    Object.entries(neighbours)
      .filter(([_, patterns]) => patterns.includes(input))
      .map(([value]) => value)
  )
}
