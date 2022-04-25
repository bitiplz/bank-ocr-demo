import charToBit from './charToBit'

export default function toNumber(parser) {
  return (segmentString = '') => {
    const bitValues = segmentString.split('').map(charToBit(parser))
    const isValid = bitValues.every((bit) => bit[1])
    const value = bitValues.reduce((acc, [bit]) => (acc << 1) | bit, 0)

    return isValid ? value : -1
  }
}
