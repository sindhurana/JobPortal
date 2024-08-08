import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import userSlice, { clearAllUserErrors, register } from '../store/slices/userSlice';
import { toast } from 'react-toastify';
import { FaRegAddressCard } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";

export default function Register() {
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [firstNiche, setFirstNiche] = useState("");
    const [secondNiche, setSecondNiche] = useState("");
    const [thirdNiche, setThirdNiche] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [resume, setResume] = useState("");

    const jobNiches = ["Backend", "Frontend", " Full Stack Developer", "Web Developer"];

    const resumehandler = (e) => {
        const file = e.target.files[0];
        setResume(file);
    }

    const { loading, isAuthenticated, error, message } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("role", role);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("password", password);
        if (role === "Job Seeker") {
            formData.append("firstNiche", firstNiche);
            formData.append("secondNiche", secondNiche);
            formData.append("thirdNiche", thirdNiche);
            formData.append("coverLetter", coverLetter);
            formData.append("resume", resume)
        }

        dispatch(register(formData));
    }

    useEffect(() => {
        if (error) {
            toast.error("error");
            dispatch(clearAllUserErrors());
        }

        if (isAuthenticated) (
            navigate("/")
        )

    }, [dispatch, error, loading, isAuthenticated, message]);

    return (
        <>
            <section >
                <div>
                    <div>
                        <h3> Create New Account!</h3>
                    </div>
                    <form onSubmit={handleRegister} >
                        <div>
                            <label>Register As</label>
                            <div>
                                <select value={role} onChange={e => setRole(e.target.value)}>
                                    <option>Select Role</option>
                                    <option value="Employer">Register as an Employer</option>
                                    <option value="Job Seeker"> Register as Job Seeker</option>
                                </select>

                            </div>

                            <div>
                                <label>Name</label>
                                <div>
                                    <input type='text' placeholder='Your Name'
                                        value={name} onChange={e => setName(e.target.value)} />
                                </div>

                                <label>Email</label>
                                <div>
                                    <input type='email' placeholder='Your email '
                                        value={email} onChange={e => setEmail(e.target.value)} />
                                </div>


                                <label>Phone</label>
                                <div>
                                    <input type='number' placeholder='Your phone number '
                                        value={phone} onChange={e => setPhone(e.target.value)} />
                                </div>

                                <label>Address</label>
                                <div>
                                    <input type='text' placeholder='Your address '
                                        value={address} onChange={e => setAddress(e.target.value)} />
                                </div>

                                <label>Password</label>
                                <div>
                                    <input type='password' placeholder='Your password '
                                        value={password} onChange={e => setPassword(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        {
                            role === "Job Seeker" && (<>
                                <label>Your First Niche</label>
                                <div>
                                    <select value={firstNiche}> onChange={e => e.setFirstNiche(e.target.value)}
                                        <option>Your Niche</option>
                                        {jobNiches.map((niche, index) => {
                                            return (
                                                <option key={index}>{niche}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <label>Your Second Niche</label>
                                <div>
                                    <select value={secondNiche}> onChange={e => e.setSecondNiche(e.target.value)}
                                        <option>Your Niche</option>
                                        {jobNiches.map((niche, index) => {
                                            return (
                                                <option key={index}>{niche}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <label>Your Third Niche</label>
                                <div>
                                    <select value={thirdNiche}> onChange={e => e.setThirdNiche(e.target.value)}
                                        <option>Your Niche</option>
                                        {jobNiches.map((niche, index) => {
                                            return (
                                                <option key={index}>{niche}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div>
                                    <label>Cover Letter</label>
                                    <div>
                                        <textarea value={coverLetter} onChange={e => setCoverLetter(e.target.value)} rows={10}></textarea>
                                    </div>
                                </div>

                                <div>
                                    <label>Resume</label>
                                    <div>
                                        <input type="file" onChange={resumehandler} />
                                    </div>
                                </div>
                            </>)
                        }
                        <button type='submit' disabled={loading}>Register</button>
                        <Link to="/login" >Login Now</Link>
                    </form>
                </div>
            </section >
        </>
    )
}
