import React, { use } from 'react';
import { NavLink, useLoaderData } from 'react-router';
import { AuthContext } from '../../FIrebase/AuthContext/AuthContext';

const MyInterest = () => {
    const allCrops = useLoaderData();
    const { user } = use(AuthContext);

    // console.log("All crop: ", allCrops);
    // console.log("User: ", user);

    const loggedUser = user.email;
    // console.log(loggedUser)

    const userInterestCrops = allCrops.filter(crop =>
        crop.interests?.some(interest => interest.interestData.userEmail === loggedUser)
    );

    // console.log(userInterestCrops);
    return (
        <>
            <h1 className='text-2xl text-center underline'>My Interested crop</h1>
            <div className="p-4">
                {userInterestCrops.length > 0 ? (
                    <div className="overflow-x-auto">
                        <h1>Total interest crop is: {userInterestCrops.length}</h1>
                        <table className="min-w-full table border border-gray-300">
                            <thead className="">
                                <tr className='text-black'>
                                    <th className="border p-2">Crop Name</th>
                                    <th className="border p-2">Owner Name</th>
                                    <th className="border p-2">Quantity Requested</th>
                                    <th className="border p-2">Message</th>
                                    <th className="border p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userInterestCrops.map(crop => {
                                    const userInterest = crop.interests.find(
                                        interest => interest.interestData.userEmail === loggedUser
                                    );

                                    return (
                                        <tr key={crop._id}>
                                            <td className="border p-2 hover:text-green-500 hover:text-xl hover:underline">
                                                <NavLink to={`/crop/${crop._id}`}>{crop.name}</NavLink>
                                            </td>
                                            <td className="border p-2">{crop.owner.ownerName}</td>
                                            <td className="border p-2">{userInterest.interestData.quantity}</td>
                                            <td className="border p-2">{userInterest.interestData.message}</td>
                                            <td className={`border border-black p-2 text-center ${(userInterest.interestData.status === "pending") && "text-yellow-400 text-xl"
                                                || (userInterest.interestData.status === "reject") && "text-red-400 text-xl" ||
                                                "text-green-400 text-xl"}`
                                            }>
                                                {userInterest.interestData.status}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>
                    </div>
                ) : (
                    <div className="text-center text-2xl mt-8">
                        <h1>You do not have any interested crops yet.</h1>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyInterest;