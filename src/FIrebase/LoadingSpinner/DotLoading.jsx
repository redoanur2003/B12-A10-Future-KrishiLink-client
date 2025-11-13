import React from 'react';
import { DotLoader } from 'react-spinners';

const DotLoading = () => {
    return (
        <div className='flex justify-center items-center'>
            <DotLoader></DotLoader>
        </div>
    );
};

export default DotLoading;