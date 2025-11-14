import React from 'react';
import { NavLink } from 'react-router';

const ErrorCrop = () => {
    return (
        <div class="flex justify-center items-center h-screen">
            <div class="">
                <h1 className='text-xl md:text-3xl'>There are no crop at that details</h1>
                <p className='text-3xl text-center md:text-9xl text-red-800'>Error404</p>
                <NavLink to='/'>
                    <button className='btn w-full mt-2 p-2 btn-active text-xl hover:btn-accent hover:text-3xl'> Back to home</button>
                </NavLink>
            </div>
        </div>
    );
};

export default ErrorCrop;