import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toast, ToastContainer } from 'react-toastify';
import { clearAllJobsError, deleteJob, getMyJobs, reesetJobSlice } from '../store/slices/jobSlice';
import Spinner from "./Spinner"

export default function MyJobs() {

    const { loading, error, myJobs, message } = useSelector(store => store.jobs)

    const dispatch = useDispatch();

    useEffect(() => {

        if (error) {
            toast.error(error)
            dispatch(clearAllJobsError())
        }

        if (message) {
            toast.success(message);
            dispatch(reesetJobSlice());
        }

        dispatch(getMyJobs())
    }, [dispatch, error, message])


    const handleDeleteJob = (id) => {
        dispatch(deleteJob(id))
    }

    return <>
        {
            loading ? (<Spinner />) : (myJobs && myJobs.length <= 0 ? (<h1>You have Not posted any Job!</h1>) :
                <>
                    <div>
                        <h3>My Jobs</h3>
                        <div>
                            {
                                myJobs.map((element) => {
                                    return (
                                        <div key={element._id}>
                                            <p>Job Title:<span>{element.title}</span></p>
                                            <p>Job Niche:<span></span>{element.jobNiche}</p>
                                            <p>Salary:<span>{element.salary}</span></p>
                                            <p>Location<span>{element.jobType}</span></p>
                                            <p>Company Name:<span>{element.companyName}</span></p>
                                            <p>Introduction:<span>{element.introduction}</span></p>
                                            <p>Qualifications:<span>{element.qualifications}</span></p>
                                            <p>Responsibilities:<span>{element.responsibilities}</span></p>
                                            {
                                                element.offers && <p>Offers:<span>{element.offers}</span></p>
                                            }
                                            <button onClick={() => handleDeleteJob(element._id)}>Delete Job</button>
                                            <ToastContainer />
                                        </div>


                                    )
                                })
                            }
                        </div>
                    </div>
                </>)
        }
    </>
}
