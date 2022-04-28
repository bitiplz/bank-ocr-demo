import styles from './Button.module.css'

export default function Button({ label, children, ...btnProps }) {
  return (
    <button className={styles.root} {...btnProps}>
      {label && <span className={style.label}>{label}</span>}
      {children}
    </button>
  )
}
