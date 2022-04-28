import Link from 'next/link'
import styles from './HistoryList.module.css'

export default function HistoryItemTemplate({ item: { id, createdAt, name } }) {
  return (
    <Link href={`/result/${id}`} passHref>
      <div role="button" className={styles.listItem}>
        <strong>{name}</strong>
        <br />
        <small>{createdAt}</small>
        <br />
        <small>{id}</small>
      </div>
    </Link>
  )
}
