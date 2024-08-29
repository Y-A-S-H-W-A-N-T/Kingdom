const mongoose = require('mongoose')

const { Schema } = mongoose

const marks = new Schema({
    examName: String,
    english: String,
    hindi: String,
    social: String,
    science: String,
    maths: String
})

const studentSchema = new Schema({
    rollNo: String,
    name: String,
    classSection: String,
    parent: String,
    reportCard: String,
    dob: String,
    result: [marks]
})

const Student = mongoose.models['student'] || mongoose.model('student', studentSchema)

module.exports = { Student }