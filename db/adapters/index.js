import { get, add } from './jsondb'
import init from './jsondb/imp/init'
import withHandler from './handler'

const instance = init()

const adapter = {
  get: withHandler(instance, get),
  add: withHandler(instance, add),
}

export default adapter
