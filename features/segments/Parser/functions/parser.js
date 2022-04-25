import configFrom from './configFrom'

export default function parser(config) {
  return { input: null, config: configFrom(config), result: null, messages: [] }
}
