import React from 'react';
import styles from '../styles/about.module.css';

function About() {
  return (
    <div className={styles.container}>
        <div>
            <h1 className={styles.heading}>About this Website</h1>
            <p className={styles.description}>
                Upload student results in the given excel format to get their report cards (PDF format). For testing purposes, the database only contains three students. Whenever a user uploads the excel sheet, the database gets updated with the data present in the excel sheet.
            </p>
            <p className={styles.note}>Note: The excel sheet must match the given excel format.</p>
        </div>
    </div>
  );
}

export default About;
