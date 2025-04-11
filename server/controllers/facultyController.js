const Faculty = require('../models/Faculty');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    const { facultyId, facultyEmail, password } = req.body;
    try {
        const existing = await Faculty.findOne({ facultyId });
        if (existing) return res.status(400).json({ message: 'Faculty already registered' });

        const newFaculty = new Faculty({ facultyId, facultyEmail, password });
        await newFaculty.save();
        res.status(201).json({ message: 'Signup successful' });
    } catch (err) {
        res.status(500).json({ message: 'Error during signup' });
    }
};

exports.login = async (req, res) => {
    const { facultyId, password } = req.body;
    try {
        const faculty = await Faculty.findOne({ facultyId });
        if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

        const isMatch = await bcrypt.compare(password, faculty.password);
        if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

        res.status(200).json({ message: 'Login successful', facultyId: faculty.facultyId });
    } catch (err) {
        res.status(500).json({ message: 'Login failed' });
    }
};
