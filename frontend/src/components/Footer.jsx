import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsGithub } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";


export const Footer = () => {
    const { isAuthenticated } = useSelector(store => store.user)

    return <>
        <footer>
            <div>
                <img src="/logo.png" alt="logo" />
            </div>
            <div>
                <h4>Support</h4>
                <ul>
                    <li>Street No. 7 ,Noida</li>
                    <li>rana.sindhu15@gmail.com</li>
                    <li>+918510903554</li>
                </ul>
            </div>

            <div>
                <h4>Quick Links</h4>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/jobs">Jobs</Link></li>
                    {isAuthenticated && <li><Link to="/dashboard">Dashboard</Link></li>}
                </ul>
            </div>
            <div>
                <h4>Follow Us</h4>
                <ul>
                    <li><Link><span><FaSquareXTwitter /><span>X</span></span></Link></li>
                    <li><Link><span><FaYoutube /><span> </span>Youtube</span></Link></li>
                    <li><Link to="https://github.com/sindhurana"><span><BsGithub /><span>Github</span></span></Link></li>

                </ul>
            </div>
        </footer>
    </>
}