import styles from 'components/common/List/List.module.css'

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
            <li key={i} className={styles.item}>
              <T item={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
