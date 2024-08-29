import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';

const HomePage = () => {
    return (
        <div className={styles.container}>
            <div>
                <Link to='/uploadResults' className={styles.link}>UPLOAD RESULTS</Link>
            </div>
            <div className={styles.linkContainer}>
                <Link to='/students' className={styles.link}>Class</Link>
            </div>
            <div className={styles.linkContainer}>
                <Link to='/about' className={styles.link}>About</Link>
            </div>
        </div>
    );
};

export default HomePage;
