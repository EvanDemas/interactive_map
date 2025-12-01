import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}>
        <div className={styles.polaroid}>
          <div className={styles.photo}></div>
        </div>
        <p className={styles.text}>Loading treasures...</p>
      </div>
    </div>
  );
};

export default Loading;
