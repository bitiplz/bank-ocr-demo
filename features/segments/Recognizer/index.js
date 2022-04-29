import create from './functions/create'
export { create as createProcessor }
export { default as checksum } from './functions/checksum'

const EMPTY = {
  value: [],
  status: null,
}

export default function recognizeRecord(charArr, inputArray, charMap, config) {
  try {
    const item = {
      output: charArr,
      inputCharacters: inputArray,
      inputValid: true,
    }
    const recognizer = create(config)({ charMap })

    return recognizer(item)
  } catch (error) {
    return EMPTY
  }
}
