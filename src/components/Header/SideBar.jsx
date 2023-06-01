import React, { useState } from "react";
// import "./Sidebar.css";
import Logo from "../../assets/logo-color2.png";
// import { UilSignOutAlt } from "@iconscout/react-unicons";
// import { SidebarData } from "../Data/data";
// import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BiCart, BiHeart, BiLogInCircle, BiMenu } from 'react-icons/bi'
import { VscAccount } from "react-icons/vsc"
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/wishlist";
import { useSelector } from "react-redux";


const Sidebar = ({ active, expanded, SidebarData }) => {
    const [selected, setSelected] = useState(active ?? 0);
    const [openCart, setOpenCart] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const navigate = useNavigate()
    const sidebarVariants = {
        true: {
            left: '0'
        },
        false: {
            left: '-60%'
        }
    }

    const handleNavClick = (item) => {
        setSelected(item?.id)
        navigate(item?.navigateTo);

    }


    return (
        <>
            <motion.div className='sidebar'
                variants={sidebarVariants}
                animate={window.innerWidth <= 768 ? `${expanded}` : ''}
            >
                {/* logo */}
                <div className="logo">
                    <img src={Logo} alt="logo" />
                </div>

                <div className="menu">
                    {SidebarData.map((item, index) => {
                        return (

                            <div
                                className={selected === item.id ? "menuItem active" : "menuItem"}
                                key={index}
                                onClick={() => handleNavClick(item)}
                            >
                                <item.icon className="text-xl" />
                                {/* <span className="material-symbols-outlined">{item.icon}</span> */}
                                <span>{item.heading}</span>
                            </div>
                        );
                    })}
                    <div className="menu">
                        <div className="">
                            {isAuthenticated ? (
                                <Link className="flex mx-7 gap-2 text-gray-800" to="/profile">
                                    {user && user.avatar ? <img
                                        src={user?.avatar}
                                        className="w-[22px] h-[22px] rounded-full"
                                        alt=""
                                    /> : <VscAccount   size={20} />}
                                    <span>My profile</span>
                                </Link>
                            ) : (
                                <Link className="flex mx-7 gap-2 text-gray-800" to="/login">
                                    <BiLogInCircle size={25} />
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>
                        <div className="menuItem"
                            onClick={() => setOpenWishlist(true)}
                        >
                            <BiHeart className="text-xl" />
                            <span>Wishlist</span>
                        </div>
                        <div className="menuItem"
                            onClick={() => setOpenCart(true)}
                        >
                            <BiCart className="text-xl" />
                            <span>Cart</span>
                        </div>

                        <div></div>
                    </div>
                    {/* cart popup */}
                    {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

                    {/* wishlist popup */}
                    {openWishlist ? (
                        <Wishlist setOpenWishlist={setOpenWishlist} />
                    ) : null}
                </div>
            </motion.div>
            {/* <Outlet /> */}
        </>
    );
};

export default Sidebar;
