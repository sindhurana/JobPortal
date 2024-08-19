import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { clearAllApplicationErrors, deleteApplication, fetchJobSeekerApplications, resetApplicationSlice } from '../store/slices/applicationSlice';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

export default function MyApplications() {
    const { user, isAuthenticated } = useSelector(store => store.user);
    const { loading, error, applications, message } = useSelector(store => store.applications);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
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

        dispatch(fetchJobSeekerApplications());
    }, [dispatch, error, message])


    const handleDeleteApplication = (id) => {
        dispatch(deleteApplication(id));
    }

    return (
        <div>
            {
                loading ? <Spinner /> : (applications && applications.length <= 0 ?
                    (<h1>You have not applied for any Job</h1>
                    ) :
                    (
                        <>
                            <div>
                                <h3>My Applications for Job</h3>
                                <div>
                                    {
                                        applications.map((element) => {
                                            return (
                                                < div key={element._id} >
                                                    <p>
                                                        <span>Job Title:</span>{element.jobInfo.jobTitle}
                                                    </p>

                                                    <p>
                                                        <span>Name:</span>{element.jobSeekerInfo.name}
                                                    </p>

                                                    <p>
                                                        <span>Email:</span>{element.jobSeekerInfo.email}
                                                    </p>

                                                    <p>
                                                        <span>Phone:</span>{element.jobSeekerInfo.phone}
                                                    </p>

                                                    <p>
                                                        <span>Address:</span>{element.jobSeekerInfo.address}
                                                    </p>

                                                    <p>
                                                        <span>CoverLetter:</span>
                                                        <textarea value={element.jobSeekerInfo.coverLetter} disabled />
                                                    </p>

                                                    <button onClick={() => handleDeleteApplication(element._id)}>
                                                        Delete Application
                                                    </button>
                                                    <Link to={element.jobSeekerInfo && element.jobSeekerInfo.resume.url} target='_blank'>
                                                        View Resume
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    )
                )
            }
            <ToastContainer />

        </div >
    )
}
