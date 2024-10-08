import React, { useContext, useEffect } from "react";
import { MyContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";

const Final = () => {
  const { myAnswers, actualAnswers, score, recentQuestions } =
    useContext(MyContext);
  // console.log(myAnswers, actualAnswers, score);
  // console.log(recentQuestions);
  const navigate = useNavigate();
  //   console.log(window.location.reload());

  //   useEffect(() => {
  //     if (window.location.reload()) {
  //       navigate("/");
  //     }
  //   },[]);

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start mt-10 mb-10">
      <p className="font-bold">
        You Have Scored {score} out of {actualAnswers?.length * 5}
      </p>
      <div className="mt-10 w-full sm:w-[80%] md:w-[70%] lg:w-[50%] p-4 flex flex-col gap-5">
        {actualAnswers &&
          actualAnswers?.map((item, index) => (
            <div
              key={index}
              className="bg-sky-50 p-4 font-bold flex justify-between"
            >
              <div>
                <p>
                  Q{index + 1}. {recentQuestions[index]}
                </p>
                <div>
                  {myAnswers && myAnswers[index]?.length > 0 ? (
                    <p>Your Answer: {myAnswers[index]}</p>
                  ) : (
                    "You didnt answered"
                  )}
                </div>
                <p className="text-green-500 p-1">Actual Answer: {item}</p>
              </div>
              <div>
                {myAnswers[index] === item ? (
                  <img
                    src="https://img.icons8.com/?size=100&id=82769&format=png&color=14D141"
                    alt=""
                    className="h-6"
                  />
                ) : (
                  <img
                    src="https://img.icons8.com/?size=100&id=6483&format=png&color=FF0000"
                    alt=""
                    className="h-6"
                  />
                )}
              </div>
            </div>
          ))}
      </div>
      <p
        className="bg-green-500 p-2 text-white rounded font-bold cursor-pointer"
        onClick={() => {
          navigate("/create");
        }}
      >
        Start Another Quiz
      </p>
    </div>
  );
};

export default Final;
