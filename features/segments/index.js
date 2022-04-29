import { parseWithPostRecord } from 'features/segments/Parser'
import { createProcessor } from 'features/segments/Recognizer'

import config from './config'

const corrector = createProcessor(config.processor)
const parse = parseWithPostRecord(corrector)(config.parser)

export default function segments(input) {
  return parse(input)
}
