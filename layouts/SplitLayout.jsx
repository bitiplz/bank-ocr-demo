import styles from 'styles/Layout.module.css'

export default function CenteredLayout({ sidePanel, title, children }) {
  return (
    <div className={styles.root}>
      <div className={styles.wrap}>
        <aside className={styles.side}>{sidePanel}</aside>
        {children && <main className={styles.main}>{children}</main>}
      </div>
    </div>
  )
}
