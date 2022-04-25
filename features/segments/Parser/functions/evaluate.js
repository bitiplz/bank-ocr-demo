import parseLines from './parseLines'
import getRecords from './getRecords'

export default function evaluate(parser, input) {
  if (parser) {
    parser.input = input
    parseLines(parser)
    getRecords(parser)
  }
  return parser
}
