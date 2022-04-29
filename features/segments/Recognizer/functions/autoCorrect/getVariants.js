export default function getVariants(...args) {
  if (args.length < 3) {
    return
  }
  const [result, source, input, index = 0] = args

  if (!input.includes('?')) {
    result.push(input)
  }
  if (index >= input.length || index >= source.length) {
    return
  }

  if (!source[index].length) {
    getVariants(result, source, input, index + 1)
    return
  }

  source[index].forEach((char) => {
    const inputVariant = [...input]
    inputVariant[index] = char
    getVariants(result, source, inputVariant, index + 1)
  })
}
