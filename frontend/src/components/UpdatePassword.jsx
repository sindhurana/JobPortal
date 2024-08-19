import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { toast, ToastContainer } from 'react-toastify';
import { clearAllUpdateProfileErrors, updatePassword } from '../store/slices/updateProfile';
import { getUser } from '../store/slices/userSlice';
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

export default function UpdatePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const { loading, error, isUpdated } = useSelector(store => store.updateProfile);

    const dispatch = useDispatch();


    const handleUpdatePassword = () => {
        const formdata = new FormData();
        formdata.append("oldPassword", oldPassword);
        formdata.append("newPassword", newPassword);
        formdata.append("confirmPassword", confirmPassword);
        formdata.append("showPassword", showPassword);
        dispatch(updatePassword(formdata));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllUpdateProfileErrors());
        }

        if (isUpdated) {
            toast.success("Password Updated");
            dispatch(getUser());
            dispatch(clearAllUpdateProfileErrors());
        }


    }, [dispatch, loading, error, isUpdated])

    return (
        <div>
            <h3>Update Password</h3>
            <div>
                <label>Current Password</label>
                <input type={showPassword ? "text" : "password"} value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                {
                    showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} /> :
                        <FaEye onClick={() => setShowPassword(!showPassword)} />
                }
            </div>

            <div>
                <label>New Password</label>
                <input type={showPassword ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                {
                    showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} /> :
                        <FaEye onClick={() => setShowPassword(!showPassword)} />
                }
            </div>

            <div>
                <label>Confirm Password</label>
                <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                {
                    showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} /> :
                        <FaEye onClick={() => setShowPassword(!showPassword)} />
                }
            </div>

            <div>
                <button disabled={loading} onClick={handleUpdatePassword}>Update Password</button>
            </div>
            <ToastContainer />
        </div>
    )
}
