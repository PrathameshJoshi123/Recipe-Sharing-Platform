// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/auth/login', {
                username,
                password
            });
            console.log(response)
            const { token } = response.data;
            console.log(token)
            // Store the token in localStorage
            localStorage.setItem('jwtToken', token);
            alert("Logged in successfully")
            Navigate('/')
            console.log('Logged in successfully');
            
            
            
           
        } catch (error) {
            console.error('Login error', error);
           
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                
            </form>
        </div>
    );
};

export default Login;
