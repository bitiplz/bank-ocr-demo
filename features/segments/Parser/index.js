import { ERROR } from './messages'
import parser from './functions/parser'
import results from './functions/results'
import evaluate from './functions/evaluate'

export { parser, evaluate, results }

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
