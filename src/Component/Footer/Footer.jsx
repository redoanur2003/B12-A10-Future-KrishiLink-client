import React from 'react';
import image from '../../assets/images.jpeg'
import { NavLink } from 'react-router';
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-white text-black border-2 border-b-blue-500 items-center p-4">
                <aside className="grid-flow-col items-center">
                    <NavLink to="/"><div className="flex items-center gap-x-2">
                        <img className="w-10 h-10 rounded-full" src={image} alt="PageLogo" />
                        <h1 className="text-xl font-bold">KL-FG&CP</h1>
                    </div>
                    </NavLink>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </aside>
                <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                    <a>
                        {/* <Instagram size={40}></Instagram> */}
                        <FaInstagram size={30}></FaInstagram>
                        <p>Instagram</p>
                    </a>
                    <a>
                        <FaXTwitter size={30}></FaXTwitter>
                        <p className='text-center text-xl font-bold'>X.com</p>
                    </a>
                    <a>
                        <FaFacebook size={30}></FaFacebook>
                        <p>Facebook</p>
                    </a>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;