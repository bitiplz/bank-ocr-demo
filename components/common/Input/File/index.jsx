import { useState, useRef, useEffect } from 'react'
import styles from './FileInput.module.css'
import cx from 'classnames'

export default function FileInput({ value, onChange, ...rest }) {
  const [dndState, setDnDState] = useState('idle')
  const dropAreaRef = useRef()
  const hasFile = Boolean(value.length)

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDnDState('dragover')
  }

  const handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDnDState('idle')
  }

  const handleDropWindow = (e) => {
    e.stopPropagation()
    setDnDState('idle')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const { files } = e.dataTransfer

    if (files && files.length) {
      if (onChange) {
        onChange(files)
      }
    }
    setDnDState('idle')
  }

  useEffect(() => {
    if (dropAreaRef?.current) {
      const ele = dropAreaRef.current

      window.addEventListener('dragover', handleDragOver)
      window.addEventListener('dragleave', handleDragOut)
      window.addEventListener('drop', handleDropWindow)
      ele.addEventListener('drop', handleDrop)

      return () => {
        window.removeEventListener('dragover', handleDragOver)
        window.removeEventListener('dragleave', handleDragOut)
        window.removeEventListener('drop', handleDropWindow)
        ele.removeEventListener('drop', handleDrop)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropAreaRef])

  return (
    <div className={styles.root}>
      <label
        ref={dropAreaRef}
        className={cx(styles.dropArea, {
          [styles.small]: hasFile,
          [styles.dragOver]: dndState === 'dragover',
        })}
      >
        <span className={styles.nonInteractive2}>
          Drop a file here
          <br />
          <small>{`or click to ${
            hasFile ? 'change selected' : 'select'
          }`}</small>
        </span>
        <input
          {...rest}
          style={{ display: 'none' }}
          type="file"
          onChange={(e) => {
            onChange([...e.target.files])
          }}
        />
      </label>
    </div>
  )
}
