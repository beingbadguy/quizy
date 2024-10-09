import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/Context";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const Final = () => {
  const { recentQuestions, user } = useContext(MyContext);

  const [answer, setAnswer] = useState();
  const [score, setScore] = useState();
  const [actualAnswer, setActualAnswer] = useState();
  const [question, setQuestion] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  const fetchResult = async (id) => {
    if (user) {
      const docRef = doc(db, "attempted_quiz", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log(docSnap.data());
        setAnswer(docSnap.data().myAnswer);
        setScore(docSnap.data().score);
        setActualAnswer(docSnap.data().actualAnswers);
        setQuestion(docSnap.data().questions);
      }
    } else {
      console.log("please login first");
    }
  };

  // console.log(question);
  useEffect(() => {
    fetchResult(id);
  }, [id]);

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start mt-10 mb-10">
      <div className="flex items-center gap-2 absolute left-10 ">
        <img
          src="https://img.icons8.com/?size=100&id=89346&format=png&color=000000"
          alt=""
          className="h-6 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        <p className="">Score</p>
      </div>
      <div>
        <img
          src="https://img.icons8.com/?size=100&id=K7UWQpIZgEo1&format=png&color=000000"
          alt=""
          className="h-8"
        />
      </div>
      <p className="font-bold mt-2">
        You Have Scored {score} out of {answer?.length * 5}
      </p>
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 w-full sm:w-[90%] md:w-[90%] lg:w-[100%] p-4  gap-5">
        {actualAnswer &&
          actualAnswer?.map((item, index) => (
            <div
              key={index}
              className="bg-sky-50 p-4 font-bold flex justify-start gap-20 relative"
            >
              <div>
                <p className="max-w-[90%]">
                  Q{index + 1}. {question[index]}
                </p>
                <div className="mt-4">
                  {answer && answer[index]?.length > 0 ? (
                    <p>
                      Your Answer:{" "}
                      {answer[index] != "empty"
                        ? answer[index]
                        : "You didn't answer"}
                    </p>
                  ) : (
                    "You didnt answered"
                  )}
                </div>
                <p className="text-green-500 p-1">Actual Answer: {item}</p>
              </div>
              <div className="absolute right-5">
                {answer[index] === item ? (
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
      <div className="flex justify-between flex-col md:flex-row gap-6 mt-6">
        <div
          className="bg-black p-2 md:text-md text-white rounded font-bold cursor-pointer w-[200px] flex items-center justify-center gap-2"
          onClick={() => {
            navigate("/create");
          }}
        >
          <img
            src="https://img.icons8.com/?size=100&id=79627&format=png&color=ffffff"
            alt=""
            className="h-6"
          />
          <p> Start Another Quiz</p>
        </div>
        <div
          className="bg-black p-2 md:text-md text-white rounded font-bold cursor-pointer w-[200px] flex items-center justify-center gap-2"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <img
            src="https://img.icons8.com/?size=100&id=100243&format=png&color=ffffff"
            alt=""
            className="h-6"
          />
          <p>Go To Profile</p>
        </div>
      </div>
    </div>
  );
};

export default Final;
