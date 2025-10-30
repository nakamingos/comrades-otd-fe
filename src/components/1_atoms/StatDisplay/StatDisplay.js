import styles from './StatDisplay.module.css';

export default function StatDisplay({ label, value, highlight }) {
  return (
    <div className={styles.statContainer}>
      <div className={styles.label}>{label}</div>
      <div className={`${styles.value} ${highlight ? styles.highlight : ''}`}>
        {value}
      </div>
    </div>
  );
}
