import recognizeRecord from '../index'
import segments from 'features/segments'
import { CHARACTER_MAP } from 'features/segments/Parser/defaults'

describe('recognizer', () => {
  const inputFrom = (word, autoCorrectRule = 'perInput') => [
    word.split(''),
    word.split('').map((char) => CHARACTER_MAP[char]),
    CHARACTER_MAP,
    { autoCorrectRule },
  ]

  test('Valid input stays unchanged, status OK', async () => {
    const args = inputFrom('939288737')

    const { value, status } = recognizeRecord(...args)

    expect(value.join('')).toBe('939288737')
    expect(status).toBe('OK')
  })

  test('Unrecognizable input stays unchanged, status ERR', async () => {
    const args = inputFrom('?39288737')
    args[1][0] = '_________'

    const { value, status } = recognizeRecord(...args)

    expect(value.join('')).toBe('?39288737')
    expect(status).toBe('ERR')
  })

  test('PerChar. Recognizable invalid input changes, status AMB', async () => {
    const args = inputFrom('13928873?', 'perChar')
    args[1].splice(-1, 1, ' _   |   ')

    const { value, status } = recognizeRecord(...args)

    expect(value.join('')).toBe('139288737')
    expect(status).toBe('AMB')
  })

  test('PerChar. Multiple not trivials, status ERR', async () => {
    const args = inputFrom('?????????')
    args[1].map(() => '     |   ')

    const { value, status } = recognizeRecord(...args)

    expect(value.join('')).toBe('?????????')
    expect(status).toBe('ERR')
  })

  test('Recognizable invalid input changes, status ILL', async () => {
    const args = inputFrom('93928873?')
    args[1].splice(-1, 1, '     |   ')

    const { value, status } = recognizeRecord(...args)

    expect(value.join('')).toBe('939288731')
    expect(status).toBe('ILL')
  })

  test('PerInput. Multiple trivial ?s, all changes', async () => {
    const args = inputFrom('???288737')
    args[1].splice(0, 3, ...Array(3).fill(' _   |   '))

    const { value } = recognizeRecord(...args)

    expect(value.join('')).toBe('777288737')
  })

  test('Rule none, stays unchanged. status ERR', async () => {
    const args = inputFrom('?39288737', 'none')
    args[1][0] = '         '

    const { value, status } = recognizeRecord(...args)

    expect(value.join('')).toBe('?39288737')
    expect(status).toBe('ERR')
  })

  test('Multiple ?s, no changes status ERR', async () => {
    const args = inputFrom('???288737')
    args[1].splice(-1, 1, ' _ |_  _|')

    const { value, status } = recognizeRecord(...args)

    expect(value.join('')).toBe('???288737')
    expect(status).toBe('ERR')
  })

  test('From segments e2e', async () => {
    // prettier-ignore
    const input =   Array(9).fill(
                      ' _  _  _  _  _  _  _  _  _ \n' +
                      ' _| _| _| _| _| _| _| _| _|\n' +
                      '|_ |_ |_ |_ |_ |_ |_ |_ |_ \n'
                    ).join("\n")

    const result = segments(input)

    const { data, messages } = result
    const {
      postProcessData: { value, status },
    } = data[0]

    expect(data.length).toBe(9)
    expect(messages.length).toBe(0)

    expect(value.join('')).toBe('222222222')
    expect(status).toBe('ILL')
  })

  test('From segments e2e, multiple', async () => {
    // prettier-ignore
    const input =  
        '    _  _     _  _  _  _  _ \n' +
        '  | _| _||_||_ |_   ||_||_|\n' +
        '  ||_  _|  | _||_|  ||_| _|\n\n' +
        '    _  _     _  _  _  _  _ \n' +
        '  | _| _||_||_ |_   ||_||_|\n' +
        '                           \n\n' +
        ' _  _  _  _  _  _  _  _  _ \n' +
        ' _| _C _| _| _| _| _| _| _|\n' +
        '|_ |_ |_ |_ |_ Q_ |_ xxx|_ \n\n'+
        ' _  _  _  _  _  _     _  _ \n'+
        '|_\\| ||_ |_||_ |  |_||_\\  |\n'+
        '|_/|_||_ |_||_ |_   ||_/  |\n\n'+
        ' _  _  _  _  _  _  _  _  _ \n'+
        '|_||_\\|  | \\|_ |_ | ||_| _|\n'+
        '| ||_/|_ |_/|_ |  |_||_| _|\n'

    const result = segments(input)

    const { data, messages } = result
    const results = data.map(({ postProcessData: { value, status } }) => ({
      value,
      status,
    }))

    expect(results.length).toBe(5)
    expect(messages.length).toBe(0)

    expect(results[0].value.join('')).toBe('123456789')
    expect(results[1].value.join('')).toBe('1??4FF7??')
    expect(results[2].value.join('')).toBe('2?222?2?2')
    expect(results[3].value.join('')).toBe('B0E8EC4B7')
    expect(results[4].value.join('')).toBe('ABCDEF083')
  })
})
