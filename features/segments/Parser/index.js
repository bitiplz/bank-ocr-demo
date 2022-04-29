import { ERROR } from './messages'

import parser from './functions/parser'
import evaluate from './functions/evaluate'
import results from './functions/results'
import postRecord from './functions/postRecord'

export const parseWithPostRecord =
  (createProcessor) => (parserConfig) => (input) => {
    try {
      const p = parser(parserConfig)
      if (createProcessor) {
        postRecord(p, createProcessor)
      }
      return results(evaluate(p, input))
    } catch (error) {
      return {
        data: null,
        messages: [ERROR(error)],
      }
    }
  }

export default parseWithPostRecord()
