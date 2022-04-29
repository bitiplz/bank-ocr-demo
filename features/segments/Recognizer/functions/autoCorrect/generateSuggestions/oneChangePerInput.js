export default function generateSuggestionsWithOneChangePerInput(
  recognizedChars = [],
  possibleCharsPerIndex = []
) {
  return possibleCharsPerIndex
    .reduce((acc, possibleChars, index) => {
      if (possibleChars.length) {
        acc.push(
          possibleChars.map((char) => {
            const variant = [...recognizedChars]
            variant[index] = char
            return variant
          })
        )
      }
      return acc
    }, [])
    .flat()
}
