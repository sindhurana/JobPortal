import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearAllJobsError, postJob, reesetJobSlice } from '../store/slices/jobSlice';
import { toast, ToastContainer } from 'react-toastify';
import { HiMiniInformationCircle } from "react-icons/hi2"

export default function JobPost() {

    const [title, setTitle] = useState("");
    const [jobType, setJobType] = useState("");
    const [location, setLocation] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [responsibilities, setResponsibilities] = useState("");
    const [qualifications, setQualifications] = useState("");
    const [offers, setOffers] = useState("");
    const [salary, setSalary] = useState("");
    const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
    const [jobNiche, setJobNiche] = useState("");
    const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState("");
    const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");

    const jobNiches = ["Backend", "Frontend", " Full Stack Developer", "Web Developer"];
    const locations = [
        "Delhi", "Noida", "Gurugram", "Bangalore"
    ];

    const { isAuthenticated, user } = useSelector(store => store.user);
    const { loading, error, message } = useSelector(store => store.jobs);
    const dispatch = useDispatch();

    const handlePostJob = (e) => {

        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("jobType", jobType);
        formdata.append("location", location);
        formdata.append("companyName", companyName);
        formdata.append("introduction", introduction);
        formdata.append("responsibilities", responsibilities);
        formdata.append("qualifications", qualifications);
        offers && formdata.append("offers", offers);
        formdata.append("jobNiche", jobNiche);
        formdata.append("salary", salary);
        hiringMultipleCandidates && formdata.append("hiringMultipleCandidates", hiringMultipleCandidates);
        personalWebsiteTitle && formdata.append("personalWebsiteTitle", personalWebsiteTitle);
        personalWebsiteUrl && formdata.append("personalWebsiteUrl", personalWebsiteUrl);

        dispatch(postJob(formdata));

    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllJobsError());
        }

        if (message) {
            toast.success(message);
            dispatch(reesetJobSlice());
        }


    }, [dispatch, error, loading, message])


    return (
        <div>
            <h3>POST A JOB</h3>
            <div>
                <label>Title</label>
                <input type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder='Job Title' />
            </div>

            <div>
                <label>Job Type</label>
                <select value={jobType} onChange={e => setJobType(e.target.value)} >
                    <option>Select Job Type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                </select>
            </div>

            <div>
                <label>Location</label>
                <select value={location} onChange={e => setLocation(e.target.value)} >
                    <option>Select Location</option>
                    {locations.map((element, index) => {
                        return (<option key={index} value={element}>{element}</option>
                        )
                    })
                    }
                </select>
            </div>

            <div>
                <label>CompanyName</label>
                <input type='text' value={companyName} onChange={e => setCompanyName(e.target.value)}
                    placeholder='company-name' />
            </div>

            <div>
                <label>Job Introduction</label>
                <textarea value={introduction} onChange={e => setIntroduction(e.target.value)}
                    placeholder="introduction" />
            </div>

            <div>
                <label>Responsibilties</label>
                <textarea value={responsibilities} onChange={e => setResponsibilities(e.target.value)}
                    placeholder="responsibilties" />
            </div>

            <div>
                <label>Qualifications</label>
                <textarea value={qualifications} onChange={e => setQualifications(e.target.value)}
                    placeholder="qualifications" />
            </div>

            <div>
                <label>Offers</label>
                <HiMiniInformationCircle />optional
                <textarea value={offers} onChange={e => setOffers(e.target.value)}
                    placeholder="offers" />
            </div>

            <div>
                <label>JobNiche</label>
                <select value={jobNiche} onChange={e => setJobNiche(e.target.value)} >
                    <option>Select JobNiche</option>
                    {jobNiches.map((element, index) => {
                        return (<option key={index} value={element}>{element}</option>
                        )
                    })
                    }
                </select>
            </div>

            <div>
                <label>Salary</label>
                <input type='text' value={salary} onChange={e => setSalary(e.target.value)} placeholder='50000-100000' />
            </div>

            <div>
                <label>HiringMultipleCandidates
                </label><HiMiniInformationCircle />optional
                <select value={hiringMultipleCandidates} onChange={e => setHiringMultipleCandidates(e.target.value)} >
                    <option>Hiring Multiple Candidates</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            <div>
                <label>Personal Website Title</label>
                <input type='text' value={personalWebsiteTitle} onChange={e =>
                    setPersonalWebsiteTitle(e.target.value)} placeholder='website title' />
            </div>

            <div>
                <label>Personal Website Url</label>
                <input type='text' value={personalWebsiteUrl} onChange={e =>
                    setPersonalWebsiteUrl(e.target.value)} placeholder='website url' />
            </div>


            <div>
                <button onClick={handlePostJob} disabled={loading}>Post Job</button>
            </div>
            <ToastContainer />
        </div>
    )
}
