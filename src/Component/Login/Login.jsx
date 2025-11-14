import { Eye, EyeOff } from 'lucide-react';
import React, { use, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../FIrebase/AuthContext/AuthContext';

const Login = () => {
    const [show, setShow] = useState(false)
    const emailRef = useRef();
    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();

    const { signInUser, googleSign } = use(AuthContext);

    useEffect(() => {
        document.title = "Login page";
    }, []);

    const handleShow = (e) => {
        setShow(e);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.pass.value;
        // console.log(email, password);

        signInUser(email, password)
            .then(result => {
                console.log(result)
                e.target.reset();
                navigate(location.state || '/')
                Swal.fire({
                    position: 'top-right',
                    title: "Login",
                    icon: "success",
                    draggable: true,
                    timer: 1000
                });
            })
            .catch(error => {
                console.log(error.message);
                Swal.fire({
                    position: 'top-right',
                    title: "Error!?",
                    text: "Account not found!!",
                    icon: "question",
                    timer: 1000
                });
            })

    }
    const handleReset = () => {
        const email = emailRef.current.value;
        // console.log(email);
        navigate('/forget', { state: { email } })
    }
    const handleGoogleSubmit = (e) => {
        e.preventDefault();
        googleSign()
            .then(result => {
                console.log(result.user);
                navigate(location.state || '/')
                Swal.fire({
                    position: 'top-right',
                    title: "Login",
                    icon: "success",
                    draggable: true,
                    timer: 1000
                });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    position: 'top-right',
                    title: "Error!?",
                    text: "Account not found!!",
                    icon: "question",
                    timer: 1000
                });
            })
    }
    return (
        <>
            <div className='bg-linear-to-r from-[#12c2e9] via-[#c471ed] to-[#f64f59]'>
                <NavLink to='/'>
                    <h1 className=' mx-2 btn btn-active text-2xl font-black text-indigo-200'>Back to Home</h1>
                </NavLink>
                <div className='font-black text-3xl text-center text-white'>Login Now</div>
                <div className='flex justify-center items-center'>
                    <div className="card w-full max-w-sm shrink-0 shadow-2xl border-2">
                        <div className='card-body'>
                            <form onSubmit={handleSubmit} className='fieldset'>
                                <label className='label font-bold text-xl text-black'>Email</label>
                                <input ref={emailRef} type="email" className='input bg-white' name="email" placeholder='Email' />
                                <label className='label font-bold text-xl text-black'>Password</label>
                                <div className='relative'>
                                    <input type={show ? 'text' : "password"} name='pass' className="input bg-white" placeholder="Password" />
                                    {show ? <EyeOff className='absolute top-2 right-5' onClick={() => handleShow(!show)}></EyeOff>
                                        : <Eye className='absolute top-2 right-5' onClick={() => handleShow(!show)}></Eye>}
                                </div>
                                <div><a onClick={handleReset} className="link font-bold text-xl text-black link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Done</button>
                                <NavLink state={location.state} to='/register'>
                                    <div><p className='text-xl text-center'>I don't have any account.Place,</p>
                                        <span className='flex justify-center text-yellow-300 items-center text-xl hover:underline hover:text-cyan-400'>Register Now</span>
                                    </div>
                                </NavLink>
                            </form>
                        </div>
                        <div onClick={handleGoogleSubmit} className='flex justify-center items-center mb-2'>
                            <button className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;