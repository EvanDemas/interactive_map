import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1 className={styles.title}>
            <span className={styles.titleMain}>Kobe</span>
            <span className={styles.titleSub}>Architectural Renovations</span>
          </h1>
          <div className={styles.underline}></div>
        </div>
        <p className={styles.tagline}>
          Preserving heritage, building futures
        </p>
      </div>
    </header>
  );
};

export default Header;
