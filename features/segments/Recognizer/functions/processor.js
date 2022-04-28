import checksumValid from './checksum'

export default function processor(record) {
  return {
    checksumValid: checksumValid(record),
  }
}
