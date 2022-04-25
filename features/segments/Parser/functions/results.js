export default function result(parser) {
  return { data: parser?.result || null, messages: parser?.messages || [] }
}
