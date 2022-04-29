import getVariants from '../getVariants'

export default function generateSuggestionsWithOneChangePerChar(
  recognizedChars = [],
  possibleCharsPerIndex = []
) {
  const result = []
  getVariants(result, possibleCharsPerIndex, recognizedChars)
  return result
}
