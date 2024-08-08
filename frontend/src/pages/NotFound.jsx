import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <section >
            <div>
                <h1>404 Not Found</h1>
                <p>“Hey, Captain! Looks like you’re heading to a wrong planet!”</p>
                <Link to="/">Back to Home Page</Link>

            </div>
        </section>
    )
}
