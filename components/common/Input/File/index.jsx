import styles from './FileInput.module.css'
import cx from 'classnames'

export default function FileInput({ value, onChange, ...rest }) {
  const hasFile = Boolean(value.length)

  return (
    <div className={styles.root}>
      <div
        className={cx(styles.dropArea, {
          [styles.faded]: hasFile,
        })}
      >
        <label
          className={cx(styles.dropAreaLabel, {
            [styles.small]: hasFile,
          })}
        >
          {`Click here to ${hasFile ? 'change selected' : 'select a'} file`}
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
    </div>
  )
}
