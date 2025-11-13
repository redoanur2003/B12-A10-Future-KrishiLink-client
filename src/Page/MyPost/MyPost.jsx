import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../FIrebase/AuthContext/AuthContext';
import { Link } from 'react-router';

const MyPost = () => {
    const { user } = use(AuthContext);
    const email = user.email;
    const [myCrop, SetMyCrop] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:1212/myPost?email=${email}`)
            .then(res => res.json())
            .then(data => SetMyCrop(data));
    }, [email])

    console.log(user);
    return (
        <div>
            {myCrop.length > 0 ?
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 p-3'>
                    {myCrop.map(crops =>
                        <Link key={crops._id} to={`/crop/${crops._id}`}>
                            <div className='card'>
                                <div className="p-1">
                                    <img
                                        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-xl"
                                        src={crops.image}
                                        alt={crops.name}
                                    />
                                </div>
                                <div className="flex justify-between p-1 text-sm sm:text-base">
                                    <p className="font-medium">{crops.name}</p>
                                    <p className="text-gray-600">{crops.type}</p>
                                    <button className='btn bg-green-600'>View details</button>
                                </div>
                            </div>
                        </Link>
                    )}
                </div> :
                <div className='text-2xl text-center'>
                    <h1>You haven't post yet any crops.</h1>
                </div>
            }

        </div>
    );
};

export default MyPost;