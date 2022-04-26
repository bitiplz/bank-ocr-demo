import styles from './Table.module.css'

const DefaultCellRenderer = ({ item: label }) => {
  return { label }
}

export default function Table({ fields = [], data = [], fieldTemplate }) {
  return (
    <table className={styles.root}>
      <thead>
        <tr>
          {fields.map((label) => (
            <th key={label}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {fields.map((fieldName) => {
              const T = fieldTemplate?.[fieldName] || DefaultCellRenderer
              return (
                <td key={fieldName}>
                  <T item={row[fieldName]} />
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
