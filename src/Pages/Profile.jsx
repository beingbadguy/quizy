import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../Context/Context";

const Profile = () => {
  const { user, logout } = useContext(MyContext);
  const navigate = useNavigate();
  const [file, setFile] = useState();
  console.log(file);

  return (
    <div className="min-h-[85vh] m-4">
      <div className="flex items-center gap-2">
        <img
          src="https://img.icons8.com/?size=100&id=89346&format=png&color=000000"
          alt=""
          className="h-6 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        <p className="">Account</p>
      </div>
      <div className="mx-48">
        <div className="flex items-center justify-between  ">
          <div className="flex justify-center items-center gap-1">
            <img
              src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
              alt=""
              className="h-16"
            />
            <div>
              <div className="flex items-center ">
                <p className="uppercase font-bold text-xl">{user?.name}</p>
                {/* <img
                src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"
                alt=""
                className="h-5
                "
              /> */}
              </div>

              <div className="flex items-center gap-1 ">
                <p>Active</p>
                <div className="h-1 w-1 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div
              className="border  text-center rounded-[3px] shadow-sm cursor-pointer flex items-center justify-center gap-1 font-bold hover:bg-red-100 hover:border-red-500 px-2 text-gray-500"
              onClick={logout}
            >
              <p>Logout</p>
              <img
                src="https://img.icons8.com/?size=100&id=2445&format=png&color=000000"
                alt=""
                className="h-3"
              />
            </div>
            <div className="border  text-center rounded-[3px] shadow-sm cursor-pointer flex items-center justify-center gap-1 font-bold hover:bg-green-100 hover:border-green-500 px-2 text-gray-500 overflow-hidden relative">
              <input
                type="file"
                accept="image/*"
                className="absolute overflow-hidden opacity-0"
                onChange={async (e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <p>Edit</p>
              <img
                src="https://img.icons8.com/?size=100&id=sKp0dy2A108d&format=png&color=000000"
                alt=""
                className="h-4"
              />
            </div>
          </div>
        </div>
        <hr className="my-4 border-1 border-gray-300" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img
              src="https://img.icons8.com/?size=100&id=71210&format=png&color=000000"
              alt=""
              className="h-5"
            />
            <p className="font-bold w-[140px]">Rank</p>
            <p>{user?.rank}</p>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://img.icons8.com/?size=100&id=84093&format=png&color=000000"
              alt=""
              className="h-5"
            />
            <p className="font-bold w-[140px]">Points</p>
            <p>{user?.points}</p>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
              alt=""
              className="h-5"
            />
            <p className="font-bold w-[140px]">User ID</p>
            <p>{user?.user_id}</p>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://img.icons8.com/?size=100&id=123387&format=png&color=000000"
              alt=""
              className="h-5"
            />
            <p className="font-bold w-[140px]">User Name</p>
            <p>{user?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://img.icons8.com/?size=100&id=499&format=png&color=000000"
              alt=""
              className="h-5"
            />
            <p className="font-bold w-[140px]">Email Address</p>
            <p>{user?.email}</p>
          </div>
        </div>
        <hr className="my-4 border-1 border-gray-300" />
        <div className="flex justify-between items-center">
          <div>created quiz will be shown here</div>
          <div>Calendar with days online will be shown here</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
