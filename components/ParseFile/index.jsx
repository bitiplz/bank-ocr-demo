import { useState } from 'react'
import FileInput from 'components/common/FileInput'

export default function ParseFile() {
  const [files, setFiles] = useState([])

  return <FileInput multiple value={files} onChange={setFiles} />
}
