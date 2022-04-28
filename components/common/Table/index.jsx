import styles from './Table.module.css'
import cx from 'classnames'

const DefaultCellRenderer = ({ item: label }) => {
  return { label }
}

export default function Table({ fields = [], data = [] }) {
  return (
    <table className={styles.root}>
      <thead>
        <tr>
          {fields.map(({ label, align }) => (
            <th
              key={label}
              className={cx(styles.headCell, {
                [styles.cellLeft]: align !== 'right',
                [styles.cellRight]: align === 'right',
              })}
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className={styles.row}>
            {fields.map(
              ({ field, template: Template = DefaultCellRenderer, align }) => {
                const item =
                  typeof field === 'function' ? field(row) : row[field]
                return (
                  <td
                    key={field}
                    className={cx(styles.cell, {
                      [styles.cellLeft]: align !== 'right',
                      [styles.cellRight]: align === 'right',
                    })}
                  >
                    <Template item={item} />
                  </td>
                )
              }
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
