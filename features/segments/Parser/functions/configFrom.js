import * as DEFAULTS from '../defaults'

const isPatternValid = (pattern) =>
  Array.isArray(pattern) &&
  pattern.length > 0 &&
  pattern.every(
    (line) => Array.isArray(line) && line.length === pattern[0].length
  )

const isMapValid = (map) =>
  Array.isArray(map) &&
  map.length > 0 &&
  map.every((char) => typeof char === 'string' && char.length === map[0].length)

export default function configFrom(params = {}) {
  const {
    characterMap,
    mask,
    extendMask = false,
    pattern,
    charactersPerEntry,
  } = params

  if (params._testError) {
    throw new Error('test error')
  }

  let computedCharacterMap = characterMap
  if (!isMapValid(computedCharacterMap)) {
    computedCharacterMap = DEFAULTS.CHARACTER_MAP
    console.warn('invalid character map in config. fallback to default.')
  }

  let computedPattern = pattern
  if (!isPatternValid(computedPattern)) {
    computedPattern = DEFAULTS.PATTERN
    console.warn('invalid pattern in config. fallback to default.')
  }

  let computedMask = DEFAULTS.MASK
  if (mask) {
    computedMask = extendMask ? { ...DEFAULTS.MASK, ...mask } : mask
  }

  const computedCharactersPerEntry = isNaN(charactersPerEntry)
    ? DEFAULTS.ENTRY_CHARACTERS
    : charactersPerEntry

  const characterResolution = {
    x: computedPattern[0].length,
    y: computedPattern.length,
  }

  return {
    charMap: computedCharacterMap,
    mask: computedMask,
    pattern: computedPattern.flat(),
    characterResolution,
    characterBitsLength: characterResolution.x * characterResolution.y,
    charactersPerEntry: computedCharactersPerEntry,
    entryLineLength: computedCharactersPerEntry * characterResolution.x,
  }
}
