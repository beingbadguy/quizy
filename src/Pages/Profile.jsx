import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../Context/Context";
import { db, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  QuerySnapshot,
  updateDoc,
} from "firebase/firestore";

const Profile = () => {
  const { user, logout, dp, setDp } = useContext(MyContext);
  // console.log(user.profile_picture);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState();
  // console.log(dp);

  const uploadImage = async (file) => {
    if (!file) {
      return console.log("You have no file to upload");
    }
    // console.log(file?.name);
    const storageRef = ref(storage, `images/${file?.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(snapshot.ref);
      // console.log(downloadURL);

      const docRef = doc(db, "users", user.user_id);
      await updateDoc(docRef, {
        profile_picture: downloadURL,
      });
      setDp(downloadURL);
      // window.location.reload();
    } catch (error) {
      console.error("Upload failed", error);
      throw error;
    }
  };
  useEffect(() => {}, [dp, setDp]);
  const [allTest, setAllTest] = useState();
  const [thisUserTest, setThisUserTest] = useState();

  const fetchQuizById = async () => {
    try {
      const ref = collection(db, "attempted_quiz");
      const docSnap = await getDocs(ref);

      const documents = docSnap.docs.map((doc) => ({
        id: doc.id, // Get the document ID
        ...doc.data(), // Spread the document data
      }));

      // console.log(documents);
      setAllTest(documents);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchQuizById();
  }, []);

  const filterById = allTest?.filter((test) => {
    return test.user_id === user.user_id;
  });
  // console.log(filterById);

  useEffect(() => {
    setThisUserTest(filterById);
  }, [allTest]);

  // const timeArray = "091024 23:27:15".split(" ");
  // const date = timeArray[0];
  // const time = timeArray[1];
  // console.log(date.slice(0, 2));
  // console.log(date.slice(2, 4));
  // console.log(date.slice(4, 6));

  // console.log(date);
  // console.log(time);

  return (
    <div className="min-h-[85vh] m-4 mb-10">
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
      <div className="mt-4 lg:mx-48">
        <div className="flex items-center justify-between  ">
          <div className="flex justify-center items-center gap-2">
            <img
              src={
                user && dp
                  ? dp
                  : "https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
              }
              alt=""
              className="h-16 w-16 object-cover rounded-full"
            />
            <div>
              <div className="flex items-center ">
                <p className="uppercase font-bold text-xl ">{user?.name}</p>
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
                  const file = e.target.files[0];
                  setSelectedFile(file);
                  uploadImage(file);
                  // uploadImage(selectedFile);
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
          {/* <div className="flex items-center gap-2">
            <img
              src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
              alt=""
              className="h-5"
            />
            <p className="font-bold w-[140px]">User ID</p>
            <p>{user?.user_id}</p>
          </div> */}
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
        <div className="flex justify-start items-start flex-col md:justify-between md:flex-row">
          <div>
            <div className="font-bold flex gap-2">
              <img
                src="https://img.icons8.com/?size=100&id=16790&format=png&color=000000"
                alt=""
                className="h-6"
              />
              Attempted Quizzes
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {(thisUserTest &&
                thisUserTest?.map((test) => (
                  <div
                    key={test.id}
                    className="border border-green-400 shadow-sm hover:shadow-lg rounded p-4 cursor-pointer flex flex-col gap-2 "
                  >
                    <p className="font-bold text-green-500">
                      Quiz ID: {test.quiz_id}
                    </p>
                    <p className="font-bold">
                      Time Taken : {test.timeTaken} Seconds
                    </p>
                    <p className="font-bold">Topic: {test.topic}</p>
                    <p className="font-bold">Score: {test.score}</p>
                    <p className="italic">
                      Date: {test.timestamp.split(" ")[0].slice(0, 2)}/
                      {test.timestamp.split(" ")[0].slice(2, 4)}/
                      {test.timestamp.split(" ")[0].slice(4, 6)}
                    </p>
                    <p className="italic">
                      Time: {test.timestamp.split(" ")[1]}
                    </p>
                    <p
                      className="bg-green-500 p-1 flex items-center justify-center rounded mt-2 text-white font-bold"
                      onClick={() => {
                        navigate(`/final/${test.quiz_id}`);
                      }}
                    >
                      View
                    </p>
                  </div>
                ))) || <p>No attempted quizzes yet</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
