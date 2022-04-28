import adapter from 'db/adapters'
import { mapHistoryData } from './mapHistoryData'

export default async function getFilesList() {
  const res = await adapter.get('/files')

  return mapHistoryData(res)
}
