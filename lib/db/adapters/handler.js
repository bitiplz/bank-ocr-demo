const ERROR_RESULT = { data: {}, error: true }

export default function withHandler(db, fn) {
  return async (...args) => {
    try {
      const data = await fn(db, ...args)

      return { data, error: false }
    } catch (error) {
      return ERROR_RESULT
    }
  }
}
