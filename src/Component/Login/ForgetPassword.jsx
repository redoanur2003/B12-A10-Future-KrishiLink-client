import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { AuthContext } from '../../FIrebase/AuthContext/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import Swal from 'sweetalert2';

const ForgetPassword = () => {
    const location = useLocation();
    const passedEmail = location.state?.email || '';

    useEffect(() => {
        document.title = "Forget Password";
    }, []);
    const [email, setEmail] = useState(passedEmail);
    const handleReset = (e) => {
        e.preventDefault();

        if (!email) {
            Swal.fire({
                icon: 'warning',
                title: 'Email required!',
                text: 'Please enter your email address.',
            });
            return;
        }

        sendPasswordResetEmail(AuthContext, email)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Reset Link Sent!',
                    text: `Check your inbox for a reset link at ${email}`,
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: error.message,
                });
            });
    };

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Reset Password</h1>
                    <p className="py-6 text-lg ">
                        Enter your registered email to receive a password reset link.
                    </p>
                </div>

                <div className="card w-full max-w-sm bg-white shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleReset}>
                            <fieldset className="fieldset">
                                <label className="label text-black">Email</label>
                                <input
                                    type="email"
                                    className="input bg-white"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <button className="btn btn-primary mt-4 w-full">Send Reset</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
