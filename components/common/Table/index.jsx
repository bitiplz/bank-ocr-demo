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
              ({
                field,
                template: Template = DefaultCellRenderer,
                align,
                id,
              }) => {
                const item = field ? row[field] : row
                return (
                  <td
                    key={id}
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
