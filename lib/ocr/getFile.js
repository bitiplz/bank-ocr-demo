import adapter from 'db/adapters'

export default async function getFile(id) {
  return await adapter.get(`/files/${id}`)
}
