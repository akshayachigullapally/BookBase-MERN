import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ navigate }) => {
    const [facultyId, setFacultyId] = useState('');
    const [facultyEmail, setFacultyEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/faculty/signup', { facultyId, facultyEmail, password });
            alert(res.data.message);
            navigate('/login');
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <input placeholder="Faculty ID" value={facultyId} onChange={e => setFacultyId(e.target.value)} />
            <input placeholder="Email" value={facultyEmail} onChange={e => setFacultyEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;