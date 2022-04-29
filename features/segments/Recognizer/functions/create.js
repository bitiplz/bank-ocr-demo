import processor from './processor'
import generateNeighbours from './autoCorrect/generateNeighbours'

const DEFAULT_CONFIG = { autoCorrectRule: 'none' } // "perInput", "perChar", "none"

export default function create(config = DEFAULT_CONFIG) {
  return (parserConfig = {}) => {
    const { charMap } = parserConfig
    const neighbours = generateNeighbours(charMap)

    const processorData = {
      neighbours,
      processorConfig: config,
    }

    return (item) => processor(item, processorData)
  }
}
