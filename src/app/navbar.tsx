import Link from 'next/link';
import styles from './Navbar.module.css';

interface NavbarProps {
  showHomeLink: boolean;
}

const Navbar = ({ showHomeLink }: NavbarProps) => {
  return (
    <nav className={styles.navbar}>
      {showHomeLink && (
        <Link href="/" className={styles.homeLink}>
          <span className={styles.homeIcon}>🏠</span> Go Home
        </Link>
      )}
    </nav>
  );
};

export default Navbar;

