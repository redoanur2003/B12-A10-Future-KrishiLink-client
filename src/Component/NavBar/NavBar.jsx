import { use, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, X } from 'lucide-react';
import image from '../../assets/images.jpeg'
import { AuthContext } from '../../FIrebase/AuthContext/AuthContext';


const NavBar = () => {
    const [state, setState] = useState(false);
    const { user, logOut } = use(AuthContext);
    // console.log(user);

    const handleSignOut = () => {
        logOut()
            .then(result => {
                console.log('Sign out successful,', result)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <nav className="p-4 flex bg-linear-to-br from-[#198852] to-[#28dc58] justify-between items-center">
            <div>
                <NavLink to="/"><div className="flex items-center gap-x-2">
                    <img className="w-10 h-10 rounded-full" src={image} alt="PageLogo" />
                    <h1 className="text-xl text-white font-bold">KL-FG&CP</h1>
                </div>
                </NavLink>
                <div className="md:hidden relative" onClick={() => setState(!state)}>
                    {state ? <X></X> : <Menu></Menu>}


                    {user ?
                        <ul
                            className={`absolute bg-white rounded-lg p-2 shadow-lg duration-1000 ${state ? 'grid grid-cols-3 w-[200px] h-24 text-xs' : 'hidden'}`}>
                            <li className="hover:text-cyan-300 hover:underline">
                                <NavLink to="/">Home</NavLink></li>

                            <li className="hover:text-cyan-300 hover:underline">
                                <NavLink to="/crop">All Crops</NavLink></li>

                            <li className="hover:text-cyan-300 hover:underline">
                                <NavLink to="/profile">Profile</NavLink></li>

                            <li className="hover:text-cyan-300 hover:underline">
                                <NavLink to="/addCrop">Add Crop</NavLink></li>

                            <li className="hover:text-cyan-300 hover:underline">
                                <NavLink to="/myPost">My Post</NavLink></li>

                            <li className="hover:text-cyan-300 hover:underline">
                                <NavLink to="/myInterests">My Interest</NavLink></li>

                        </ul>
                        :
                        <ul
                            className={`absolute bg-white rounded-lg p-2 shadow-lg duration-1000 ${state ? 'grid grid-cols-3 w-[200px] h-24 text-xs' : 'hidden'}`}>
                            <li className="hover:text-cyan-300 hover:underline">
                                <NavLink to="/">Home</NavLink></li>

                            <li className="hover:text-cyan-300 hover:underline">
                                <NavLink to="/crop">All Crops</NavLink></li>
                        </ul>
                    }

                </div>
            </div>

            <div className="flex items-center">

                {user ?
                    <ul className="hidden md:flex text-white gap-6">
                        <li className="hover:text-cyan-300 hover:underline">
                            <NavLink to="/">Home</NavLink></li>

                        <li className="hover:text-cyan-300 hover:underline">
                            <NavLink to="/crop">All Crops</NavLink></li>

                        <li className="hover:text-cyan-300 hover:underline">
                            <NavLink to="/addCrop">Add Crop</NavLink></li>

                        <li className="hover:text-cyan-300 hover:underline">
                            <NavLink to="/myPost">My Post</NavLink></li>

                        <li className="hover:text-cyan-300 hover:underline">
                            <NavLink to="/myInterests">My Interest</NavLink></li>

                        <li className="hover:text-cyan-300 hover:underline">
                            <NavLink to="/profile">Profile</NavLink></li>
                    </ul>
                    :
                    <ul className="hidden md:flex text-white gap-6">
                        <li className="hover:text-cyan-300 hover:underline">
                            <NavLink to="/">Home</NavLink></li>

                        <li className="hover:text-cyan-300 hover:underline">
                            <NavLink to="/crop">All Crops</NavLink></li>
                    </ul>
                }

            </div>

            <div>
                {user ? <button onClick={handleSignOut} className='btn btn-primary'>Sign Out</button> :
                    <div className='flex gap-3'>
                        <Link to='/login'><button className='btn btn-primary'>Login</button></Link>
                        <Link to='/register'><button className='btn btn-primary'>Register</button></Link>
                    </div>}
            </div>
        </nav>
    );
};

export default NavBar;
