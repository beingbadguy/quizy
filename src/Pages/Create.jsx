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
    {
      id: 4,
      category: "Geography",
      emoji:
        "https://img.icons8.com/?size=100&id=48574&format=png&color=000000",
      title: "Global Discoveries",
    },
    {
      id: 5,
      category: "Literature",
      emoji:
        "https://img.icons8.com/?size=100&id=100240&format=png&color=000000",
      title: "Literary Legends",
    },
    {
      id: 6,
      category: "Art",
      emoji: "https://img.icons8.com/?size=100&id=1967&format=png&color=000000",
      title: "Artistic Adventures",
    },
    {
      id: 7,
      category: "Music",
      emoji:
        "https://img.icons8.com/?size=100&id=20152&format=png&color=000000",
      title: "Musical Melodies",
    },
    {
      id: 8,
      category: "Sports",
      emoji: "https://img.icons8.com/?size=100&id=59&format=png&color=000000",
      title: "Sporting Excellence",
    },
    {
      id: 9,
      category: "Languages",
      emoji:
        "https://img.icons8.com/?size=100&id=19261&format=png&color=000000",
      title: "Linguistic Skills",
    },
    {
      id: 10,
      category: "Psychology",
      emoji:
        "https://img.icons8.com/?size=100&id=WytqulMdyD4i&format=png&color=000000",
      title: "Human Mind Insights",
    },
    {
      id: 11,
      category: "Philosophy",
      emoji:
        "https://img.icons8.com/?size=100&id=79581&format=png&color=000000",
      title: "Philosophical Perspectives",
    },
    {
      id: 12,
      category: "Cooking",
      emoji:
        "https://img.icons8.com/?size=100&id=10517&format=png&color=000000",
      title: "Culinary Arts",
    },
    {
      id: 13,
      category: "Gardening",
      emoji:
        "https://img.icons8.com/?size=100&id=43370&format=png&color=000000",
      title: "Gardening & Horticulture",
    },
    {
      id: 14,
      category: "Photography",
      emoji:
        "https://img.icons8.com/?size=100&id=50876&format=png&color=000000",
      title: "Photography Masterclass",
    },
    {
      id: 15,
      category: "Film & Cinema",
      emoji: "https://img.icons8.com/?size=100&id=1427&format=png&color=000000",
      title: "Cinematic Journey",
    },
    {
      id: 16,
      category: "Economics",
      emoji:
        "https://img.icons8.com/?size=100&id=77047&format=png&color=000000",
      title: "Economic Principles",
    },
    {
      id: 17,
      category: "Marketing",
      emoji:
        "https://img.icons8.com/?size=100&id=24264&format=png&color=000000",
      title: "Marketing Strategies",
    },
    {
      id: 18,
      category: "Astronomy",
      emoji:
        "https://img.icons8.com/?size=100&id=53019&format=png&color=000000",
      title: "Astronomical Wonders",
    },
    {
      id: 19,
      category: "Architecture",
      emoji:
        "https://img.icons8.com/?size=100&id=HN2juyNuxuVL&format=png&color=000000",
      title: "Architectural Marvels",
    },
    {
      id: 20,
      category: "Travel",
      emoji:
        "https://img.icons8.com/?size=100&id=32703&format=png&color=000000",
      title: "Travel & Exploration",
    },
    {
      id: 21,
      category: "Python",
      emoji:
        "https://img.icons8.com/?size=100&id=13441&format=png&color=000000",
      title: "Python Programming",
    },
    {
      id: 22,
      category: "JavaScript",
      emoji:
        "https://img.icons8.com/?size=100&id=108784&format=png&color=000000",
      title: "JavaScript Mastery",
    },
    {
      id: 23,
      category: "Java",
      emoji:
        "https://img.icons8.com/?size=100&id=13679&format=png&color=000000",
      title: "Java Development",
    },
    {
      id: 24,
      category: "C++",
      emoji:
        "https://img.icons8.com/?size=100&id=40669&format=png&color=000000",
      title: "C++ Programming",
    },
    {
      id: 25,
      category: "AI & Machine Learning",
      emoji:
        "https://img.icons8.com/?size=100&id=22815&format=png&color=000000",
      title: "AI Innovations",
    },
    {
      id: 26,
      category: "Cybersecurity",
      emoji:
        "https://img.icons8.com/?size=100&id=53197&format=png&color=000000",
      title: "Cybersecurity Basics",
    },
    {
      id: 27,
      category: "Blockchain",
      emoji:
        "https://img.icons8.com/?size=100&id=59335&format=png&color=000000",
      title: "Blockchain Technology",
    },
    {
      id: 28,
      category: "Ethical Hacking",
      emoji:
        "https://img.icons8.com/?size=100&id=44893&format=png&color=000000",
      title: "Ethical Hacking",
    },
    {
      id: 29,
      category: "Game Development",
      emoji: "https://img.icons8.com/?size=100&id=7314&format=png&color=000000",
      title: "Game Design & Development",
    },
    {
      id: 30,
      category: "Quantum Computing",
      emoji:
        "https://img.icons8.com/?size=100&id=6oFZ7BIVGUGH&format=png&color=000000",
      title: "Quantum Computing",
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
      title: "Jack of All ",
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
    } else if (question > 30 || question < 1) {
      setError("Questions Should not be more than 30 or less than 1 ");
      return;
    } else {
      setError("");
      setLoading(true);
      const FINAL_PROMPT =
        "Create a quiz JSON with 10 questions, covering the categories history and science The questions should be of medium difficulty and include multiple-choice options, hints, and explanations as well as question no. and make sure eveytime questions are diffrent from the previous questions"
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
    <div className="min-h-[85vh] flex items-start justify-center  flex-col  p-8 gap-4 mb-20  ">
      <div className="flex items-center gap-2">
        <img
          src="https://img.icons8.com/?size=100&id=89346&format=png&color=000000"
          alt=""
          className="h-6 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        <p className="">Quiz</p>
      </div>
      <div className="">
        <div className="font-bold text-2xl flex items-center gap-3">
          <p className=" text-xl md:text-2xl"> Tell us your quiz preferences</p>
          <img
            src="https://img.icons8.com/?size=100&id=kuU7I7uPlHfo&format=png&color=000000"
            alt=""
            className="h-8"
          />
        </div>
        <p className="text-gray-400 text-sm md:text-md">
          Just provide some basic information and we will start the quiz based
          on your preferences.
        </p>
      </div>
      <div className=" flex items-start justify-start flex-col gap-6 mt-4 ">
        <div>
          <div className=" font-bold text-sm text-brown-500 flex items-center gap-2">
            <img
              src="https://img.icons8.com/?size=100&id=83152&format=png&color=000000"
              alt=""
              className="h-4"
            />
            <p>Specify the desired category for the questions</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {categories &&
              categories.map((item, index) => (
                <div
                  key={item.id}
                  className={` ${
                    quizCategory === item.category
                      ? "bg-green-200 border-green-500"
                      : ""
                  } border border-green-500 mt-2 p-6 cursor-pointer rounded flex flex-col justify-start items-start gap-1 shadow-sm hover:shadow-md  `}
                  onClick={() => {
                    setQuizCategory(item.category);
                  }}
                >
                  <img src={item.emoji} alt="" className="h-8" />
                  <p className="font-bold">{item.category}</p>
                  <p className="text-sm italic ">{item.title}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="mt-5">
          <div className=" font-bold text-sm text-brown-500 flex items-center gap-2">
            <img
              src="https://img.icons8.com/?size=100&id=21698&format=png&color=000000"
              alt=""
              className="h-4"
            />
            <p>Select a difficulty level</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {ChooseLevel &&
              ChooseLevel.map((item, index) => (
                <div
                  key={item.id}
                  className={` ${
                    quizLevel === item.level ? "bg-red-200 border-red-500 " : ""
                  } border border-red-500 mt-2 p-6 cursor-pointer rounded flex flex-col justify-center items-start gap-1  `}
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
        <div className="w-full relative mt-4">
          <div className=" font-bold text-sm text-brown-500 flex items-center gap-2">
            <img
              src="https://img.icons8.com/?size=100&id=102743&format=png&color=000000"
              alt=""
              className="h-4"
            />
            <p>Enter Number of Questions</p>
          </div>
          <div className="mt-2">
            <input
              type="number"
              className="w-full border border-green-500 rounded outline-green-500 p-2 font-bold "
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
