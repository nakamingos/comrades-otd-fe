import { SOCIAL_LINKS } from '../../../consts/consts';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h4>Links</h4>
          <div className={styles.links}>
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer">
              Discord
            </a>
            <a href={SOCIAL_LINKS.etherscan} target="_blank" rel="noopener noreferrer">
              Etherscan
            </a>
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Comrades of the Dead. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
