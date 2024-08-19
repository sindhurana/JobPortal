import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { clearAllApplicationErrors, deleteApplication, fetchEmployerApplications, resetApplicationSlice } from '../store/slices/applicationSlice';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

export default function Applications() {


    const { applications, loading, error, message } = useSelector(store => store.applications);


    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllApplicationErrors())
        }

        if (message) {
            toast.success(message);
            dispatch(resetApplicationSlice());
        }

        dispatch(fetchEmployerApplications())
    }, [dispatch, error, message])


    const handleDeleteApplication = (id) => {
        dispatch(deleteApplication(id))
    }

    return (
        <>
            {loading ? (
                <Spinner />
            ) : applications && applications.length <= 0 ? (
                <h1>You have no applications</h1>
            ) : (
                <div>
                    <h3>Application for your Posted Jobs</h3>
                    <div>
                        {applications.map((element) => (
                            <div key={element._id}>
                                <p>
                                    <span>Job Title:</span> {element.jobInfo.jobTitle}
                                </p>
                                <p>
                                    <span>Applicant Name:</span> {element.jobSeekerInfo.name}
                                </p>
                                <p>
                                    <span>Applicant Email:</span> {element.jobSeekerInfo.email}
                                </p>
                                <p>
                                    <span>Applicant Phone:</span> {element.jobSeekerInfo.phone}
                                </p>
                                <p>
                                    <span>Applicant Address:</span> {element.jobSeekerInfo.address}
                                </p>
                                <p>
                                    <span>Applicant CoverLetter:</span>
                                    <textarea value={element.jobSeekerInfo.coverLetter} disabled />
                                </p>
                                <button onClick={() => handleDeleteApplication(element._id)}>
                                    Delete Application
                                </button>
                                <Link to={element.jobSeekerInfo.resume.url} target="_blank">
                                    View Resume
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
