import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MyContext } from "../Context/Context";
import logo from "../../public/logo.svg";
import ClipLoader from "react-spinners/ClipLoader";

const Layout = () => {
  const { logout, user, dp, setDp } = useContext(MyContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const subscribe = setInterval(() => {
      setLoading(false);
    }, 500);
    return () => clearInterval(subscribe);
  }, [location.pathname]);

  return (
    <div>
      <div className="flex justify-between items-center px-4 my-3  ">
        <div
          className="flex items-center  cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="" />
          <p className="text-2xl font-bold text-[#343131]">uizy</p>
        </div>

        <div className="cursor-pointer">
          <img
            src={
              user && dp
                ? dp
                : "https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
            }
            alt=""
            className="h-8 w-8 object-cover rounded-full"
            onClick={() => {
              if (user) {
                navigate("/profile");
              } else {
                navigate("/signup");
              }
            }}
          />
        </div>
      </div>
      <hr className="border border-red-100" />
      {loading && loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-50">
          <ClipLoader />
          {/* <PacmanLoader /> */}
        </div>
      ) : (
        <Outlet />
      )}
      <hr />
      <p
        className={`${
          loading ? "hidden" : ""
        } p-4 bg-white text-center text-black font-bold flex flex-col`}
      >
        Made by Amann @2024
      </p>
    </div>
  );
};

export default Layout;
