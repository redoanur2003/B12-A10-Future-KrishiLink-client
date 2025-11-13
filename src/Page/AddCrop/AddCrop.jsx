import React, { use } from 'react';
import { AuthContext } from '../../FIrebase/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { formatISO } from "date-fns";

const AddCrop = () => {

    const { user } = use(AuthContext);
    console.log(user);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const cropName = e.target.crop.value;
        const cropType = e.target.type.value;
        const price = e.target.pricePerUnit.value;
        const units = e.target.unit.value;
        const quantitys = e.target.quantity.value;
        const locations = e.target.location.value;
        const descriptions = e.target.description.value;
        const images = e.target.image.value;
        if (!cropName && !cropType && !price && !units && !quantitys && !locations && !descriptions && !images) {
            Swal.fire({
                position: "top-end",
                icon: "Can not post!!!",
                title: "Fill all the field",
                showConfirmButton: true,
                timer: 1500
            });
        }

        console.log(`${cropName} ${cropType} ${price} ${units} ${quantitys} ${locations} ${descriptions} ${images}`)

        const newCrop = {
            name: cropName,
            type: cropType,
            pricePerUnit: price,
            unit: units,
            quantity: quantitys,
            description: descriptions,
            location: locations,
            image: images,
            cropsAddedTime: formatISO(new Date()),
            owner: {
                ownerEmail: user.email,
                ownerName: user.displayName,
            },
        };


        fetch('http://localhost:1212/crop', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCrop)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "Successfully post",
                        title: "See at my post",
                        showConfirmButton: true,
                        timer: 1500
                    });

                    navigate('/myPost');
                }
            })

    }
    return (
        <>
            <h1 className='text-2xl text-center font-bold text-green-500'>Here you can post new crop in this application.</h1>

            <div className="hero min-h-screen bg-green-300">
                <div className="hero-content flex-col lg:flex-col w-full px-4">
                    <h1 className="text-2xl font-semibold text-center mb-4">
                        Add Crop Information Here
                    </h1>

                    <div className="card w-full max-w-2xl border-2 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <fieldset className="fieldset space-y-4">
                                    {/* Crop Name */}
                                    <div>
                                        <label className="label text-black text-xl font-medium">Name</label>
                                        <input
                                            type="text"
                                            name="crop"
                                            placeholder="Enter crop name"
                                            className="input input-bordered bg-white w-full"
                                            required
                                        />
                                    </div>

                                    {/* Type */}
                                    <div>
                                        <label className="label text-black text-xl font-medium">Type</label>
                                        <select
                                            name="type"
                                            className="select select-bordered bg-white w-full"
                                            required
                                        >
                                            <option value="">Select type</option>
                                            <option value="Vegetable">Vegetable</option>
                                            <option value="Fruit">Fruit</option>
                                            <option value="Grain">Grain</option>
                                        </select>
                                    </div>

                                    {/* Price Per Unit */}
                                    <div>
                                        <label className="label text-black text-xl font-medium">Price per Unit</label>
                                        <input
                                            type="number"
                                            name="pricePerUnit"
                                            placeholder="Enter price"
                                            className="input input-bordered bg-white w-full"
                                            required
                                        />
                                    </div>

                                    {/* Unit */}
                                    <div>
                                        <label className="label text-black text-xl font-medium">Unit</label>
                                        <select
                                            name="unit"
                                            className="select select-bordered bg-white w-full"
                                            required
                                        >
                                            <option value="">Select unit</option>
                                            <option value="kg">kg</option>
                                            <option value="ton">ton</option>
                                            <option value="bag">bag</option>
                                        </select>
                                    </div>

                                    {/* Estimated Quantity */}
                                    <div>
                                        <label className="label text-black text-xl font-medium">Estimated Quantity</label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            placeholder="Enter quantity"
                                            className="input input-bordered bg-white w-full"
                                            required
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="label text-black text-xl font-medium">Description</label>
                                        <textarea
                                            name="description"
                                            placeholder="Short details about the crop"
                                            className="textarea textarea-bordered bg-white w-full"
                                            rows="3"
                                        ></textarea>
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="label text-black text-xl font-medium">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="Where the crop is grown"
                                            className="input input-bordered bg-white w-full"
                                            required
                                        />
                                    </div>

                                    {/* Image */}
                                    <div>
                                        <label className="label text-black text-xl font-medium">Image</label>
                                        <input
                                            type="text"
                                            name='image'
                                            placeholder="Add image URL"
                                            className="input input-bordered bg-white w-full"
                                            required
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="text-center pt-3">
                                        <button
                                            type="submit"
                                            className="btn btn-success text-white w-full"
                                        >
                                            Submit Crop
                                        </button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default AddCrop;