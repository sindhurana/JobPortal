import React, { useEffect, useState } from 'react'
import { useDeferredValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearAllUserErrors, logout } from '../store/slices/userSlice';
import { toast } from 'react-toastify';
import { FaLongArrowAltRight } from "react-icons/fa";
import MyProfile from '../components/MyProfile';
import UpdateProfile from '../components/UpdateProfile';
import UpdatePassword from '../components/UpdatePassword';
import JobPost from '../components/JobPost';
import MyJobs from '../components/MyJobs';
import MyApplications from '../components/MyApplications';
import Applications from '../components/Applications';

export default function Dashboard() {

    const [show, setShow] = useState(false);
    const [componentName, setComponentName] = useState("My Profile");

    const { loading, isAuthenticated, error, user } = useSelector(store => store.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged Out.")
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllUserErrors());
        }

        if (!isAuthenticated) {
            navigate("/");

        }
    }, [dispatch, error, loading, isAuthenticated])



    return (
        <>
            <section>
                <div>
                    <p>DashBoard</p>
                    <p>Welcome! {user && user.name}</p>
                </div>
                <div>
                    <div className={show ? "sideBar showSideBar" : "sidebar"}>
                        <ul>
                            <h4>Manage Account</h4>
                            <li> <button onClick={() => {
                                setComponentName("My Profile");
                                setShow(!show);
                            }}>My Profile</button>
                            </li>

                            <li>
                                <button onClick={() => {
                                    setComponentName("Update Profile");
                                    setShow(!show);
                                }}>Update Profile</button>
                            </li>


                            <li>
                                <button onClick={() => {
                                    setComponentName("Update Password");
                                    setShow(!show);
                                }}>Update Password</button>
                            </li>


                            {user && user.role === "Employer" && (
                                <li>
                                    <button onClick={() => {
                                        setComponentName("Post Job");
                                        setShow(!show);
                                    }}>Post New Job</button>
                                </li>
                            )}



                            {user && user.role === "Employer" && (
                                <li>
                                    <button onClick={() => {
                                        setComponentName("My Jobs");
                                        setShow(!show);
                                    }}>My Jobs</button>
                                </li>
                            )}



                            {user && user.role === "Employer" && (
                                <li>
                                    <button onClick={() => {
                                        setComponentName("Applications");
                                        setShow(!show);
                                    }}>Applications</button>
                                </li>
                            )}



                            {user && user.role === "Job Seeker" && (
                                <li>
                                    <button onClick={() => {
                                        setComponentName("My Applications");
                                        setShow(!show);
                                    }}>My Applications</button>
                                </li>
                            )}


                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className={show ? "sidebar_icon move_right" : "sidebar_icon move_left"}>
                            <FaLongArrowAltRight onClick={() => setShow(!show)}
                                className={show ? "left_arrow" : "right_arrow"} />
                        </div>
                        {
                            (() => {
                                switch (componentName) {
                                    case "My Profile":
                                        return <MyProfile />
                                        break;

                                    case "Update Profile":
                                        return <UpdateProfile />
                                        break;

                                    case "Update Password":
                                        return <UpdatePassword />
                                        break;

                                    case "Post Job":
                                        return <JobPost />
                                        break;

                                    case "My Jobs":
                                        return <MyJobs />
                                        break;

                                    case "Applications":
                                        return <Applications />
                                        break;

                                    case "My Applications":
                                        return <MyApplications />
                                        break;

                                    default:
                                        <MyProfile />
                                        break;

                                }
                            })()
                        }
                    </div>
                </div>
            </section >
        </>
    )
}
