import getPossibleChars from './getPossibleChars'
import replaceTrivials from './replaceTrivials'
import perInput from './generateSuggestions/oneChangePerInput'
import perChar from './generateSuggestions/oneChangePerChar'
import getStatus from './getStatus'

export default function autoCorrect(
  recognizedChars = [],
  inputCharacters = [],
  neighbours = {},
  validator = () => true,
  rule = 'none'
) {
  if (rule === 'none' || !['perInput', 'perChar'].includes(rule)) {
    return [recognizedChars, getStatus(recognizedChars, 0)]
  }

  const possibleChars = getPossibleChars(inputCharacters, neighbours)

  const corrected = replaceTrivials(recognizedChars, possibleChars)

  const suggestions = rule === 'perInput' ? perInput : perChar
  const resultOptions = suggestions(corrected, possibleChars).filter(validator)

  const result = resultOptions.length === 1 ? resultOptions[0] : corrected
  const status = getStatus(corrected, resultOptions.length)

  return [result, status]
}
