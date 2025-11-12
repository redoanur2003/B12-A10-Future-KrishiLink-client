import React from 'react';
import { RingLoader } from 'react-spinners';

const LoadingSpinner = () => {
    return (
        <div className='flex justify-center items-center'>
            <RingLoader></RingLoader>
        </div>
    );
};

export default LoadingSpinner;