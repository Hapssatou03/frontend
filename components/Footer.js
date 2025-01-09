import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Hapssatou Sy. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
