import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import Header from "../components/Header/Header";
import Loader from "../components/Loader";
import { Outlet, Route, Routes } from "react-router-dom"

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="AppGlass">
            <ProfileSidebar active={active} setActive={setActive} />
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
