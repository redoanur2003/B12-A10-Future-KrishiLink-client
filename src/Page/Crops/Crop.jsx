import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import DotLoading from '../../FIrebase/LoadingSpinner/DotLoading';
import { Search } from 'lucide-react';

const Crop = () => {
    const allCrop = useLoaderData();
    console.log(allCrop);
    const [search, setSearch] = useState('');
    const [filteredCrop, setFilteredCrop] = useState(allCrop);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        document.title = "All crop page";
    }, []);

    useEffect(() => {
        setLoader(true);
        const delay = setTimeout(() => {
            const result = allCrop.filter(crop =>
                crop.name.toLowerCase().includes(search.toLowerCase())
            );
            setLoader(false);
            setFilteredCrop(result);
        }, 400);

        return () => clearTimeout(delay);
    }, [search, allCrop]);

    return (
        <>
            <div className='flex flex-col md:flex-row justify-between items-center mt-8 p-3 gap-4'>
                <p className='text-lg'> ({filteredCrop.length}) Crops found</p>

                <div className='flex items-center border-2 border-gray-400 rounded-lg overflow-hidden w-full md:w-1/3'>
                    <Search className='mx-2' />
                    <input type='search' placeholder='Search Game' value={search} onChange={e => setSearch(e.target.value)}
                        className='w-full p-2 outline-none'></input>
                </div>
            </div>

            {loader ? (
                <div className='flex justify-center mt-16'>
                    <DotLoading></DotLoading>
                </div>
            ) : filteredCrop.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 p-3'>
                    {filteredCrop.map(crops =>
                        <Link key={crops._id} to={`/crop/${crops._id}`}>
                            <div className='card grid'>
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
                                </div>
                                <button className='btn bg-green-600'>View details</button>
                            </div>
                        </Link>
                    )}
                </div>) : (
                <h3 className='text-center text-red-500 text-3xl font-semibold mt-12'>No Crop Found</h3>
            )}
        </>
    );
};

export default Crop;