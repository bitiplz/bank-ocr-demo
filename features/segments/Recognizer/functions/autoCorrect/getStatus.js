export default function status(result = '', optionsCount = 0) {
  return optionsCount > 1
    ? 'AMB'
    : optionsCount === 1
    ? 'OK'
    : result.length && !result.includes('?')
    ? 'ILL'
    : 'ERR'
}
