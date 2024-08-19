// import React, { useState } from 'react'
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// export default function Navbar() {

//     const { isAuthenticated } = useSelector(store => store.user)

//     return (
//         <>
//             <nav>
//                 <div>
//                     <img src="/logo.png" alt="logo"></img>
//                     <h4>JobPortal</h4>
//                 </div>
//             </nav>
//             <div>
//                 <ul>
//                     <li><Link to="/" >HOME</Link></li>
//                     <li><Link to="/jobs" >JOBS</Link></li>
//                     {isAuthenticated ? <li><Link to="/dashboard" >DASHBOARD</Link></li> :
//                         <li><Link to="/login" >Login</Link></li>}

//                 </ul>
//             </div>

//         </>
//     )
// }

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/userSlice';
// Adjust the import path if necessary

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(store => store.user);

    const handleLogout = async () => {
        try {
            await dispatch(logout()); // Trigger the logout action
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            <nav>
                <div>
                    <img src="/logo.png" alt="logo" />
                    <h4>JobPortal</h4>
                </div>
            </nav>
            <div>
                <ul>
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/jobs">JOBS</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/dashboard">DASHBOARD</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li> {/* Logout button */}
                        </>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </ul>
            </div>
        </>
    );
}

