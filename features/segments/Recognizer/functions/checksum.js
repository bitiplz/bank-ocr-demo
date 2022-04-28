export default function checksumValid(characters = []) {
  const numbers = characters.map((c) => parseInt(c, 16))

  if (numbers.length !== 9 || numbers.find(isNaN)) {
    return false
  }

  return (
    numbers.reverse().reduce((acc, n, i) => acc + (i + 1) * n, 0) % 11 === 0
  )
}
