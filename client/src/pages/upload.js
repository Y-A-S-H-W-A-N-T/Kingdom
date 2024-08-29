import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/upload.module.css';
import Template from '../component/template.png'

function App() {
    const [pdfFiles, setPdfFiles] = useState([]);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || selectedFile.type === 'application/vnd.ms-excel')) {
            setFile(selectedFile);
        } else {
            alert('Please upload a valid Excel file (.xlsx or .xls)');
            setFile(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://kingdom-16ov.onrender.com/generate-report', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPdfFiles(response.data.pdfFiles);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Upload Results</h1>
            <p>Excel Template</p>
            <div style={{marginBottom: '50px'}}>
                <img alt='excel template' src={Template} height={200} width={800}/>
            </div>
            <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className={styles.inputFile}
            />
            <button onClick={handleUpload} className={styles.uploadButton}>
                Upload and Generate Report PDFs
            </button>
            <i>*Check class after uploading the results*</i>
            <div className={styles.pdfList}>
                <h3>Generated Reports:</h3>
                <ul>
                    {pdfFiles?.map((file) => (
                        <li key={file} className={styles.pdfItem}>
                            <a
                                href={`https://kingdom-16ov.onrender.com/download/${file}`}
                                download
                                className={styles.pdfLink}
                            >
                                {file}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
