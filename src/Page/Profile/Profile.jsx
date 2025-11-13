import React, { useContext, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { AuthContext } from '../../FIrebase/AuthContext/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const date = new Date(user.metadata.creationTime);
    const formattedDate = format(date, 'dd MMMM yyyy');
    // console.log(formattedDate);
    useEffect(() => {
        document.title = "Profile page";
    }, []);
    const handleProfile = () => {
        // console.log('hi')
        navigate('/update')
    }

    return (
        <div className='mx-auto my-auto bg-linear-to-r from-[#56c487] via-[#5fb7c5] to-[#9b6019]'>
            <motion.div
                initial={{ rotate: 360, scale: 1 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='card container flex justify-center items-center'>
                <p className='text-xl'>Profile Image</p>
                <img className=' w-fit md:w-[300px]  h-[150px] md:h-[300px] rounded-xl' src={user.photoURL} alt="" />
            </motion.div>
            <div className='mt-5  grid md:flex justify-center gap-3 md:gap-10'>
                <h3 className='text-xl'> User name: {user.displayName}</h3>
                <h3 className='text-xl'> User email: {user.email}</h3>
            </div>
            <div className='flex text-xl justify-center'>
                <h2>Created: {formattedDate}</h2>
            </div>
            <div className='flex justify-center mt-5 p-3'>
                <button className='btn btn-primary hover:btn-active' onClick={handleProfile}>Change Profile Data</button>
            </div>
        </div>
    );
};

export default Profile;