import React, { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../../FIrebase/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const MyPost = () => {
    const { user } = useContext(AuthContext);
    const email = user.email;
    const [myCrop, setMyCrop] = useState([]);
    const [editCrop, setEditCrop] = useState({});
    const editModalRef = useRef(null);
    const [editId, setEditId] = useState("");
    useEffect(() => {
        document.title = "My post page";
    }, []);

    useEffect(() => {
        fetch(`http://localhost:1212/myPost?email=${email}`)
            .then(res => res.json())
            .then(data => setMyCrop(data));
    }, [email]);

    const handleDelete = (id) => {
        // console.log(id);
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Are you want to delete the post.",
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:1212/crop/${id}`, {
                        method: 'delete'
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log("after delete", data);
                            if (data.deletedCount) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "The post successfully remove.",
                                    showConfirmButton: true,
                                    timer: 1500
                                })
                                const filterData = myCrop.filter(user => user._id !== id);
                                setMyCrop(filterData);
                            }

                        })
                }

            });

    }

    const handleModalOpen = (id) => {
        editModalRef.current.showModal();
        setEditId(id);
        const f = myCrop.find(data => data._id === id);
        setEditCrop(f);
    }

    const handleCropUpdateSubmit = (e) => {
        e.preventDefault();

        // const cropName = e.target.crop.value;
        // const cropType = e.target.type.value;
        // const price = e.target.price.value;
        // const units = e.target.unit.value;
        // const quantitys = e.target.quantity.value;
        // const locations = e.target.location.value;
        // const descriptions = e.target.description.value;
        // const images = e.target.image.value;
        // console.log(`${cropName} ${cropType} ${price} ${units} ${quantitys} ${locations} ${descriptions} ${images}`)
        // e.target.reset();

        const updateCrop = {
            cropName: e.target.crop.value,
            cropType: e.target.type.value,
            price: e.target.price.value,
            unit: e.target.unit.value,
            quantitys: e.target.quantity.value,
            locations: e.target.location.value,
            descriptions: e.target.description.value,
            images: e.target.image.value
        }

        fetch(`http://localhost:1212/crop/${editId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateCrop)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    editModalRef.current.close();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Crops details update successful",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    fetch(`http://localhost:1212/crop/${editId}`)
                        .then(res => res.json())
                        .then(data => {
                            setMyCrop(prev =>
                                prev.map(crop =>
                                    crop._id === editId ? { ...crop, ...data } : crop
                                )
                            );
                        });
                }
            })

    }

    return (
        <>
            <div className="p-4">
                {myCrop.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table border border-gray-300">
                            <thead className="">
                                <tr className='text-black'>
                                    <th className="border p-2">Image</th>
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Type</th>
                                    <th className="border p-2">Price</th>
                                    <th className="border p-2">Quantity</th>
                                    <th className="border p-2">Edit</th>
                                    <th className="border p-2">Remove Post</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myCrop.map(crop => (
                                    <tr key={crop._id} className="hover:bg-gray-50">
                                        <td className="border p-2 flex justify-center">
                                            <img src={crop.image} alt={crop.name} className="w-full h-20 object-cover rounded" />
                                        </td>
                                        <td className="border p-2">{crop.name}</td>
                                        <td className="border p-2">{crop.type}</td>
                                        <td className="border p-2">{crop.pricePerUnit}</td>
                                        <td className="border p-2">{crop.quantity}</td>
                                        <td className="border p-2 items-center">
                                            <button onClick={() => handleModalOpen(crop._id)} className='btn btn-primary w-full'>Edit</button>
                                        </td>
                                        <td className="border px-5">
                                            <div onClick={() => handleDelete(crop._id)}>
                                                <button className='btn btn-primary w-full'>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center text-2xl mt-8">
                        <h1>You haven't posted any crops yet.</h1>
                    </div>
                )}
            </div>

            <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-emerald-300">
                    <h3 className="font-bold text-center text-lg">Update your crops information</h3>
                    <form onSubmit={handleCropUpdateSubmit}>
                        <fieldset className="fieldset text-xl font-bold">
                            <label className="label">Crop name</label>
                            <input type="text" name='crop'
                                defaultValue={editCrop.name} className="input w-full bg-white" />
                            <label className="label">Type</label>
                            <select
                                name="type"
                                className="select select-bordered bg-white w-full"
                            >
                                <option >Select</option>
                                <option >Vegetable</option>
                                <option >Fruit</option>
                                <option>Grain</option>
                            </select>

                            <label className="label">Price </label>
                            <input type="text" name='price' className="input w-full bg-white"
                                defaultValue={editCrop.pricePerUnit}
                            />
                            <label className="label">Unit </label>
                            <select
                                name="unit"
                                className="select select-bordered w-full bg-white"
                            >
                                <option >Select</option>
                                <option >kg</option>
                                <option >ton</option>
                                <option >bag</option>
                                <option >piece</option>
                            </select>

                            <label className="label">Quantity </label>
                            <input type="text" name='quantity' className="input w-full bg-white"
                                defaultValue={editCrop.quantity}
                            />
                            <label className="label">Location </label>
                            <input type="text" name='location' className="input w-full bg-white"
                                defaultValue={editCrop.location}
                            />
                            <label className="label">Description</label>
                            <textarea type="text" className="input w-full p-1 bg-white" name='description' defaultValue={editCrop.description} />
                            <label className="label">Image </label>
                            <input type="text" name='image' className="input w-full bg-white"
                                defaultValue={editCrop.image}
                            />

                            <button className="btn btn-primary mt-4">Update the crop data</button>
                        </fieldset>
                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default MyPost;
