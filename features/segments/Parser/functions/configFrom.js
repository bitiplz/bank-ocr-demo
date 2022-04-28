import * as DEFAULTS from '../defaults'

const isMapValid = (map) =>
  typeof map === 'object' &&
  Object.keys(map).length &&
  Object.values(map).every(
    (char) => typeof char === 'string' && char.length === map[0].length
  )

export default function configFrom(params = {}) {
  const { characterMap, extendMap = false, charactersPerEntry } = params

  if (params._testError) {
    throw new Error('test error')
  }

  let computedCharacterMap = DEFAULTS.CHARACTER_MAP
  if (characterMap) {
    computedCharacterMap = extendMap
      ? { ...DEFAULTS.CHARACTER_MAP, ...characterMap }
      : characterMap
    if (!isMapValid(computedCharacterMap)) {
      computedCharacterMap = DEFAULTS.CHARACTER_MAP
      console.warn('invalid character map in config. fallback to default.')
    }
  }

  const computedCharactersPerEntry = isNaN(charactersPerEntry)
    ? DEFAULTS.ENTRY_CHARACTERS
    : charactersPerEntry

  const characterResolution = DEFAULTS.CHAR_RESOLUTION

  return {
    charMap: computedCharacterMap,
    characterResolution: characterResolution,
    characterBitsLength: characterResolution.x * characterResolution.y,
    charactersPerEntry: computedCharactersPerEntry,
    entryLineLength: computedCharactersPerEntry * characterResolution.x,
  }
}
