import React, { useState, useEffect } from 'react'
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function Login() {
        const user = {
            email,
            password,
        }
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            const result = response.data;
            setLoading(false);
            localStorage.setItem('currentUser', JSON.stringify(result));
            window.location.href = '/home'
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)
        }
    }

    return (
        <div>
            {loading && <Loader />}
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5 mt-5'>
                    {error && <Error message="Incorrect email or password."/>}
                    <div className='bs'>
                        <h2>Login</h2>
                        <input type="text" className='form-control' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                        <input type="text" className='form-control' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                        <button className='btn btn-primary mt-3' onClick={Login}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen