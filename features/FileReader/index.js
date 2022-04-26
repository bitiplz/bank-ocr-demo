const read = (file) =>
  new Promise((resolve, reject) => {
    var fr = new FileReader()
    fr.onload = () => {
      resolve(fr.result)
    }
    fr.onerror = reject
    fr.readAsText(file)
  })

export default async function readFile(file) {
  return read(file)
}
