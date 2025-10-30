import styles from './MintButton.module.css';

export default function MintButton({ 
  onClick, 
  disabled, 
  loading, 
  children 
}) {
  return (
    <button
      className={styles.mintButton}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? 'Minting...' : children}
    </button>
  );
}
