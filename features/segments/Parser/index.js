import { ERROR } from './messages'

import parser from './functions/parser'
import evaluate from './functions/evaluate'
import results from './functions/results'

export { parser, evaluate, results }
export { default as postRecord } from './functions/postRecord'

export default function parseRecords(input, config) {
  try {
    return results(evaluate(parser(config), input))
  } catch (error) {
    return {
      data: null,
      messages: [ERROR(error)],
    }
  }
}
