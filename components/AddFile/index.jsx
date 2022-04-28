import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Paper, Button, FileInput } from 'components/common'
import styles from './AddFile.module.css'

export default function AddFile() {
  const [files, setFiles] = useState([])
  const [processing, setProcessing] = useState(false)
  const {
    query: { id: resultId },
    push: navigate,
  } = useRouter()

  useEffect(() => {
    setProcessing(false)
    setFiles([])
  }, [resultId])

  const submit = () => {
    if (files.length) {
      setProcessing(true)
      const formData = new FormData()

      formData.append('file', files[0])

      const request = new XMLHttpRequest()
      request.onreadystatechange = () => {
        if (request.readyState == 4) {
          if (request.status == 200) {
            const { id } = JSON.parse(request.response)
            navigate(`/result/${id}`)
          } else {
            setProcessing(false)
            setFiles([])
            alert('Error')
          }
        }
      }
      request.open('POST', '/api/ocr/file')
      request.send(formData)
    }
  }

  return (
    <Paper>
      {processing && <i>processing...</i>}
      {!processing && (
        <>
          <FileInput
            multiple={false}
            value={files}
            onChange={setFiles}
            disabled={processing}
          />
          {files.length > 0 && (
            <div className={styles.actions}>
              <span className={styles.col}>
                <span
                  className={styles.filenameLabel}
                >{` ${files[0].name}`}</span>
                <span
                  role="button"
                  className={styles.rm}
                  onClick={() => setFiles([])}
                >
                  remove
                </span>
              </span>

              <Button onClick={submit} disabled={!files.length || processing}>
                Process file
              </Button>
            </div>
          )}
        </>
      )}
    </Paper>
  )
}
