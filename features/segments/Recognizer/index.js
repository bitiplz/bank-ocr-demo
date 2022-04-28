import { parser, evaluate, results, postRecord } from 'features/segments/Parser'
import processor from './functions/processor'

export default function process(input, config) {
  const p = parser(input, config)

  postRecord(p, processor)

  const result = results(evaluate(p, input))

  return result
}
