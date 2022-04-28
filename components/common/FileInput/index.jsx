export default function FileInput({ value, onChange, ...rest }) {
  return (
    <div>
      {Boolean(value.length) && (
        <div>Selected files: {value.map((f) => f.name).join(', ')}</div>
      )}
      <label>
        Click to select some files...
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
