import styles from 'styles/Layout.module.css'

export default function CenteredLayout({ sidePanel, children }) {
  return (
    <div className={styles.root}>
      <div className={styles.wrap}>
        <aside className={styles.side}>{sidePanel}</aside>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}
