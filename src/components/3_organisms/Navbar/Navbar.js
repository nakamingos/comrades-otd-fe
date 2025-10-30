import Link from 'next/link';
import ConnectWallet from '../../2_molecules/ConnectWallet/ConnectWallet';
import { NAV_LINKS, PROJECT_NAME } from '../../../consts/consts';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <h1>NoMoreLabs</h1>
        </Link>
        
        <div className={styles.walletSection}>
          <ConnectWallet />
        </div>
      </div>
    </nav>
  );
}
