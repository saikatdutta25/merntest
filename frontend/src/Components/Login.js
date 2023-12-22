// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { API_LOGIN } from '../Api/Api';
import { setAuthToken } from '../utils/Auth';
// import { useNavigate } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleLogin = async () => {
        try {
            const response = await axios.post(API_LOGIN, { username, password });
            const { token } = response.data;
            setAuthToken(token);
            setError('');
            props.history.push('/todos');
            window.location.reload();// Redirect to '/todos' after successful login
        } catch (error) {
            setError(`Invalid credentials: ${error.message}`);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title text-center mb-4">Login</h1>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
                                {error && <p className="mt-3 text-danger">{error}</p>} {/* Display error message */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Login);
