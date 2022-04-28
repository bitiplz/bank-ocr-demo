import { POST_RECORD_FAILED } from '../messages'

export default function postRecord(parser, processor) {
  if (parser?.result === null && typeof processor === 'function') {
    const { messages } = parser

    parser.recordPostProcessor = (record) => {
      try {
        return processor(record)
      } catch (error) {
        messages.push(POST_RECORD_FAILED(error))
        return null
      }
    }
  }
  return parser
}
