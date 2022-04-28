export default async function add(db, path, data) {
  db.load()
  await db.push(path, data, true)
}
