import recognizeRecord from '../index'
import { CHARACTER_MAP } from 'features/segments/Parser/defaults'

describe('recognizer', () => {
  test('valid number input stays unchanged with status ok', async () => {
    const input = '939288737'
    const charArr = input.split('')
    const inputArray = charArr.map((char) => CHARACTER_MAP[char])
    const config = { autoCorrectRule: 'perInput' }

    const { value, status } = recognizeRecord(
      charArr,
      inputArray,
      CHARACTER_MAP,
      config
    )

    const valueMatches = value.join('') === input
    const statusOk = status === 'OK'

    expect(valueMatches && statusOk).toBeTruthy()
  })

  test('unrecognizable number input stays unchanged with status err', async () => {
    const input = '93928873?'
    const charArr = input.split('')
    const inputArray = charArr.map((char) => CHARACTER_MAP[char])
    inputArray[inputArray.length - 1] = '_________'
    const config = { autoCorrectRule: 'perInput' }

    const { value, status } = recognizeRecord(
      charArr,
      inputArray,
      CHARACTER_MAP,
      config
    )

    const valueMatches = value.join('') === input
    const statusOk = status === 'ERR'

    expect(valueMatches && statusOk).toBeTruthy()
  })

  test('perchar, recognizable invalid changes with status amb', async () => {
    const input = '13928873?'
    const charArr = input.split('')
    const inputArray = charArr.map((char) => CHARACTER_MAP[char])
    inputArray[inputArray.length - 1] = ' _   |   '
    const config = { autoCorrectRule: 'perChar' }

    const { value, status } = recognizeRecord(
      charArr,
      inputArray,
      CHARACTER_MAP,
      config
    )

    const valueMatches = value.join('') === '139288737'
    const statusOk = status === 'AMB'

    expect(valueMatches && statusOk).toBeTruthy()
  })

  test('recognizable changes and turns to ok', async () => {
    const input = '93928873?'
    const charArr = input.split('')
    const inputArray = charArr.map((char) => CHARACTER_MAP[char])
    inputArray[inputArray.length - 1] = ' _   |   '
    const config = { autoCorrectRule: 'perInput' }

    const { value, status } = recognizeRecord(
      charArr,
      inputArray,
      CHARACTER_MAP,
      config
    )

    const valueMatches = value.join('') === '939288737'
    const statusOk = status === 'OK'

    expect(valueMatches && statusOk).toBeTruthy()
  })

  test('perInput rule with multiple trivial ?s, all changes', async () => {
    const input = '???288737'
    const charArr = input.split('')
    const inputArray = charArr.map((char) => CHARACTER_MAP[char])
    inputArray[0] = ' _   |   '
    inputArray[1] = ' _   |   '
    inputArray[2] = ' _   |   '
    const config = { autoCorrectRule: 'perInput' }

    const { value } = recognizeRecord(
      charArr,
      inputArray,
      CHARACTER_MAP,
      config
    )
    const valueMatches = value.join('') === '777288737'

    expect(valueMatches).toBeTruthy()
  })

  test('multiple ? no changes, stays err', async () => {
    const input = '???288737'
    const charArr = input.split('')
    const inputArray = charArr.map((char) => CHARACTER_MAP[char])
    const five = ' _ |_  _|'
    inputArray[0] = five
    inputArray[1] = five
    inputArray[2] = five
    const config = { autoCorrectRule: 'perInput' }

    const { value, status } = recognizeRecord(
      charArr,
      inputArray,
      CHARACTER_MAP,
      config
    )

    const valueMatches = value.join('') === input
    const statusOk = status === 'ERR'

    expect(valueMatches && statusOk).toBeTruthy()
  })
})
