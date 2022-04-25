import styles from './Table.module.css'

const DefaultCellRenderer = ({ item: label }) => {
  return <td>{label}</td>
}

export default function Table({
  fields = [],
  data = [],
  cellTemplate: T = DefaultCellRenderer,
}) {
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
            {fields.map((fieldName) => (
              <T key={fieldName} item={row[fieldName]} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
