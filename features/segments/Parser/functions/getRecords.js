import segmentsToNumber from './toNumber'

export default function getRecords(parser) {
  if (!parser) {
    return
  }

  const {
    config: {
      characterResolution: { x: CHAR_RES_X },
      entryLineLength: LINE_LENGTH,
      charMap: MAP,
    },
    result,
  } = parser

  const toNumber = segmentsToNumber(parser)
  const characterMap = MAP.map(toNumber)

  if (result) {
    result.forEach((item) => {
      const recognizedEntry = []

      for (
        let charIndex = 0;
        charIndex < LINE_LENGTH;
        charIndex += CHAR_RES_X
      ) {
        const sample = item.input.reduce(
          (acc, line) =>
            `${acc}${line.slice(charIndex, charIndex + CHAR_RES_X)}`,
          ''
        )

        const match = characterMap.findIndex((pattern) => {
          const n = toNumber(sample)
          return n !== -1 && n === pattern
        })

        recognizedEntry.push(match > -1 ? match : '?')
      }

      item.output = recognizedEntry
      item.outputValid = !item.output.includes('?')
    })
  }
}
