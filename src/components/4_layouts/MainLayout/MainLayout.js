import Navbar from '../../3_organisms/Navbar/Navbar';
import Footer from '../../2_molecules/Footer/Footer';
import styles from './MainLayout.module.css';

export default function MainLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
