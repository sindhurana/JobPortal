import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { clearAllJobsError, fetchJobs } from '../store/slices/jobSlice';
import Spinner from '../components/Spinner';
import { MdSearch } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function Jobs() {
    const locations = [
        "Delhi", "Noida", "Gurugram", "Bangalore"
    ];

    const jobNiches = ["Backend", "Frontend", " Full Stack Developer", "Web Developer"];


    const [location, setLocation] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [jobNiche, setjobNiche] = useState("");
    const [selectedNiche, setSelectedNiche] = useState("");
    const [searchKeyWord, setSearchKeyWord] = useState("");

    const { jobs, loading, error } = useSelector(store => store.jobs)

    const handleLocationChange = (location) => {
        setLocation(location);
        setSelectedLocation(location);
    }

    const handleNicheChange = (jobNiche) => {
        setjobNiche(jobNiche);
        setSelectedNiche(jobNiche);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllJobsError());
        }
        dispatch(fetchJobs(location, jobNiche, searchKeyWord));
    }, [dispatch, error, location, jobNiche]);

    const handleSearchKeyWord = () => {
        dispatch(fetchJobs(location, jobNiche, searchKeyWord));
    }

    return (
        <div>
            {loading ? <Spinner /> : (
                <section>
                    <div className="search-tab-wrapper">
                        <input type='text' value={searchKeyWord}
                            onChange={e => setSearchKeyWord(e.target.value)}></input>
                        <button onClick={handleSearchKeyWord}>Find Jobs<MdSearch /></button>

                    </div>

                    <div className="wrapper">
                        <div className="filter-bar">
                            <div className="location">
                                <h2>Filter Job By Location</h2>
                                {
                                    locations.map((location, index) => {
                                        return (<div key={index} >
                                            <input type="radio" id={location} name="location" value={location}
                                                checked={selectedLocation === location}
                                                onChange={() => handleLocationChange(location)} />
                                            <label htmlFor={location}>{location}</label>
                                        </div>
                                        )

                                    })
                                }
                            </div>

                            <div className="jobNiches">
                                <h2>Filter Job By Niche</h2>
                                {
                                    jobNiches.map((jobNiche, index) => {
                                        return <div key={index} >
                                            <input type="radio" id={jobNiche} name="jobNiche" value={jobNiche}
                                                checked={selectedNiche === jobNiche}
                                                onChange={() => handleNicheChange(jobNiche)} />
                                            <label htmlFor={jobNiche}>{jobNiche}</label>
                                        </div>

                                    })
                                }
                            </div>
                        </div>

                        <div className="container">
                            <div className="mobile-filter">
                                <select value={location} onChange={e => setLocation(e.target.value)}>
                                    <option value="">Filter By Location</option>
                                    {
                                        locations.map((location, index) => {
                                            return <option value={location} key={index}>{location}</option>
                                        })
                                    }
                                </select>

                                <select value={jobNiche} onChange={e => setjobNiche(e.target.value)}>
                                    <option value="">Filter By Niche</option>
                                    {
                                        jobNiches.map((jobNiche, index) => {
                                            return <option value={jobNiche} key={index}>{jobNiche}</option>
                                        })
                                    }
                                </select>

                            </div>

                            <div className="jobs_container">
                                {
                                    jobs && jobs.map(element => {
                                        return (
                                            <div className="card" key={element._id}>
                                                {element.hiringMultipleCandidates === "Yes" ? (<p>Hiring Multiple Positions</p>) :
                                                    (<p>Hiring</p>)}

                                                <p>{element.title}</p>
                                                <p>{element.companyName}</p>
                                                <p>{element.location}</p>
                                                <p>Salary:Rs{element.salary}</p>
                                                <p>Posted On:{element.jobPostedOn.substring(0, 10)}</p>
                                                <div className="btn-wrapper">
                                                    <Link to={`/application/post/${element._id}`}>Apply Now</Link>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                </section>
            )}

        </div>
    )
}
