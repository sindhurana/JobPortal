import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { clearAllJobsError, fetchJobs } from '../store/slices/jobSlice';
import Spinner from '../components/Spinner';
import { MdSearch } from "react-icons/md";

export default function Jobs() {
    const locations = [
        "Delhi", "Noida", "Gurugram", "Bangalore"
    ];

    const jobNiches = ["Backend", "Frontend", " Full Stack Development"];


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
        setSelectedLocation(jobNiche);
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
            {!loading ? <Spinner /> : (
                <section>
                    <div className="serach-tab-wrapper">
                        <input type='text' value={searchKeyWord}
                            onChange={e => setSearchKeyWord(e.target.value)}></input>
                        <button onClick={handleSearchKeyWord}>Find Jobs</button>
                        <MdSearch />
                    </div>

                    <div className="wrapper">
                        <h2>Filter Job By Location</h2>
                        {
                            locations.map((location, index) => {
                                return <div key={index} >
                                    <input type="radio" id={location} name="location" value={location}
                                        checked={selectedLocation === location}
                                        onChange={() => handleLocationChange(location)} />
                                </div>

                            })
                        }

                        <h2>Filter Job By Niche</h2>
                        {
                            jobNiches.map((jobNiche, index) => {
                                return <div key={index} >
                                    <input type="radio" id={jobNiche} name="jobNiche" value={jobNiche}
                                        checked={selectedNiche === jobNiche}
                                        onChange={() => handleNicheChange(jobNiche)} />
                                </div>

                            })
                        }

                    </div>
                </section>
            )}

        </div>
    )
}
