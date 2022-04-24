import styles from './FileInput.module.css'

export default function FileInput({
  value,
  onChange,
  multiple = false,
  inputProps = {},
}) {
  const computedValue = value || multiple ? [] : null
  const handleChange = ({ target: { files } }) => {
    if (onChange) {
      onChange(files)
    }
  }

  return (
    <input
      className={styles.root}
      value={computedValue}
      onChange={handleChange}
      type="file"
      id="avatar"
      {...inputProps}
      multiple={multiple}
    />
  )
}
