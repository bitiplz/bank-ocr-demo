import styles from './Chip.module.css'
import cx from 'classnames'

export default function Chip({ children, color = 'primary' }) {
  return (
    <span
      className={cx(styles.root, {
        [styles.warning]: color === 'warning',
        [styles.error]: color === 'error',
        [styles.success]: color === 'success',
        [styles.info]: color === 'info',
        [styles.pink]: color === 'pink',
      })}
    >
      {children}
    </span>
  )
}
