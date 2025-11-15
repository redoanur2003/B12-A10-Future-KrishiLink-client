import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLoaderData } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
    const latest = useLoaderData();
    // console.log(latest);
    const [crop, setCrop] = useState([]);
    const [news, setNews] = useState([]);

    useEffect(() => {
        document.title = "Home page";
    }, []);

    useEffect(() => {
        fetch('https://krishi-api-server.vercel.app/crop')
            .then(res => res.json())
            .then(data => setCrop(data));

        fetch('https://krishi-api-server.vercel.app/news')
            .then(res => res.json())
            .then(data => setNews(data))
    }, [])

    const SampleNextArrow = ({ onClick }) => (
        <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-accent text-white p-2 rounded-full shadow-md hover:scale-110 transition"
            onClick={onClick}
        >
            <ArrowRight></ArrowRight>
        </div>
    );

    const SamplePrevArrow = ({ onClick }) => (
        <div
            className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-accent text-white p-2 rounded-full shadow-md hover:scale-110 transition"
            onClick={onClick}
        >
            <ArrowLeft></ArrowLeft>
        </div>
    );

    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <>
            <h1 className="text-center p-2 font-extrabold text-2xl md:text-4xl lg:text-5xl leading-tight text-green-700">
                Welcome to KrishiLink — discover and connect with fresh crops.
            </h1>

            <div className='mt-3'>
                <Slider {...settings}>
                    {crop.map(info =>
                        <div key={info._id} className='relative left-2'>
                            <img className='h-[140px] md:h-[350px] w-full md:w-full object-cover rounded-lg' src={info.image} alt={info.name} />
                            <div className=' bottom-1 md:bottom-6 left-1 md:left-6 absolute flex gap-3 px-4 py-0 md:py-2 rounded'>
                                <div className='bg-black rounded-2xl p-3'>
                                    <h2 className='text-xs md:text-2xl text-white font-semibold'>{info.name}</h2>
                                    <p className='text-[10px] md:text-sm text-gray-300'>{info.type}</p>
                                </div>
                                <div className='bg-black rounded-2xl p-3'>
                                    <p className='text-[10px] md:text-xl text-gray-300'>{info.location}</p>
                                    <p className='text-[10px] md:text-sm text-gray-300'>{info.description}</p>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </Slider>
            </div>

            <h1 className='text-4xl p-2 text-center font-black'>Here the latest crops are posted.</h1>

            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 p-3'>
                {latest.map(crops =>
                    <NavLink key={crops._id} to={`/crop/${crops._id}`}>
                        <div className='card'>
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

                        </div>
                    </NavLink>
                )}
            </div>
            <div className='flex justify-center'>
                <NavLink to={'/crop'}><button className={`flex btn btn-primary`}>View All <ArrowRight></ArrowRight></button></NavLink>
            </div>

            <h1 className='text-4xl p-2 text-center font-black'>How KrishiLink Works.</h1>
            <section className="m-3">

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">

                    <p className="flex items-center gap-2 border-2 px-4 py-2 rounded-2xl">
                        Latest crop at home <ArrowRight />
                    </p>

                    <p className="flex items-center gap-2 border-2 px-4 py-2 rounded-2xl">
                        Explore and Search Crops <ArrowRight />
                    </p>

                    <p className="flex items-center gap-2 border-2 px-4 py-2 rounded-2xl">
                        Buyer Can Send Interest with Quantity & Message <ArrowRight />
                    </p>
                    <p className="flex items-center gap-2 border-2 px-4 py-2 rounded-2xl">
                        User Can Post Their Crop <ArrowRight />
                    </p>

                    <p className="flex items-center gap-2 border-2 px-4 py-2 rounded-2xl">
                        Crop Owner Reviews Requests <ArrowRight />
                    </p>

                    <p className="flex items-center gap-2 border-2 px-4 py-2 rounded-2xl">
                        Owner Accepts or Rejects Interest <ArrowRight />
                    </p>

                    <p className="flex items-center gap-2 border-2 px-4 py-2 rounded-2xl">
                        Buyer can see there Interest <ArrowRight />
                    </p>

                    <p className="flex items-center gap-2 border-2 px-4 py-2 rounded-2xl">
                        Before sending interest or manage crop visitor need to login <ArrowRight />
                    </p>
                    <p className="flex items-center gap-2 border-2 px-4 py-2 rounded-2xl">
                        User can update there profile also <ArrowRight />
                    </p>

                </div>
            </section>

            <h1 className='text-4xl p-2 text-center font-black'>Agro News or Blogs</h1>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 p-3'>
                {news.map(crops =>
                    <div key={crops._id} className='card'>
                        <Link to="https://www.bssnews.net/agriculture-news">
                            <div className="p-1">
                                <img
                                    className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-xl"
                                    src={crops.image}
                                    alt={crops.name}
                                />
                            </div>
                            <div className="p-1 text-sm sm:text-base">
                                <p className="font-medium">{crops.title}</p>
                                <div className='flex justify-between'>
                                    <p className="text-gray-600">{crops.category}</p>
                                    <p className="text-black font-bold">Author: {crops.author}</p>
                                    <p className="text-gray-600">Publish: {crops.postedDate}</p>
                                </div>
                                <div className=' border-amber-50 border-2 p-1'>
                                    <h3>{crops.summary}</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>

            <section className="mt-12 px-4">
                <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Why Choose KrishiLink?</h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

                    <div className="p-4 border rounded-xl shadow-sm hover:shadow-md transition">
                        <h3 className="font-semibold mb-2">Direct Farmer to Buyer</h3>
                        <p className="text-gray-600 text-sm">
                            No middleman — buyers connect directly with farmers and get fresh products at fair prices.
                        </p>
                    </div>

                    <div className="p-4 border rounded-xl shadow-sm hover:shadow-md transition">
                        <h3 className="font-semibold mb-2">Transparent Pricing</h3>
                        <p className="text-gray-600 text-sm">
                            Farmers set their own prices, and buyers can view all details clearly before showing interest.
                        </p>
                    </div>

                    <div className="p-4 border rounded-xl shadow-sm hover:shadow-md transition">
                        <h3 className="font-semibold mb-2">Smart & Easy to Use</h3>
                        <p className="text-gray-600 text-sm">
                            Very simple for posting crops, searching, sending interest, and managing posts.
                        </p>
                    </div>

                </div>
            </section>


        </>
    );
};

export default Home;