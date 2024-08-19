import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearAllApplicationErrors, postApplication, resetApplicationSlice } from '../store/slices/applicationSlice';
import { toast, ToastContainer } from 'react-toastify';
import { fetchSingleJob } from '../store/slices/jobSlice';
import Spinner from '../components/Spinner';

export default function PostApplication() {
    const { singleJob } = useSelector(store => store.jobs);
    const { isAuthenticated, user } = useSelector(store => store.user);
    const { loading, error, message } = useSelector(store => store.applications)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log("user:", user)

    const { jobId } = useParams();


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [resume, setResume] = useState("");

    const handlePostApplication = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("coverLetter", coverLetter);

        if (resume) {
            formData.append("resume", resume);
        }
        dispatch(postApplication(formData, jobId));
    }

    useEffect(() => {

        setName(user.name || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
        setAddress(user.address || "");
        setCoverLetter(user.coverLetter || "");
        setResume(user.resume && user.resume.url || "");

        if (error) {
            toast.error(error);
            dispatch(clearAllApplicationErrors());
        }

        if (message) {
            toast.success(message);
            dispatch(resetApplicationSlice());
        }

        if ((user && user.role === "Employer") || !isAuthenticated) {
            navigate("/");
        }

        dispatch(fetchSingleJob(jobId));
    }, [dispatch, error, message, jobId, user])

    let qualifications = [];
    let responsibilities = [];
    let offers = [];

    if (singleJob.qualifications) {
        qualifications = singleJob.qualifications.split(".");
    }


    if (singleJob.qualifications) {
        responsibilities = singleJob.responsibilities.split(".");
    }


    if (singleJob.offers) {
        offers = singleJob.offers.split(".");
    }

    const resumeHandler = (e) => {
        const file = e.target.files[0];
        setResume(file);
    }

    return (
        <section>
            <form>
                <h3>Application form</h3>
                <div>
                    <label>Job Title</label>
                    <input type='text' disabled placeholder={singleJob.title}></input>
                </div>
                <div>
                    <label>Name</label>
                    <input type='text' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email</label>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input type='text' value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div>
                    <label>Address</label>
                    <input type='text' value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div>
                    <label>CoverLetter</label>
                    <textarea value={coverLetter} rows="10" onChange={e => setCoverLetter(e.target.value)} />
                </div>
                <div>
                    <label>Resume</label>
                    <input type='file' onChange={resumeHandler} />
                </div>

                <div>
                    <button onClick={handlePostApplication}>Apply</button>
                </div>
            </form>
            <div>
                <header>
                    <h3>{singleJob.title}</h3>
                    {
                        singleJob.personalWebsite && (
                            <Link to={singleJob.personalWebsite.url} target='_blank'>{singleJob.personalWebsite.title}</Link>
                        )
                    }
                    <p>Location:{singleJob.location}</p>
                    <p>Salary:{singleJob.salary}/month</p>
                    <p>Job Type:{singleJob.jobType}</p>
                    <p>Company Intoduction:{singleJob.introduction}</p>
                    {singleJob.qualifications && (<div><h4>Qualifications:</h4>
                        <ul>
                            {
                                qualifications.map(element => {
                                    return <li key={element} >{element}</li>
                                })
                            }
                        </ul>
                    </div>)
                    }

                    <hr />
                    {singleJob.responsibilities && (<div><h4>Responsibilities:</h4>
                        <ul>
                            {
                                responsibilities.map(element => {
                                    return <li key={element} >{element}</li>
                                })
                            }
                        </ul>
                    </div>)
                    }
                    <hr />
                    {singleJob.offers && (<div><h4>Offers:</h4>
                        <ul>
                            {
                                offers.map(element => {
                                    return <li key={element} >{element}</li>
                                })
                            }
                        </ul>
                    </div>)
                    }
                    <hr />

                    <div>
                        <h3>Job Niche</h3>
                        <p>{singleJob.jobNiche}</p>

                    </div>

                </header>
                <ToastContainer />
            </div >
        </section >
    )
}
