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
    recordPostProcessor,
  } = parser

  const characters = Object.entries(MAP).map(([key, value]) => ({
    key,
    value,
  }))

  if (result) {
    result.forEach((item) => {
      const recognizedEntry = []
      const inputCharacters = []

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

        inputCharacters.push(sample)

        const match = characters.find(({ value }) => {
          return sample === value
        })

        recognizedEntry.push(match?.key || '?')
      }

      item.output = recognizedEntry
      item.outputValid = !item.output.includes('?')

      if (recordPostProcessor) {
        item.postProcessData = recordPostProcessor({ ...item, inputCharacters })
      }
    })
  }
}
