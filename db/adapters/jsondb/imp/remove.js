export default async function remove(db, path) {
  db.load()
  await db.delete(path)
}
