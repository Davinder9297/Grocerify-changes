import React, { useState } from 'react';
import styles from './register.module.css';
import { FaCircleCheck } from "react-icons/fa6";
import { ReactComponent as User } from '../../Assets/Icons/userRegister.svg';
import CircularProgress from '@mui/joy/CircularProgress';


import { ReactComponent as Email } from '../../Assets/Icons/email.svg';
import { ReactComponent as Phone } from '../../Assets/Icons/phone.svg';
import { ReactComponent as Lock } from '../../Assets/Icons/lock.svg';
import { ReactComponent as Facebook } from '../../Assets/Icons/facebook.svg';
import { ReactComponent as Google } from '../../Assets/Icons/google.svg';
import { ReactComponent as Apple } from '../../Assets/Icons/apple.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL_PRODUCTS, BASE_URL_USER } from '../../Api/api';
import VerifyOTP from '../verifyOTP/verifyOTP';
import toast, { Toaster } from 'react-hot-toast';
import { validateEmail } from '../../helpers';

const Register = () => {
    const navigate = useNavigate();
    const [showOTPModal, setshowOTPModal] = useState(false)
    const [btnLoader, setBtnLoader] = useState(false);
    const [ismobileVerified, setismobileVerified] = useState('error')
    const [user, setuser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        mobile: "",
        password: "",
    })

    const handleRegister = async () => {
        setBtnLoader(true);

        if (!user.firstName || !user.lastName || !user.email || !user.mobile || !user.password) {
            toast.error('Please Enter valid Credentials');

        }
        else if (!validateEmail(user.email)) {
            toast.error("Please Enter valid Email")
        }

        else if (!ismobileVerified) {
            toast.error("Please verify your mobile first");

        }
        else {
            try {
                const res = await axios.post(`${BASE_URL_PRODUCTS}api/register`, {

                    password: user.password,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    mobile: user.mobile,
                })
                console.log(res);
                localStorage.setItem('GROC_USER_TOKEN', res.data.token)
                if (res.status == 201) {
                    toast.success('Registered Successfully')
                }
            } catch (error) {

                console.log(error)
                toast.error("Register Failed")
            } finally {
                setBtnLoader(false)
            }
        }
        setBtnLoader(false)


    }

    const handlesendOTP = async () => {

        if (user.mobile.length !== 10) {
            toast.error("Enter valid Mobile Number")
            return
        }
        setismobileVerified('loading')

        try {
            const res = await axios.post(`${BASE_URL_PRODUCTS}api/generateMobileOTP`, { mobile: Number(user.mobile) });
            console.log(res);
            if (res.status === 201) {
                setshowOTPModal(true)
                toast.success(res.data.msg)

            }
            else {
                toast.error(res.data.msg)
            }
        }
        catch (error) {
            console.log(error)
            toast.error("Unable to  send OTP")
            setismobileVerified('error')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setuser({
            ...user,
            [name]: value,
        });
    };

    // console.log(user)


    return (
        <>
            <div className={styles.register_container}>
                <div className={styles.register_box_main}>
                    {/* Main heading */}
                    <h1>Create Your Account</h1>
                    <div className={styles.input_main}>
                        {/* Section for entering details */}
                        <h3>Enter Your Details</h3>
                        <span className={styles.inputs}>
                            {/* Username input */}
                            <span>
                                <User />
                                <input type="text" placeholder='Enter Your First Name' name='firstName' value={user.firstName} onChange={handleChange} />
                            </span>
                            {/* Email input */}
                            <span>
                                <User />
                                <input type="text" placeholder='Enter Your Last Name' name='lastName' value={user.lastName} onChange={handleChange} />
                            </span>
                            <span>
                                <Email />
                                <input type="text" placeholder='Enter Your Email' name='email' value={user.email} onChange={handleChange} />
                            </span>
                            {/* Phone input */}
                            <span className={styles.mobile_num}>
                                <Phone />
                                <input type="text" placeholder='Enter Your Phone' name='mobile' value={user.mobile} onChange={handleChange} />
                                {ismobileVerified === 'success' ? <i> <FaCircleCheck /> </i> : ismobileVerified === 'loading' ? <i style={{ top: "0px" }}> <CircularProgress size="sm" color="success" /> </i> : <p onClick={handlesendOTP}>Verify</p>}
                            </span>
                            {/* Password input */}
                            <span>
                                <Lock />
                                <input type="password" placeholder='Enter Your Password' name='password' value={user.password} onChange={handleChange} />
                            </span>
                        </span>
                        {/* Action buttons */}
                        <div className={styles.action_button}>
                            {/* Sign up button */}
                            <div className={styles.submit} onClick={handleRegister}>
                                <button>{btnLoader ? <CircularProgress size="sm" color="success" /> : "Sign Up"}</button>
                            </div>
                            {/* Login options */}
                            <div className={styles.login_options}>
                                <p>sign in With</p>
                                {/* Social media login buttons */}
                                <div className={styles.btn_group}>
                                    <span><Facebook /></span>
                                    <span><Google /></span>
                                    <span><Apple /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showOTPModal && <VerifyOTP open={setshowOTPModal} mobile={user.mobile} setismobileVerified={setismobileVerified} />}
            </div>
            <Toaster />
        </>
    );
}

export default Register;
