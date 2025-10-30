import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from './ConnectWallet.module.css';

export default function ConnectWallet() {
  return (
    <div className={styles.container}>
      <ConnectButton />
    </div>
  );
}
