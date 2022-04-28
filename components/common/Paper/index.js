import styles from './Paper.module.css'

export default function Paper({ children, title, sub }) {
  const showHeader = Boolean(title || sub)

  return (
    <div className={styles.root}>
      {showHeader && (
        <div className={styles.head}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {sub && <small>{sub}</small>}
        </div>
      )}
      {children}
    </div>
  )
}
