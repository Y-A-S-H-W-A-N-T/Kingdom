import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../styles/class.module.css';

function Students() {
    const [student, setStudents] = useState([]);

    const getStudents = async () => {
        const result = await axios.post('http://localhost:8000/get-students');
        setStudents(result.data);
    };

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <div className={styles.container}>
          <h1 className={styles.heading}>Students</h1>
            {student &&
                student.map((user, ind) => (
                    <div key={ind} className={styles.studentRow}>
                        <p className={styles.studentDetail}>{user.rollNo}</p>
                        <p className={styles.studentDetail}>{user.name}</p>
                        <p className={styles.studentDetail}>{user.classSection}</p>
                        <p className={styles.studentDetail}>{user.dob}</p>
                        {user.reportCard ? (
                            <p className={styles.studentDetail}>
                                <a
                                    href={`http://localhost:8000/download/${user.reportCard}`}
                                    download
                                    className={styles.studentLink}
                                >
                                    Get Report Card
                                </a>
                            </p>
                        ) : (
                            <p className={styles.studentDetail}>
                                <Link to='/uploadResults' className={styles.studentLink}>
                                    Upload result to get report cards
                                </Link>
                            </p>
                        )}
                    </div>
                ))}
        </div>
    );
}

export default Students;
