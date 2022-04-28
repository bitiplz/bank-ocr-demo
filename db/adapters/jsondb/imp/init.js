import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

export default function init() {
  const instance = new JsonDB(new Config('mydbv', true, true, '/'))
  instance.load()

  return instance
}
