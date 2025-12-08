import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.credits}>
            <span className={styles.handwritten}>Crafted with care</span>
            <br />
            © {currentYear} Haioku Group
          </p>
          <div className={styles.stamp}>
            Heritage<br/>Preserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
