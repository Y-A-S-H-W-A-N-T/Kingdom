const express = require('express');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const XLSX = require('xlsx');
const cors = require('cors');
const multer = require('multer')
const mongoose = require('mongoose')


const { Student } = require('./studentSchema')

const app = express();

// Middleware to handle file uploads
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use(cors());

// Store report cards
const ReportsDir = path.resolve(__dirname, 'Reports');
if (!fs.existsSync(ReportsDir)) {
    fs.mkdirSync(ReportsDir);
}

// Route to handle file upload and PDF generation
app.post('/generate-report', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const excelFilePath = path.resolve(__dirname, req.file.path)
        const workbook = XLSX.readFile(excelFilePath)
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(sheet)

        const templatePath = path.resolve(__dirname, 'Report_Template.pdf');
        const existingPdfBytes = fs.readFileSync(templatePath);

        const pdfFiles = [] // storing report cards of multiple students

        for (const student of data) {
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const form = pdfDoc.getForm()


            form.getTextField('Text1').setText(String(student.rollNo || ''));
            form.getTextField('Text2').setText(String(student.name || ''));
            form.getTextField('Text3').setText(String(student.parent || ''));
            form.getTextField('Text4').setText(String(student['date of birth'] || ''));
            form.getTextField('Text5').setText(String(student['class/section'] || ''));
            form.getTextField('Text6').setText(String(student.english || ''));
            form.getTextField('Text7').setText(String(student.hindi || ''));
            form.getTextField('Text8').setText(String(student.maths || ''));
            form.getTextField('Text9').setText(String(student.social || ''));
            form.getTextField('Text10').setText(String(student.science || ''));
            form.getTextField('Text16').setText(String(student.remarks || ''));
            form.getTextField('Text17').setText(String(student.result || ''));


            form.flatten();

            // Save the filled PDF
            const pdfBytes = await pdfDoc.save();
            const pdfFilePath = path.resolve(ReportsDir, `report_card_${student.rollNo}.pdf`);
            fs.writeFileSync(pdfFilePath, pdfBytes);

            // Add the filename to the list
            // add filename to student database using rollNo

            const std = await Student.findOne({rollNo: student.rollNo})
            if(std === null){
                //
            }
            else  
            {
                const marks = {
                    examName: String(student.examName || ''),
                    english: String(student.english || ''),
                    hindi: String(student.hindi || ''),
                    social: String(student.social || ''),
                    science: String(student.science || ''),
                    maths: String(student.maths || '')
                }
                std.result.push(marks);
                std.reportCard = `report_card_${student.rollNo}.pdf`
                await std.save()
                console.log("Saved Student : ",std)
            }

            pdfFiles.push(`report_card_${student.rollNo}.pdf`) // store this pdf name in student database
        }

        res.json({ pdfFiles });

        // Clean up the uploaded Excel file
        fs.unlinkSync(req.file.path);

    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).send('Error generating report');
    }
});

app.get('/download/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.resolve(ReportsDir, filename);
    res.download(filePath, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('Error downloading file');
        }
    });
})

require('dotenv').config()

mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
    console.log("Connected")
})


app.post('/get-students', async(req,res) => {
    const students = await Student.find({})
    res.send(students)
})




// DEV APIs

app.post('/dummy',async(req,res)=>{
    const student = {
        rollNo: "3",
        name: "Soumya",
        classSection: "X B",
        parent: "Pratap",
        reportCard: " ",
        dob: "1-12-2003",
        result: []
    }
    const newStudent = new Student(student)
    res.send(await newStudent.save()) 
})

app.listen(8000, () => {
    console.log('Server started on http://localhost:8000');
});