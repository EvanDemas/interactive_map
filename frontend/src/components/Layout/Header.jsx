import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1 className={styles.title}>
            <span className={styles.titleMain}>Haioku Group</span>
            <span className={styles.titleSub}>Reinovating Abandonded Houses3</span>
          </h1>
          <div className={styles.underline}></div>
        </div>
        <p className={styles.tagline}>
          Creation out of the old and forgotten
        </p>
      </div>
    </header>
  );
};

export default Header;
