import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [show, setShow] = useState(false);
    const { isAuthenticated } = useSelector(store => store.user)

    return (
        <>
            <nav>
                <div>
                    <img src="/logo.png" alt="logo"></img>
                    <h4>JobPortal</h4>
                </div>
            </nav>
            <div>
                <ul>
                    <li><Link to="/" >HOME</Link></li>
                    <li><Link to="/jobs" >JOBS</Link></li>
                    {isAuthenticated ? <li><Link to="/dashboard" >DASHBOARD</Link></li> :
                        <li><Link to="/login" >Login</Link></li>}

                </ul>
            </div>

        </>
    )
}
