import checksumValid from './checksum'
import autoCorrect from './autoCorrect'

export default function processor(item, processorData) {
  const { output: parserRecognizedChars, inputCharacters, inputValid } = item
  const {
    neighbours,
    processorConfig: { autoCorrectRule },
  } = processorData

  if (!inputValid) {
    // parser input was invalid
    return {
      value: parserRecognizedChars,
      status: null, // results in '!' error
    }
  }

  if (checksumValid(parserRecognizedChars)) {
    // skip processor if valid already
    return {
      value: parserRecognizedChars,
      status: 'OK',
    }
  }

  const [value, status] = autoCorrect(
    parserRecognizedChars,
    inputCharacters,
    neighbours,
    checksumValid,
    autoCorrectRule
  )

  return {
    value,
    status,
  }
}
