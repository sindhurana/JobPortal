import React from 'react'
import { useSelector } from 'react-redux'

export default function MyProfile() {
    const { user } = useSelector(store => store.user);

    return (
        <div>
            <h3>My Profile</h3>
            <div>
                <label>Full Name</label>
                <input type="text" disabled value={user && user.name} onChange={e => e.target.value} />
            </div>


            <div>
                <label>Email Address</label>
                <input type="email" disabled value={user && user.email} onChange={e => e.target.value} />
            </div>

            {
                user && user.role === "Job Seeker" && (
                    <div>
                        <div>
                            <label>My Preffered Job Niches</label>
                        </div>
                        <div>
                            <input type="text" disabled value={user && user.niches.firstNiche} onChange={e => e.target.value} />
                        </div>

                        <div>
                            <input type="text" disabled value={user && user.niches.secondNiche} onChange={e => e.target.value} />
                        </div>

                        <div>
                            <input type="text" disabled value={user && user.niches.thirdNiche} onChange={e => e.target.value} />
                        </div>
                    </div>
                )
            }

            <label>Phone Number</label>
            <div>
                <input type="number" disabled value={user && user.phone} onChange={e => e.target.value} />
            </div>

            <label>Address</label>
            <div>
                <input type="text" disabled value={user && user.address} onChange={e => e.target.value} />
            </div>

            <label>Role</label>
            <div>
                <input type="text" disabled value={user && user.role} onChange={e => e.target.value} />
            </div>

            <label>Member Since</label>
            <div>
                <input type="text" disabled value={user && user.createdAt} onChange={e => e.target.value} />
            </div>

        </div>
    )
}
