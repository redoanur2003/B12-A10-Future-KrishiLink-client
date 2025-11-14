import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const Root = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <NavBar></NavBar>
            <div className='grow'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;