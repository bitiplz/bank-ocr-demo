export default function replaceTrivials(
  recognizedChars = [],
  possibleCharsPerIndex = []
) {
  return recognizedChars.map((char, i) =>
    char === '?' && possibleCharsPerIndex[i].length === 1
      ? possibleCharsPerIndex[i][0]
      : char
  )
}
