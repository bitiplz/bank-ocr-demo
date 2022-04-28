const byCreatedAt = ({ createdAt: a }, { createdAt: b }) => (a < b ? 1 : -1)

export const mapHistoryData = ({ data: files, error }) => {
  if (error) {
    return null
  }

  const responseData = Object.entries(files)
    .map(([id, { name, createdAt }]) => ({
      id,
      name,
      createdAt: new Date(createdAt).toLocaleString(),
    }))
    .sort(byCreatedAt)

  return responseData
}
