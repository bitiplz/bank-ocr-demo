import { useState } from 'react'
import { useRouter } from 'next/router'
import { Paper, Button, FileInput } from 'components/common'
import styles from './AddFile.module.css'

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
    <Paper>
      <FileInput multiple={false} value={files} onChange={onFilesChange} />
      {files.length > 0 && (
        <div className={styles.actions}>
          <span>
            <small className={styles.filenameLabel}>FILE:</small>
            <span>{` ${files[0].name}`}</span>
          </span>

          <Button onClick={submit} disabled={!files.length}>
            Process file
          </Button>
        </div>
      )}
    </Paper>
  )
}
