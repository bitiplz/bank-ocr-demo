import { POST_RECORD_FAILED } from '../messages'

export default function postRecord(parser, initProcessor) {
  if (parser?.result === null && typeof initProcessor === 'function') {
    const { config, messages } = parser

    const processor = initProcessor(config)

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
