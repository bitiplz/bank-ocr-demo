import { useState } from 'react'
import FileInput from 'components/common/FileInput'

import { useOcrContext } from 'components/context/OcrProvider'

export default function ParseFile() {
  const { add } = useOcrContext()
  const [files, setFiles] = useState([])

  const onFilesChange = (files) => {
    setFiles(files)
  }

  const submit = () => {
    if (files.length) {
      add(files)
    }
  }

  return (
    <>
      <FileInput value={files} onChange={onFilesChange} />
      <button onClick={submit} disabled={!files.length}>
        Submit
      </button>
    </>
  )
}
