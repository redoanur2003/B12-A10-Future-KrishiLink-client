import { Eye, EyeOff } from 'lucide-react';
import React, { use, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../../FIrebase/AuthContext/AuthContext';

const Register = () => {
    const [show, setShow] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const lock = useLocation()
    const navi = useNavigate()
    // console.log(lock);

    const { createUser, googleSign } = use(AuthContext);
    // console.log(data);
    const handleShow = (e) => {
        setShow(e);
    }

    useEffect(() => {
        document.title = "Register page";
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const image = e.target.image.value;
        const email = e.target.email.value;
        const password = e.target.pass.value;
        const terms = e.target.term.checked;
        // console.log(name, image, email, password, terms);

        const length6Pattern = /^.{6,}$/;
        const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

        if (!length6Pattern.test(password)) {
            // console.log('password  didn't match')
            setError('Password must be 6 character or longer');
            return;
        }
        else if (!casePattern.test(password)) {
            setError('Password must have at least one uppercase and one lower case character')
            return;
        }

        if (!terms) {
            setError('Please accept our terms and conditions');
            return;
        }

        createUser(email, password)
            .then(result => {
                console.log(result)
                e.target.reset();
                setSuccess('Register Successful.');
                navi(lock.state || '/')
                const update = {
                    displayName: name,
                    photoURL: image
                }

                updateProfile(result.user, update)
                    .then()
                    .catch()
            })
            .catch(error => {
                console.log(error.message);
                Swal.fire({
                    position: 'top-right',
                    title: "Already used?",
                    text: "Already use this account!!!!",
                    icon: "question",
                    timer: 1000
                });
            })

    }

    const handleGoogleSubmit = (e) => {
        e.preventDefault();
        googleSign()
            .then(result => {
                console.log(result.user);
                navi(lock.state || '/')
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='bg-linear-to-r from-[#12c2e9] via-[#c471ed] to-[#f64f59]'>
            <NavLink to='/'>
                <h1 className=' mx-2 btn btn-active text-2xl font-black text-indigo-200'>Back to Home</h1>
            </NavLink>
            <div className="hero bg-base-200 min-h-screen bg-linear-to-r from-[#12c2e9] via-[#c471ed] to-[#f64f59]">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl text-black font-bold">Register now!</h1>
                    </div>
                    <div className="card border-2 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <fieldset className="fieldset">
                                    <label className="label font-bold text-xl text-black">Name</label>
                                    <input type="text" name='name' className="input bg-white" placeholder="Name" />
                                    <label className="label font-bold text-xl text-black">Image</label>
                                    <input type="text" className="input bg-white " name='image' placeholder="Image URL" />
                                    <label className="label font-bold text-xl text-black">Email</label>
                                    <input type="email" name='email' className="input bg-white" placeholder="Email" />
                                    <label className="label font-bold text-xl text-black">Password</label>
                                    <div className='relative'>
                                        <input type={show ? 'text' : "password"} name='pass' className="input bg-white" placeholder="Password" />
                                        {show ? <EyeOff className='absolute top-2 right-5' onClick={() => handleShow(!show)}></EyeOff>
                                            : <Eye className='absolute top-2 right-5' onClick={() => handleShow(!show)}></Eye>}
                                    </div>
                                    {error ? <h1 className='text-red-500 text-xs'>{error}</h1> : <h1 className='text-xl text-green-300'>{success}</h1>}
                                    <div className='flex gap-3'>
                                        <input type="checkbox" name="term" />
                                        <p>Accept terms & Condition</p>
                                    </div>
                                    <button className="btn btn-secondary mt-4">Submit</button>
                                    <NavLink to='/login'>
                                        <div><p className='text-xl'>Already have an account? <span className='text-xl text-yellow-400 hover:underline hover:text-green-500'>Login</span></p></div>
                                    </NavLink>
                                </fieldset>
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
        </div>
    );
};

export default Register;