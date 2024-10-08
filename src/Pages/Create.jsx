import React, { useContext, useEffect, useState } from "react";
import { chatSession } from "../AIModel";
import { db } from "../config/firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { MyContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";

const Create = () => {
  const { user } = useContext(MyContext);

  const navigate = useNavigate();
  const [quiz, setQuiz] = useState();
  const [loading, setLoading] = useState(false);
  const categories = [
    {
      id: 1,
      category: "Math",
      emoji: "https://img.icons8.com/?size=100&id=1759&format=png&color=000000",
      title: "Mathematics Mastery",
    },
    {
      id: 2,
      category: "Science",
      emoji:
        "https://img.icons8.com/?size=100&id=QPrQ486nwPpS&format=png&color=000000",
      title: "Exploring the Universe",
    },
    {
      id: 3,
      category: "History",
      emoji:
        "https://img.icons8.com/?size=100&id=58761&format=png&color=000000",
      title: "Historical Highlights",
    },
  ];
  const ChooseLevel = [
    {
      id: 1,
      level: "Easy",
      emoji:
        "https://img.icons8.com/?size=100&id=53376&format=png&color=000000",
      title: "Casual Challenge",
    },
    {
      id: 2,
      level: "Intermediate",
      emoji: "https://img.icons8.com/?size=100&id=5344&format=png&color=000000",
      title: "Moderate Mastery",
    },
    {
      id: 3,
      level: "Hard",
      emoji:
        "https://img.icons8.com/?size=100&id=DsnzTtVQsKze&format=png&color=000000",
      title: "Moderate Mastery",
    },
  ];
  const [question, setQuestions] = useState();
  const [quizCategory, setQuizCategory] = useState();
  const [quizLevel, setquizLevel] = useState();

  const [error, setError] = useState();

  const handleSubmit = async () => {
    if (!question || !quizCategory || !quizLevel) {
      setError("Please Select Carefully");
      return;
    } else if (question > 20 || question < 1) {
      setError("Questions Should not be more than 20 or less than 1 ");
      return;
    } else {
      setError("");
      setLoading(true);
      const FINAL_PROMPT =
        "Create a quiz JSON with 10 questions, covering the categories history and science The questions should be of medium difficulty and include multiple-choice options, hints, and explanations as well as question no.  "
          .replace("10", question)
          .replace("history and science", quizCategory)
          .replace("medium", quizLevel);
      // console.log(FINAL_PROMPT);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      //   console.log(result?.response?.text());

      const json = JSON.parse(result?.response?.text());

      json.quiz_id = Date.now() + Math.floor(Math.random() * 10);
      // console.log(json);
      try {
        const docRef = doc(db, "users", user.user_id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const existingArray = docSnap.data().quiz_created || [];

          existingArray.push(json);

          await updateDoc(docRef, {
            quiz_created: existingArray,
          });
          setLoading(false);
          navigate(`/test/${json.quiz_id}`);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-[85vh] flex items-center justify-center  flex-col  p-8 gap-4 mb-20  ">
      <div className="">
        <p className="font-bold text-2xl">Tell us your quiz preferences</p>
        <p className="text-gray-400 text-xl">
          Just provide some basic information and we will start the quiz based
          on your preferences.
        </p>
      </div>
      <div className=" flex items-start justify-start flex-col gap-6 ">
        <div>
          <p className=" font-bold">Specify the desired category for the questions</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((item, index) => (
              <div
                key={item.id}
                className={` ${
                  quizCategory === item.category
                    ? "bg-green-100 border-green-500"
                    : ""
                } border border-black mt-2 p-6 cursor-pointer rounded flex flex-col justify-start items-start gap-1  w-[200px]`}
                onClick={() => {
                  setQuizCategory(item.category);
                }}
              >
                <img src={item.emoji} alt="" className="h-8" />
                <p className="font-bold">{item.category}</p>
                <p className="text-sm">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold">Select a difficulty level </p>
          <div className="grid lg:grid-cols-3 gap-4">
            {ChooseLevel.map((item, index) => (
              <div
                key={item.id}
                className={` ${
                  quizLevel === item.level
                    ? "bg-green-100 border-green-500"
                    : ""
                } border border-black mt-2 p-6 cursor-pointer rounded flex flex-col justify-center items-start gap-1  w-[200px]`}
                onClick={() => {
                  setquizLevel(item.level);
                }}
              >
                <img src={item.emoji} alt="" className="h-8" />
                <p className="font-bold">{item.level}</p>
                <p className="text-sm">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full relative">
          <p className=" font-bold">Number of Questions</p>
          <div className="">
            <input
              type="number"
              className="w-full border border-black rounded outline-green-500 p-2 font-bold "
              onChange={(e) => {
                setQuestions(e.target.value);
              }}
            />
          </div>
          <p className="mt-6 text-red-500">{error}</p>
          <div
            className="absolute right-0 my-6 bg-green-300  p-3 rounded cursor-pointer text-black font-bold "
            onClick={handleSubmit}
          >
            {loading ? (
              <FallingLines
                type="spin"
                color="#000000"
                height={25}
                width={25}
                timeout={0}
                loader="Grid"
              />
            ) : (
              "Create Quiz"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
