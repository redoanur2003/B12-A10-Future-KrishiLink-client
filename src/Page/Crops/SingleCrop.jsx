import React, { use, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../FIrebase/AuthContext/AuthContext';

const SingleCrop = () => {
    const singleCrop = useLoaderData();
    const { _id: productId } = singleCrop;
    // console.log(singleCrop);
    const { user } = use(AuthContext);
    const interestModalRef = useRef(null);
    const email = user.email;
    // console.log(email);
    const [price, setPrice] = useState();

    const handleInterestModalOpen = () => {
        interestModalRef.current.showModal();
    }

    const handleInterestSubmit = (e) => {
        e.preventDefault();
        const message = e.target.message.value;
        const quantity = e.target.quantity.value;
        const total = e.target.total.value;

        console.log(productId, quantity, message, total)
        // interestModalRef.current.close();

        // const newBid = {
        //     product: productId,
        //     buyer_name: name,
        //     buyer_email: email,
        //     buyer_image: user?.photoURL,
        //     bid_price: bid,
        //     status: 'pending'
        // }

        // fetch('http://localhost:3000/bids', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(newBid)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.insertedId) {
        //             bidModalRef.current.close();
        //             Swal.fire({
        //                 position: "top-end",
        //                 icon: "success",
        //                 title: "Your bid has been placed.",
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             });
        //             // add the new bid to the state
        //             newBid._id = data.insertedId;
        //             const newBids = [...bids, newBid];
        //             newBids.sort((a, b) => b.bid_price - a.bid_price);
        //             setBids(newBids);
        //         }
        //     })

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
                                    {singleCrop.pricePerUnit} {singleCrop.unit}
                                </span>
                                <p className="text-success text-lg font-semibold">Total quantity:</p>
                                <span className="text-lg font-semibold flex items-center gap-1">
                                    {singleCrop.quantity}
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
                                <button
                                    onClick={handleInterestModalOpen}
                                    className="btn btn-primary">Interested this crop</button>
                            </div>

                            <dialog ref={interestModalRef} className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box bg-emerald-300">
                                    <h3 className="font-bold text-lg">Give the best offer!</h3>
                                    <p className="py-4">Offer something seller can not resist</p>
                                    <form onSubmit={handleInterestSubmit}>
                                        <fieldset className="fieldset">
                                            <label className="label">Enter quantity</label>
                                            <input type="text" onChange={(e) => setPrice(e.target.value * singleCrop.pricePerUnit)} name='quantity' placeholder='Enter the number quantity'
                                                defaultValue={1} className="input bg-white" />

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
                        : <div>
                            <h1>User match</h1>
                        </div>
                }
            </div>
        </>
    );
};

export default SingleCrop;