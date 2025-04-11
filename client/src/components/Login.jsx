import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ navigate }) => {
    const [facultyId, setFacultyId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/faculty/login', { facultyId, password });
            alert(res.data.message);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input placeholder="Faculty ID" value={facultyId} onChange={e => setFacultyId(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
