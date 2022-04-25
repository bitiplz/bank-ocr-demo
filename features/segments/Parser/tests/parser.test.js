import parseRecords from '../index'
import * as MESSAGE from '../messages'

describe('parser', () => {
  test('not string input error', async () => {
    const { data, messages } = parseRecords()

    const nullResult = data === null
    const singleMessageNoInput =
      Array.isArray(messages) &&
      messages.length === 1 &&
      messages[0] === MESSAGE.INPUT_INVALID

    expect(nullResult && singleMessageNoInput).toBeTruthy()
  })

  test('empty string input error', async () => {
    const { data, messages } = parseRecords('')

    const nullResult = data === null
    const singleMessageNoInput =
      Array.isArray(messages) &&
      messages.length === 1 &&
      messages[0] === MESSAGE.INPUT_INSUFFICIENT

    expect(nullResult && singleMessageNoInput).toBeTruthy()
  })

  test('short input error', async () => {
    // prettier-ignore
    const input =   ' _  _  _  _  _  _  _  _  _ \n'

    const { data, messages } = parseRecords(input)

    const nullResult = data === null
    const singleMessageNoInput =
      Array.isArray(messages) &&
      messages.length === 1 &&
      messages[0] === MESSAGE.INPUT_INSUFFICIENT

    expect(nullResult && singleMessageNoInput).toBeTruthy()
  })

  test('wrong pattern input error', async () => {
    // prettier-ignore
    const input =
      ' _  _  _  _  _  _  _  _  _ \n' +
      '  |  |  |  |  |  |  |  |  |\n' +
      ' _| _| _| _| _| _| _| _| _|\n' +
      '|  |  |  |  |  |  |  |  |  \n' +
      '|_ |_ |_ |_ |_ |_ |_ |_ |_ \n'

    const { messages } = parseRecords(input)

    const warnings =
      Array.isArray(messages) &&
      messages.length > 0 &&
      messages.find(
        ({ type }) => type === MESSAGE.INPUT_MISMATCHES_PATTERN.type
      )

    expect(warnings).toBeTruthy()
  })

  test('malformed input warning', async () => {
    // prettier-ignore
    const input =   ' _  _  _  _  _  _  _  _  _ \n' +
                    ' _| _| _| _| _| _| _| _| _|\n' +
                    '|_ |_ |_ |_ |_ |_ |_ |_ |_ \n\n' +
                    ' _  _  _  _  _  _  _ \n' +
                    ' _| _X _C _| _| _| _|\n' +
                    '|_ |_ |_ |_ |_ |_ |_ \n'

    const { messages } = parseRecords(input)

    const hasWarning = Array.isArray(messages) && messages.length > 0

    const warningTypeMatches =
      messages[0].type == MESSAGE.ENTRY_MALFORMED().type

    expect(hasWarning && warningTypeMatches).toBeTruthy()
  })

  test('single entry no config', async () => {
    // prettier-ignore
    const input =   ' _  _  _  _  _  _  _  _  _ \n' +
                    ' _| _| _| _| _| _| _| _| _|\n' +
                    '|_ |_ |_ |_ |_ |_ |_ |_ |_ \n'

    const { data, messages } = parseRecords(input)

    const resultStringMatches =
      data.length === 1 && data[0].output.join('') === '222222222'

    const messagesEmpty = Array.isArray(messages) && messages.length === 0

    expect(messagesEmpty && resultStringMatches).toBeTruthy()
  })

  test('multiple entry no config', async () => {
    // prettier-ignore
    const input =   ' _  _  _  _  _  _  _  _  _ \n' +
                    ' _| _| _| _| _| _| _| _| _|\n' +
                    '|_ |_ |_ |_ |_ |_ |_ |_ |_ \n\n' +
                    ' _  _  _  _  _  _  _  _  _ \n' +
                    ' _| _| _| _| _| _| _| _| _|\n' +
                    '|_ |_ |_ |_ |_ |_ |_ |_ |_ \n'

    const { data, messages } = parseRecords(input)

    const resultStringMatches =
      data.length === 2 &&
      data[0].output.join('') === '222222222' &&
      data[1].output.join('') === '222222222'

    const messagesEmpty = Array.isArray(messages) && messages.length === 0

    expect(messagesEmpty && resultStringMatches).toBeTruthy()
  })

  test('with config', async () => {
    // prettier-ignore
    const config = {
      characterMap: [
        'aaa'+
        '   '+
        'bbb'
      ],
      mask: {
        a: [[' '], ['a']],
        b: [[' '], ['b']],
        D: [['X'], ['*']],
      },
      pattern: [
        ['a', 'a', 'a'],
        ['E', 'F', 'G'],
        ['b', 'b', 'b'],
      ],
      charactersPerEntry: 1,
    }
    // prettier-ignore
    const input =   'aaa\n' +
                    ' _|\n' +
                    'bbb\n'

    const { data, messages } = parseRecords(input, config)

    const resultStringMatches =
      data.length === 1 && data[0].output.join('') === '?'

    const messagesEmpty = Array.isArray(messages) && messages.length === 0

    expect(messagesEmpty && resultStringMatches).toBeTruthy()
  })

  test('other error', async () => {
    const { data, messages } = parseRecords('', { _testError: true })

    const nullData = data === null
    const hasWarning = Array.isArray(messages) && messages.length > 0
    const warningTypeMatches = messages[0].type == MESSAGE.ERROR().type

    expect(nullData && hasWarning && warningTypeMatches).toBeTruthy()
  })
})
