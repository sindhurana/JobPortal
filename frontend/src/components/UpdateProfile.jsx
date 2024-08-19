import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { clearAllUpdateProfileErrors, updateProfile } from '../store/slices/updateProfile';
import { toast, ToastContainer } from 'react-toastify';
import { getUser } from '../store/slices/userSlice';
import { Link } from 'react-router-dom';

export default function UpdateProfile() {
    const { user } = useSelector(store => store.user);
    const { loading, error, isUpdated } = useSelector(store => store.updateProfile)


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phone, setPhone] = useState(user && user.phone);
    const [address, setAddress] = useState(user && user.address);
    const [coverLetter, setCoverLetter] = useState(user && user.coverLetter);
    const [firstNiche, setFirstNiche] = useState(user && user.niches?.firstNiche);
    const [secondNiche, setSecondNiche] = useState(user && user.niches?.secondNiche);
    const [thirdNiche, setThirdNiche] = useState(user && user.niches?.thirdNiche);
    const [resume, setResume] = useState(null);
    const [resumePreview, setResumePreview] = useState(user && user.resume?.url);

    const handleUpdateProfile = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        if (user && user.role === "Job Seeker") {
            formData.append("coverLetter", coverLetter);
            formData.append("firstNiche", firstNiche);
            formData.append("secondNiche", secondNiche);
            formData.append("thirdNiche", thirdNiche);
            // formData.append("resumePreview", resumePreview);
        }

        if (resume) {
            formData.append("resume", resume);
        }

        dispatch(updateProfile(formData));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllUpdateProfileErrors());
        }

        if (isUpdated) {
            toast.success("Profile Updated");
            dispatch(getUser());
            dispatch(clearAllUpdateProfileErrors());
        }
    }, [dispatch, loading, error, isUpdated, user])

    const resumeHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setResumePreview(reader.result);
            setResume(file);
        }
    }

    const jobNiches = ["Backend", "Frontend", " Full Stack Developer", "Web Developer"];



    return (
        <section>
            <div>
                <h3>Update Profile</h3>
                <div>
                    <label>Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>


                <div>
                    <label>Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>


                <label>Phone Number</label>
                <div>
                    <input type="number" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>

                <label>Address</label>
                <div>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                {
                    user && user.role === "Job Seeker" && (
                        <div>
                            <div>
                                <label>My Preffered Job Niches</label>
                            </div>
                            <div>
                                <select value={firstNiche} onChange={e => setFirstNiche(e.target.value)}>
                                    {
                                        jobNiches.map((element, index) => {
                                            return <option key={index}>{element}</option>
                                        })
                                    }
                                </select>
                                {/* <input type="text" disabled value={user && user.niches.firstNiche} onChange={e => e.target.value} />
                        </div>

                        <div>
                            <input type="text" disabled value={user && user.niches.secondNiche} onChange={e => e.target.value} />
                        </div>

                        <div>
                            <input type="text" disabled value={user && user.niches.thirdNiche} onChange={e => e.target.value} /> */}

                                <select value={secondNiche} onChange={e => setSecondNiche(e.target.value)}>
                                    {
                                        jobNiches.map((element, index) => {
                                            return <option key={index}>{element}</option>
                                        })
                                    }
                                </select>
                                <select value={thirdNiche} onChange={e => setThirdNiche(e.target.value)}>
                                    {
                                        jobNiches.map((element, index) => {
                                            return <option key={index}>{element}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label>CoverLetter</label>
                                <textarea value={coverLetter} onChange={e => setCoverLetter(e.target.value)}></textarea>

                            </div>

                            <div>
                                <label>Upload Resume</label>
                                <input type='file' onChange={resumeHandler} />
                                {
                                    user && user.resume && (
                                        <div>
                                            <p>Current Resume</p>
                                            <Link to={user.resume && user.resume.url} target='_blank'>View Resume</Link>
                                        </div>
                                    )
                                }
                            </div>
                        </div>


                    )
                }


                <label>Role</label>
                <div>
                    <input type="text" disabled value={user && user.role} onChange={e => e.target.value} />
                </div>

                <label>Member Since</label>
                <div>
                    <input type="text" disabled value={user && user.createdAt} onChange={e => e.target.value} />
                </div>

            </div>




            <div>
                <button disabled={loading} onClick={handleUpdateProfile}>Update Profile</button>
            </div>
            <ToastContainer theme='dark' />
        </section >

    )
}
