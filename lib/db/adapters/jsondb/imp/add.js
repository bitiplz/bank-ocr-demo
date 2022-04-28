export default async function add(db, path, data) {
  try {
    return await db.push(path, data, true)
  } catch (error) {
    throw error
  }
}
