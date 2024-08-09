import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearAllUserErrors, login } from '../store/slices/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Login() {

    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, isAuthenticated, error } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const formdata = new FormData();

        formdata.append("role", role);
        formdata.append("email", email);
        formdata.append("password", password);

        dispatch(login(formdata));
    }

    useEffect(() => {
        if (error) {
            toast(error);
            dispatch(clearAllUserErrors());
        }

        if (isAuthenticated) {
            navigate("/");
        }
    }, [dispatch, error, loading, isAuthenticated])


    return (
        <>
            <section>
                <div>
                    <div>
                        <h3>Login to your Account!</h3>
                    </div>
                    <form onSubmit={handleLogin}>
                        <label>Login As</label>
                        <div>
                            <select value={role} onChange={e => setRole(e.target.value)}>
                                <option>Select Role</option>
                                <option value="Employer">Login as an Employer</option>
                                <option value="Job Seeker"> Login as Job Seeker</option>
                            </select>
                        </div>
                        <label>Email</label>
                        <div>
                            <input type='email' placeholder='Your email '
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <label>Password</label>
                        <div>
                            <input type='password' placeholder='Your password '
                                value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button type='submit' disabled={loading}>Login</button>
                        <Link to="/register">Register</Link>
                    </form>
                </div>
                <ToastContainer position='top-right'></ToastContainer>
            </section>
        </>
    )
}
