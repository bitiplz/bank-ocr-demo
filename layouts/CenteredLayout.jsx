import styles from 'styles/Layout.module.css'

export default function CenteredLayout({ children }) {
  return (
    <div className={styles.root}>
      <div className={styles.centered}>{children}</div>
    </div>
  )
}
