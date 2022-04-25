import * as MESSAGE from '../messages'

export default function parseLines(parser) {
  if (parser) {
    const {
      config: {
        characterResolution: { x: CHAR_RES_X, y: CHAR_RES_Y },
        entryLineLength: LINE_LENGTH,
      },
      input,
      messages,
    } = parser

    if (typeof input !== 'string') {
      messages.push(MESSAGE.INPUT_INVALID)
      return
    }

    const lines = input.split('\n')

    if (lines.length / (CHAR_RES_Y + 1) < 1) {
      messages.push(MESSAGE.INPUT_INSUFFICIENT)
      return
    }

    if (lines.length % (CHAR_RES_Y + 1) !== 0) {
      messages.push(MESSAGE.INPUT_MISMATCHES_PATTERN)
      return
    }

    parser.result = lines.reduce(
      (records, line, lineIndex) => {
        const lastEntry = records[records.length - 1]

        if (!line.length) {
          // end of entry
          lastEntry.inputValid =
            lastEntry.input.length === CHAR_RES_X &&
            lastEntry.input.every((entryRow) => entryRow.length === LINE_LENGTH)

          if (!lastEntry.inputValid) {
            messages.push(MESSAGE.ENTRY_MALFORMED({ line: lineIndex }))
          }

          if (lineIndex < lines.length - 1) {
            records.push({ input: [] })
          }
        } else {
          // next line of entry
          lastEntry.input.push(line.slice(0, LINE_LENGTH))
        }

        return records
      },
      [{ input: [] }]
    )
  }
}
