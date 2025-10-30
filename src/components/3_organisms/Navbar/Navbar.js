import Link from 'next/link';
import ConnectWallet from '../../2_molecules/ConnectWallet/ConnectWallet';
import { NAV_LINKS, PROJECT_NAME } from '../../../consts/consts';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <h1>{PROJECT_NAME}</h1>
        </Link>
        
        <div className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.walletSection}>
          <ConnectWallet />
        </div>
      </div>
    </nav>
  );
}
