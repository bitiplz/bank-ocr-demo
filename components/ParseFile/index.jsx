import { useState } from 'react'
import FileInput from 'components/common/FileInput'

export default function ParseFile() {
  const [files, setFiles] = useState([])

  console.log('ParseFile files', files)

  return <FileInput multiple value={files} onChange={setFiles} />
}
