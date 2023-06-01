import React from "react";
// import { motion } from "framer-motion";
// import "./home.css"
import backgroundImage from "../../assets/imgs/bg-img.jpg";
import { Link } from "react-router-dom";

const heroStyles = {
    container: "relative h-[400px] w-full bg-cover bg-center text-white rounded-xl shadow-md ",
    purpleButton: "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-100/10 dark:shadow-lg dark:shadow-purple-100/10 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2"
}

const Hero = () => {
    return (
        <div className={heroStyles.container} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="flex items-center  h-full">
                <div className="min-h-fit ml-10">
                    <h1 className="text-3xl pt-2 bold">Welcome to My Website</h1>
                    <p className="pt-2 pb-2 text-gray-400">Discover amazing things with us!</p>

                    <Link to={'/products'}>
                        <button type="button" className={`${heroStyles.purpleButton} w-[200px]`}>Shop</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;
