import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import axios from "axios";
import { server } from "../../ServerConfigs";
import { toast } from "react-toastify";
import { motion } from "framer-motion"
import { useMediaQuery } from "react-responsive";
import avatrImg from "../../assets/avatrImg.jpg"
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'


const sidebarData = [
  { icon: RxPerson, label: "Profile", index: 1, path: '/profile' },
  { icon: HiOutlineShoppingBag, label: "Orders", index: 2, path: 'orders' },
  { icon: HiOutlineReceiptRefund, label: "Refunds", index: 3, path: 'refunds' },
  // { icon: AiOutlineMessage, label: "Inbox", index: 4, path: 'inbox' },
  // { icon: MdOutlineTrackChanges, label: "Track Order", index: 5, path: 'track-order' },
  { icon: RiLockPasswordLine, label: "Change Password", index: 6, path: 'change-password' },
  { icon: TbAddressBook, label: "Address", index: 7, path: 'address' },
  // {icon: MdOutlineAdminPanelSettings, label: "Admin Dashboard", index: 8,},
  { icon: AiOutlineLogin, label: "Log out", index: 8, path: 'logout' },
];

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [expanded, setExpaned] = useState(!isMobile)
  const [selected, setSelected] = useState(active ?? 0);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleItemClick = (index) => {
    setActive(index);
    setSidebarOpen(false);
  };

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);

      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  }


  const handleNavClick = (item, index) => {
    setSelected(item.index)
    if (item.path === 'logout') {
      logoutHandler();
    }
    else navigate(`${item.path}`)

  }



  return (
    <>
      <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpaned(!expanded)}>
        <span > {expanded ? <AiOutlineDoubleLeft className="text-xl" /> : <AiOutlineDoubleRight className="text-xl" />}</span>
      </div>
      <motion.div className='sidebar w-[200px]'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* logo */}
        <div className="logo">
          <img
            src={user?.avatar ? user?.avatar : avatrImg}
            className="w-[80px] rounded-full"
            alt=""
          />
        </div>

        <div className="menu">
          {sidebarData.map((item, index) => {
            return (

              <button
                className={selected === item.index ? "menuItem profileActive" : "menuItem"}
                key={index}
                onClick={() => handleNavClick(item, index)}
              >

                <item.icon className="text-xl" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};


export default ProfileSidebar;
