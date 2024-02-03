import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { database } from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('adarshMis@gmail.com');
    const [password, setPassword] = useState('123456789');
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(database, email, password);
            const token = await userCredential.user.getIdToken();
            localStorage.setItem('token', token);
            setTimeout(() => {
                navigate('/AddTopper');
                
            }, 2000)

        } catch (error) {
            console.error(error);
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className='mainclassname'>
            <div className='login_mainDiv'>
                <div className='loginSubDiv'>
                    <form onSubmit={handleSubmit}>
                        <h2 className='mb-4 text-center'>Login</h2>
                        <div className='formDivLogin'>
                            <span className='spanClassName'>&nbsp;User Id</span>
                            <input
                                type='email'
                                className='inputLogin login'
                                name='email'
                                placeholder='User Id'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='formDivLogin'>
                            <span className='spanClassName'>&nbsp;Password</span>
                            <input
                                type='password'
                                className='inputLogin login'
                                name='password'
                                placeholder='Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <div className='error-message'>{error}</div>}
                        <div className='bothBtnDiv'>
                            <button className='Loginbtm mt-4 btn btn-primary' type='submit'>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
