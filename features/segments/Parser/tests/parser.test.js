import createParser from '../index'
import * as MESSAGE from '../messages'
import { CHARACTER_MAP } from 'features/segments/Parser/defaults'

describe('parser', () => {
  const parse = createParser()

  test('Non-string gives error', async () => {
    const { data, messages } = parse()

    expect(data).toBe(null)
    expect(messages.length).toBe(1)
    expect(messages[0]).toBe(MESSAGE.INPUT_INVALID)
  })

  test('Empty string gives error', async () => {
    const { data, messages } = parse('')

    expect(data).toBe(null)
    expect(messages.length).toBe(1)
    expect(messages[0]).toBe(MESSAGE.INPUT_INSUFFICIENT)
  })

  test('Short input gives error', async () => {
    const input = ' _  _  _  _  _  _  _  _  _ \n'

    const { data, messages } = parse(input)

    expect(data).toBe(null)
    expect(messages.length).toBe(1)
    expect(messages[0]).toBe(MESSAGE.INPUT_INSUFFICIENT)
  })

  test('Wrong pattern gives error', async () => {
    // prettier-ignore
    const input =
      ' _  _  _  _  _  _  _  _  _ \n' +
      '  |  |  |  |  |  |  |  |  |\n' +
      ' _| _| _| _| _| _| _| _| _|\n' +
      '|  |  |  |  |  |  |  |  |  \n' +
      '|_ |_ |_ |_ |_ |_ |_ |_ |_ \n'

    const { messages } = parse(input)

    const hasMismatchWarning = messages.find(
      ({ type }) => type === MESSAGE.INPUT_MISMATCHES_PATTERN.type
    )

    expect(messages.length > 0).toBeTruthy()
    expect(hasMismatchWarning).toBeTruthy()
  })

  test('Malformed gives warning', async () => {
    // prettier-ignore
    const input =   ' _  _  _  _  _  _  _  _  _ \n' +
                    ' _| _| _| _| _| _| _| _| _|\n' +
                    '|_ |_ |_ |_ |_ |_ |_ |_ |_ \n\n' +
                    ' _  _  _  _  _  _  _ \n' +
                    ' _| _X _C _| _| _| _|\n' +
                    '|_ |_ |_ |_ |_ |_ |_ \n'

    const { messages } = parse(input)

    const hasMalformedWarning = messages.find(
      ({ type }) => type === MESSAGE.ENTRY_MALFORMED().type
    )

    expect(hasMalformedWarning).toBeTruthy()
  })

  test('Single entry', async () => {
    // prettier-ignore
    const input =   ' _  _  _  _  _  _  _  _  _ \n' +
                    ' _| _| _| _| _| _| _| _| _|\n' +
                    '|_ |_ |_ |_ |_ |_ |_ |_ |_ \n'

    const { data, messages } = parse(input)

    expect(data[0].output.join('')).toBe('222222222')
    expect(messages.length).toBe(0)
  })

  test('Multiple entries', async () => {
    // prettier-ignore
    const input =   ' _  _  _  _  _  _  _  _  _ \n' +
                    ' _| _| _| _| _| _| _| _| _|\n' +
                    '|_ |_ |_ |_ |_ |_ |_ |_ |_ \n\n' +
                    ' _  _  _  _  _  _  _  _  _ \n' +
                    ' _| _| _| _| _| _| _| _| _|\n' +
                    '|_ |_ |_ |_ |_ |_ |_ |_ |_ \n'

    const { data, messages } = parse(input)

    expect(data[0].output.join('')).toBe('222222222')
    expect(data[1].output.join('')).toBe('222222222')
    expect(messages.length).toBe(0)
  })

  test('Other error appears in messages', async () => {
    const { data, messages } = createParser({ _testError: true })('')

    const hasOtherError = messages.find(
      ({ type }) => type === MESSAGE.ERROR().type
    )

    expect(data).toBe(null)
    expect(hasOtherError).toBeTruthy()
  })

  Object.entries(CHARACTER_MAP).forEach(([value, pattern]) => {
    test(`With config. All characters in default config. ( ${value} )`, async () => {
      const parseSingle = createParser({ charactersPerEntry: 1 })

      // prettier-ignore
      const input = `${pattern.slice(0, 3)}\n${pattern.slice(3, 6)}\n${pattern.slice(6, 9)}\n`

      const { data, messages } = parseSingle(input)

      expect(data.length).toBe(1)
      expect(data[0].output.join('')).toBe(String(value))
      expect(messages.length).toBe(0)
    })
  })

  test('Extended map working', async () => {
    const parseSingleWithMapExtend = createParser({
      charactersPerEntry: 1,
      extendMap: true,
      // prettier-ignore
      characterMap: {
      X:
        'X X'+
        ' X '+
        'X X'
      },
    })

    // prettier-ignore
    const input =   ' _ \n' +
                    ' _|\n' +
                    '|_ \n\n' +
                    'X X\n' +
                    ' X \n' +
                    'X X\n'

    const { data, messages } = parseSingleWithMapExtend(input)

    expect(data.length).toBe(2)
    expect(data[0].output.join('')).toBe('2')
    expect(data[1].output.join('')).toBe('X')
    expect(messages.length).toBe(0)
  })
})
