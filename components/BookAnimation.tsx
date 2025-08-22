import styles from './BookAnimation.module.css';

export default function BookAnimation() {
  return (
    <div className={styles.bookAnimation} aria-hidden="true">
      <div className={styles.book}>
        <div className={styles.page} />
        <div className={styles.page} />
        <div className={styles.page} />
      </div>
    </div>
  );
}

