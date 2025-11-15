import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../FIrebase/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const SingleCrop = () => {
    const singleCrop = useLoaderData();
    const { _id: cropId, interests, quantity } = singleCrop;
    const [totalQuantity, setTotalQuantity] = useState(quantity);
    // console.log(interests);
    // console.log(totalQuantity);
    useEffect(() => {
        document.title = "Single crop data";
    }, []);

    const { user } = use(AuthContext);
    const interestModalRef = useRef(null);
    const email = user.email;
    const name = user.displayName;
    const [canInterest, SetCanInterest] = useState();
    // console.log(user);
    const [price, setPrice] = useState();
    const [cropInterests, setCropInterests] = useState(singleCrop.interests);

    useEffect(() => {
        if (interests && Array.isArray(interests)) {
            const existing = interests.find(
                inter => inter.interestData.userEmail === email
            );
            SetCanInterest(existing || null);
        } else {
            SetCanInterest(null);
        }
    }, [interests, email]);

    const handleInterestModalOpen = () => {
        interestModalRef.current.showModal();
    }

    const handleInterestSubmit = (e) => {
        e.preventDefault();
        const message = e.target.message.value;
        const quantity = e.target.quantity.value;
        // console.log(cropId, quantity, message, total)

        const interestInfo = {
            cropId: cropId,
            userEmail: email,
            userName: name,
            quantity: quantity,
            message: message,
            status: "pending"
        }


        if (quantity > 0) {
            interestModalRef.current.close();
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Are you sure to send interest.",
                showConfirmButton: true,
                showCancelButton: true
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        fetch(`http://localhost:1212/crop/interest/${cropId}`, {
                            method: 'PATCH',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(interestInfo)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.modifiedCount) {
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Send interest successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    e.target.reset();
                                    SetCanInterest(interestInfo);
                                }

                                else {
                                    console.log('Not modify')
                                }
                            })
                    }
                    else {
                        console.log('not ok')
                    }
                })
        }
        else {
            interestModalRef.current.close();
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Quantity must be 1 or more",
                showConfirmButton: true
            })
        }
    }

    const handleStatus = (stat, interestId, qun) => {
        // console.log("The information is: ", stat, interestId, singleCrop._id);

        const updateData = {
            interestId: interestId, cropsId: singleCrop._id, status: stat
        }

        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: `Are you sure ${stat} interest?`,
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((result) => {
                if (result.isConfirmed) {

                    fetch('http://localhost:1212/updateInterest', {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(updateData)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.modifiedCount) {
                                setCropInterests(prev =>
                                    prev.map(inter =>
                                        inter._id === interestId
                                            ? {
                                                ...inter,
                                                interestData: {
                                                    ...inter.interestData,
                                                    status: stat
                                                }
                                            }
                                            : inter
                                    )
                                );
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `Interest ${stat}`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                if (stat === "accept") {
                                    setTotalQuantity(totalQuantity - qun);
                                }
                            }
                        })
                }
            })
    }
    return (
        <>
            <div>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10 border-b-2 border-gray-200 pb-10">
                    <div className="flex flex-col items-center">
                        <div className="bg-white shadow-md rounded-2xl p-3">
                            <img
                                className="w-48 sm:w-64 md:w-72 object-cover rounded-xl"
                                src={singleCrop.image}
                                alt={singleCrop.name}
                            />
                        </div>

                        <div className="flex items-center justify-center gap-6 mt-4">
                            <div className="flex items-center gap-2 p-2">
                                <p className="text-success text-lg font-semibold">Price Per Unit:</p>
                                <span className="text-lg font-semibold flex items-center gap-1">
                                    {singleCrop.pricePerUnit} tk. Unit: {singleCrop.unit}
                                </span>
                                <p className="text-success text-lg font-semibold">Total quantity:</p>
                                <span className="text-lg font-semibold flex items-center gap-1">
                                    {totalQuantity}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-4 text-center md:text-left border-b border-gray-300 pb-2">
                            Crop Name: <span className="text-blue-600">{singleCrop.name}</span>
                        </h2>

                        <div className="flex flex-wrap gap-4 text-xl mb-6">
                            <p>
                                <span className="font-semibold text-success">Owned by:</span> {singleCrop.owner.ownerName}
                            </p>
                            <p>
                                <span className="font-semibold">Category:</span> {singleCrop.type}
                            </p>
                        </div>

                        <div className='flex gap-x-3 mb-3'>
                            <p className='text-2xl font-semibold mb-2'>Owner email: {singleCrop.owner.ownerEmail}</p>
                            <p className='text-2xl font-semibold mb-2'>Location: {singleCrop.location}</p>
                        </div>

                        <div className='flex gap-3'>
                            <h3 className="text-2xl font-semibold mb-2 text-success">Description: </h3>
                            <p className="leading-relaxed text-xl">
                                {singleCrop.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {
                    (email != singleCrop.owner.ownerEmail) ?

                        <div className=''>
                            <div className='flex justify-center p-2'>
                                {(!canInterest) ? <button
                                    onClick={handleInterestModalOpen}
                                    className="btn btn-primary">Interested this crop</button> :
                                    <h1 className='text-orange-500 text-xs md:text-2xl font-bold'>You already send interest this crop</h1>
                                }

                            </div>

                            <dialog ref={interestModalRef} className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box bg-emerald-300">
                                    <h3 className="font-bold text-lg">Give the best interest offer!</h3>
                                    <p className="py-4">This interested offer seller can not resist</p>
                                    <form onSubmit={handleInterestSubmit}>
                                        <fieldset className="fieldset">
                                            <label className="label">Enter quantity</label>
                                            <div className='flex gap-2'>
                                                <input type="text" onChange={(e) => setPrice(e.target.value * singleCrop.pricePerUnit)} name='quantity' placeholder='Enter the number quantity'
                                                    defaultValue={1} className="input bg-white" />
                                                <input type="text" defaultValue={singleCrop.unit} readOnly className='bg-white text-xl w-20 text-center rounded' />
                                            </div>

                                            <label className="label">Message</label>
                                            <input type="text" className="input bg-white" name='message' placeholder='Write about quality type and quantity' />

                                            <label className="label">Total Price </label>
                                            <input type="text" name='total' className="input bg-white"
                                                readOnly value={price ? price : singleCrop.pricePerUnit}
                                            />
                                            <button className="btn btn-neutral mt-4">Please your interest</button>
                                        </fieldset>
                                    </form>

                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn">Cancel</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                        : <div className="p-4">
                            <div className="overflow-x-auto">
                                {interests && interests.length > 0 ? (
                                    <table className="min-w-full table border border-gray-300">
                                        <thead>
                                            <tr className="text-black">
                                                <th className="border p-2">Buyer Name</th>
                                                <th className="border p-2">Quantity</th>
                                                <th className="border p-2">Message</th>
                                                <th className="border p-2">Status</th>
                                                <th className="border p-2">Accept</th>
                                                <th className="border p-2">Reject</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cropInterests.map((inter) => (
                                                <tr key={inter._id} className="hover:bg-gray-50">
                                                    <td className="border p-2">{inter.interestData.userName}</td>
                                                    <td className="border p-2">{inter.interestData.quantity}</td>
                                                    <td className="border p-2">{inter.interestData.message}</td>
                                                    <td className={`border border-black p-2 text-center ${(inter.interestData.status === "pending") && "text-yellow-400 text-xl"
                                                        || (inter.interestData.status === "reject") && "text-red-400 text-xl" ||
                                                        "text-green-400 text-xl"}`
                                                    }>
                                                        {inter.interestData.status}</td>
                                                    <td className="border p-2">
                                                        {(inter.interestData.status === "pending") && <button onClick={() => handleStatus("accept", inter._id, inter.interestData.quantity)}
                                                            className="btn btn-primary w-full">Accept</button> || (inter.interestData.status === "accept") && <h1 className='text-green-400 text-xl'>Accepted</h1> ||
                                                            (inter.interestData.status === "reject") && <h1 className='text-red-400 text-xl'>Rejected</h1>
                                                        }
                                                    </td>
                                                    <td className="border p-2">
                                                        {(inter.interestData.status === "pending") && <button onClick={() => handleStatus("reject", inter._id, inter.interestData.quantity)}
                                                            className="btn btn-primary w-full">Reject</button> || (inter.interestData.status === "accept") && <h1 className='text-green-400 text-xl'>Accepted</h1> ||
                                                            (inter.interestData.status === "reject") && <h1 className='text-red-400 text-xl'>Rejected</h1>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-center text-xl text-gray-500">
                                        No interests yet for this crop.
                                    </p>
                                )}
                            </div>
                        </div>
                }
            </div>
        </>
    );
};

export default SingleCrop;