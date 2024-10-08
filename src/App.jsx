import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "./Context/Context";
import back from "./../public/back.png";

const App = () => {
  const { user } = useContext(MyContext);
  useEffect(() => {
    if (user) {
      // window.location.reload();
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-[85vh] flex-col text-center mx-6 lg:mx-32  ">
      <p className="dif-font text-3xl sm:text-3xl md:text-4xl lg:text-7xl font-bold lg:leading-[90px]">
        Explore a vast collection of quizzes on your favorite{" "}
        <span className="dif-font rounded bg-green-500 mt-2">subjects.</span>
      </p>
      <p className="para mt-5 text-gray-400 lg:mx-20  md:text-md lg:text-xl">
        Discover your trivia expertise and compete against others in exciting
        quiz challenges. Challenge yourself, learn something new, and compete
        with friends in exciting trivia battles.
      </p>
      <div className="mt-4 ">
        <Link to={"/create"}>
          <div className="bg-red-500 w-[100%] hover:bg-red-600  p-2 text-white font-medium rounded-md flex justify-center items-center gap-2">
            <img
              src="https://img.icons8.com/?size=100&id=62860&format=png&color=ffffff"
              alt=""
              className="h-5"
            />
            Enter the world of quiz
          </div>
        </Link>
      </div>
    </div>
  );
};

export default App;
