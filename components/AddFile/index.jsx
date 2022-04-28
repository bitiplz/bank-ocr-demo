import { useState } from 'react'
import FileInput from 'components/common/FileInput'
import { useRouter } from 'next/router'

export default function ParseFile() {
  const [files, setFiles] = useState([])
  const { push: navigate } = useRouter()

  const onFilesChange = (files) => {
    setFiles(files)
  }

  const submit = () => {
    if (files.length) {
      const formData = new FormData()

      formData.append('file', files[0])

      const request = new XMLHttpRequest()
      request.onreadystatechange = () => {
        if (request.readyState == 4) {
          if (request.status == 200) {
            const { id } = JSON.parse(request.response)
            navigate(`/result/${id}`)
          } else alert('Error')
        }
      }
      request.open('POST', '/api/ocr/file')
      request.send(formData)
    }
  }

  return (
    <>
      <FileInput multiple={false} value={files} onChange={onFilesChange} />
      <button onClick={submit} disabled={!files.length}>
        Submit
      </button>
    </>
  )
}
