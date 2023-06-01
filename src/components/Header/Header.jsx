import React, { useState } from 'react'
import logo from '../../assets/logo-color1.png'
import logo1 from '../../assets/logo1.png'
import { BiSearchAlt2, BiCart, BiHeart, BiMenu } from 'react-icons/bi';
import { VscAccount, VscClose } from 'react-icons/vsc';
import './Header.css'
import { useMediaQuery } from 'react-responsive';
import Sidebar from './SideBar';
import { Link } from 'react-router-dom';
import { SidebarData } from '../Data/data';
import { useSelector } from 'react-redux';
import Cart from '../Cart/Cart';
import styles from '../Styles/styles';
import Wishlist from '../Wishlist/wishlist';


const headerData = SidebarData;

const SideBarContainer = ({ activeLink }) => {
  const [expanded, setExpaned] = useState(false)
  return (
    <div>
      <div className='flex justify-between  border p-5'>
        <div className='rounded-full overflow-hidden w-[100px]'>
          <img src={logo1} alt="Logo" width='100px' />
        </div>
        <div style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpaned(!expanded)}>
          <span > {expanded ? <VscClose className="text-xl" /> : <BiMenu className="text-xl" />}</span>
        </div>
      </div>
      <Sidebar SidebarData={SidebarData} active={activeLink} expanded={expanded} />
    </div>
  )
}



const NavBarContainer = ({ setactiveLink}) => {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [openCart, setOpenCart] = useState(false);


  return (
    <div className="flex justify-end  pl-5 pt-2 pb-2 bg-white border  sm:justify-between">
      <div className='flex w-[60%] justify-between items-center' >
        <div className='rounded-full overflow-hidden w-[80px]'>
          <img src={logo} alt="Logo" width='80px' />
        </div>
        <div className='hidden sm:flex list-none nav-items' >
          {headerData.map((item) => (
            <Link key={item.id} to={item.navigateTo} onClick={() => setactiveLink(item.id)} >
              <li className='text-xl pl-2'>{item.heading}</li>
            </Link>
          ))}

        </div>
      </div>
      <div className='hidden sm:flex text-xl nav-icons-right items-center mr-5'>
        <div>
          {isAuthenticated ? (
            <Link to="/profile">
              {user && user.avatar ? <img
                src={user?.avatar}
                className="w-[40px] h-[40px] rounded-full"
                alt=""
              /> : <VscAccount size={30}  />}
            </Link>
          ) : (
            <Link to="/login">
              <BiLogInCircle size={30}  />
            </Link>
          )}
        </div>
        <div className={`${styles.noramlFlex}`}>
          <div
            className="relative cursor-pointer mr-[15px]"
            onClick={() => setOpenWishlist(true)}
          >
            <BiHeart size={30} />
            <span className={styles.cartDotSuffix} >
              {wishlist && wishlist.length}
            </span>
          </div>
        </div>

        <div className={`${styles.noramlFlex}`}>
          <div
            className="relative cursor-pointer mr-[15px]"
            onClick={() => setOpenCart(true)}
          >
            <BiCart
              size={30}
            />
            <span className={styles.cartDotSuffix}>
              {cart && cart.length}
            </span>
          </div>
        </div>
      </div>
      {/* cart popup */}
      {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

      {/* wishlist popup */}
      {openWishlist ? (
        <Wishlist setOpenWishlist={setOpenWishlist} />
      ) : null}
    </div>
  )
}

const Header = ({ active }) => {
  const [activeLink, setactiveLink] = useState(active || 0);
  const [opened, setopened] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });


  return (
    <div>
      {isMobile ? (<SideBarContainer activeLink={activeLink}  />) : (<NavBarContainer setactiveLink={setactiveLink}/>)}
    </div>
  )
}

export default Header
