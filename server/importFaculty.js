require('dotenv').config();
const mongoose = require('mongoose');
const xlsx = require('xlsx');
const bcrypt = require('bcryptjs');
const Faculty = require('./models/faculty');

const MONGODB_URI = process.env.MONGODB_URI;
console.log("MongoDB URI:", MONGODB_URI);

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Read Excel file
    const workbook = xlsx.readFile('./data/faculty.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const facultyData = xlsx.utils.sheet_to_json(sheet);

    // Convert and insert into DB
    const hashedPassword = await bcrypt.hash('default123', 10); // default password

    const formattedData = facultyData.map(faculty => ({
      facultyId: faculty.facultyId,
      facultyName: faculty.facultyName,
      facultyEmail: faculty.facultyEmail,
      password: hashedPassword,
      currentlyIssuedBooks: [],
      totalBooksIssued: 0,
      role: 'faculty',
    }));

    await Faculty.insertMany(formattedData);
    console.log('Faculty data imported successfully!');
    process.exit();
  })
  .catch(err => {
    console.error('Error importing faculty:', err);
    process.exit(1);
  });
