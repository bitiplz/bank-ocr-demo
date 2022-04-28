export default async function get(db, path) {
  db.load()
  try {
    return await db.getData(path)
  } catch (error) {
    console.log(error)
    return null
  }
}
