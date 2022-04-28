import { init, get, add } from './jsondb'
import withHandler from './handler'

const instance = init()

const adapter = {
  get: withHandler(instance, get),
  add: withHandler(instance, add),
}

export default adapter
