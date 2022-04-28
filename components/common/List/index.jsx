import styles from './List.module.css'
import cx from 'classnames'

const DefaultItemRenderer = ({ item }) => {
  return typeof item === 'string' ? item : String(item?.label)
}

export default function List({
  items = [],
  template: T = DefaultItemRenderer,
}) {
  return (
    <>
      {items.length > 0 && (
        <ul className={styles.list}>
          {items.map((item, i) => (
            <li
              key={i}
              className={cx(styles.item, {
                [styles.highlighted]: item.active,
              })}
            >
              <T item={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
