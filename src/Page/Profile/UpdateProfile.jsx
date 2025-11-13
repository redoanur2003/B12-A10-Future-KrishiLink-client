import React, { use, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import { AuthContext } from '../../FIrebase/AuthContext/AuthContext';
import { useNavigate } from 'react-router';


const UpdateProfile = () => {
    const { user } = use(AuthContext);
    const navigate = useNavigate();
    // console.log(user);
    useEffect(() => {
        document.title = "Update profile";
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const image = e.target.image.value;

        if (!image) {
            Swal.fire({
                icon: 'warning',
                title: 'Empty field!',
                text: 'At least fill one required field!',
            });
            return;
        }

        const update = {
            displayName: name,
            photoURL: image
        }
        console.log(update);

        updateProfile(user, update)
            .then(() => {
                Swal.fire({
                    position: 'top-right',
                    title: "Update",
                    icon: "success",
                    draggable: true,
                    timer: 1000
                });
                navigate('/profile');
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    return (
        <>
            <h1 className='text-center text-xs md:text-2xl text-blue-300'>Here Update your Profile name and image</h1>
            <div className='flex justify-center items-center'>
                <form onSubmit={handleUpdate}>
                    <fieldset className="fieldset">
                        <label className="label">Enter your name</label>
                        <input type="text" name='name' className="input bg-white" placeholder="Name" />
                        <label className="label">Image URL</label>
                        <input type="text" name='image' className="input bg-amber-50" placeholder="Image URL" />
                        <button className="btn btn-primary">Update</button>
                    </fieldset>
                </form>
            </div>
        </>
    );
};

export default UpdateProfile;