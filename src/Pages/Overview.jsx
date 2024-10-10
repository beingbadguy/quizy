import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/Context";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Watch } from "react-loader-spinner";
import { format } from "date-fns";

const Overview = () => {
  const {
    user,
    setMyAnswers,
    actualAnswers,
    setActualAnswers,
    score,
    setScore,
    recentQuestions,
    setRecentQuestions,
    setUser,
  } = useContext(MyContext);

  const [userQuiz, setUserQuiz] = useState([]);
  const [answerArray, setAnswersArray] = useState([]);
  const [showQuiz, setShowQuiz] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [modifiedAnswers, setModifiedAnswers] = useState([]);
  const [counter, setCounter] = useState(120);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchQuizById = async (id) => {
    try {
      const docRef = doc(db, "users", user.user_id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserQuiz(docSnap.data().quiz_created);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const filtered = userQuiz.filter((item) => {
    return item.quiz_id == id;
  });

  const questionsLength = filtered.map((q, i) => {
    return q.questions.length;
  });

  useEffect(() => {
    const answersArray = filtered.map((_, i) => {
      const answersy = _.questions.map((item, index) => {
        return item.answer;
      });
      return answersy;
    });
    setAnswersArray(answersArray[0]);
    setActualAnswers(answersArray[0]);

    const actualquestions = filtered.map((q, i) => {
      const questions = q.questions.map((ques, i) => {
        return ques.question;
      });
      return questions;
    });
    setRecentQuestions(actualquestions[0]);
    // console.log("it is rendering");
  }, [userQuiz]);

  useEffect(() => {
    fetchQuizById(id);
    // console.log("it is rendering");
  }, [id]);

  let newArray = [];

  useEffect(() => {
    const modArray = [...newArray]; // Create a copy of newArray to modify
    const len = questionsLength[0]; // Assuming questionsLength is correctly populated

    for (let i = 0; i < len; i++) {
      if (answers[i] === undefined || answers[i] === null) {
        modArray[i] = "empty"; // Set "empty" for undefined/null values
      } else {
        modArray[i] = answers[i]; // Set the actual answer
      }
    }

    setModifiedAnswers(modArray); // Update the modifiedAnswers state
  }, [answers]);
  // console.log(modifiedAnswers);

  const compareArrays = async (array1, array2) => {
    if (answers.length === 0) {
      alert("Atleast one answer");
      setCounter(120);
      return;
    }
    let points = 0;

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] === array2[i]) {
        points += 5;
      }
    }
    setScore(points);

    const docRef = doc(db, "users", user.user_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        points: docSnap.data().points + points,
      });
    }
    finalSubmission(points);

    setUser({ ...user, points: user.points + points });

    navigate(`/final/${id}`);
  };

  useEffect(() => {
    const subscribe = setInterval(() => {
      if (counter === 0) {
        compareArrays(answers, answerArray);
        return;
      }
      setCounter(counter - 1);
    }, 1000);
    return () => clearInterval(subscribe);
  }, [counter]);

  useEffect(() => {
    // console.log(answers);
  }, [answers]);

  const finalSubmission = async (points) => {
    // Get the current date and time
    const now = new Date();

    // Format the date and time
    const formattedDate = format(now, "ddMMyy HH:mm:ss");

    // console.log(formattedDate);

    if (
      !user?.user_id ||
      !Array.isArray(modifiedAnswers) ||
      modifiedAnswers.length === 0
    ) {
      console.error("Invalid data: Ensure user_id and answers are present.");
      return;
    }
    try {
      await setDoc(doc(db, "attempted_quiz", id), {
        user_id: user?.user_id,
        quiz_id: id,
        score: points,
        myAnswer: modifiedAnswers,
        actualAnswers: actualAnswers,
        timestamp: formattedDate,
        topic: filtered[0]?.title,
        timeTaken: 120 - counter,
        questions: recentQuestions,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const hasALreadyGivenQuiz = async (id) => {
      try {
        const ref = doc(db, "attempted_quiz", id);

        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (hasALreadyGivenQuiz(id)) {
      alert("You have already given this quiz, please create a new one");
      navigate("/create");
    }
  }, []);

  return (
    <div className="min-h-[85vh] flex  flex-col  ">
      <div className="  mt-6 text-center font-bold flex items-center justify-center gap-2">
        <Watch
          visible={true}
          height="30"
          width="30"
          radius="48"
          color="#000000"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        Timer: {counter}
      </div>
      <div className=" pb-10 md:mt-10 flex items-center md:items-start justify-center  lg:gap-10 md:mx-10 lg:mx-20 flex-col md:flex-row ">
        <div className="md:w-[60%] lg:w-[40%] p-4 ">
          <div className="font-bold  flex items-center gap-1">
            <img
              src="https://img.icons8.com/?size=100&id=t2kJDqV3R8DP&format=png&color=000000"
              alt=""
              className="h-5"
            />
            <p>Questions</p>
          </div>
          <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-6 mt-4 gap-2 md:gap-4 text-sm  ">
            {Array(questionsLength[0])
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={` ${
                    showQuiz === i + 1 ? "bg-sky-100 text-black font-bold" : ""
                  } ${
                    answers[i]?.length > 0
                      ? "bg-green-500 text-white font-bold"
                      : ""
                  }  border p-2 cursor-pointer  hover:text-black flex items-center justify-center rounded-full border-gray-300 `}
                  onClick={() => {
                    setShowQuiz(i + 1);
                  }}
                >
                  {i + 1}
                </div>
              ))}
          </div>
        </div>

        <div className=" p-5 font-bold w-full md:w-[100%] lg:w-[60%]  ">
          {filtered?.map((item, index) => (
            <div key={index}>
              <div className="flex items-center gap-1">
                <img
                  src="https://img.icons8.com/?size=100&id=35881&format=png&color=000000"
                  alt=""
                  className="h-5"
                />
                <p>{item.title}</p>
              </div>

              <div className="relative">
                <div className="flex items-center gap-4 absolute right-3 top-3 ">
                  <img
                    src="https://img.icons8.com/?size=100&id=40075&format=png&color=000000"
                    alt=""
                    className={` ${
                      showQuiz != 1 ? "" : "hidden"
                    } h-8 cursor-pointer`}
                    onClick={() => {
                      if (showQuiz != 1) {
                        setShowQuiz(showQuiz - 1);
                      }
                    }}
                  />
                  <img
                    src="https://img.icons8.com/?size=100&id=40074&format=png&color=000000"
                    alt=""
                    className={` ${
                      showQuiz != questionsLength[0] ? "" : "hidden"
                    } h-8 cursor-pointer`}
                    onClick={() => {
                      if (showQuiz != questionsLength[0]) {
                        setShowQuiz(showQuiz + 1);
                      }
                    }}
                  />
                </div>
                {item?.questions.map((q, i) => (
                  <div
                    key={i}
                    className={` ${
                      showQuiz === i + 1 ? "" : "hidden"
                    } shadow-md   bg-sky-50 mt-3 p-8`}
                  >
                    <div className="">
                      <p className="text-neutral-500">
                        Question {q.questionNo}
                      </p>
                      <p className="mt-2">{q.question}</p>
                    </div>
                    <div className="mt-6">
                      {q?.options?.map((a, index) => (
                        <div
                          key={index}
                          className={`${
                            answers[i] === a ? "bg-green-300" : ""
                          } mt-2 p-2 min-w-[70%] max-w-[60%] px-4 flex justify-between gap-5 items-center hover:shadow-md hover:border-green-500 hover:border border border-purple-600 rounded cursor-pointer `}
                          onClick={() => {
                            const handleAnswerChange = (
                              questionNumber,
                              answer
                            ) => {
                              const updatedAnswers = [...answers];

                              if (
                                updatedAnswers[questionNumber - 1] !== answer
                              ) {
                                updatedAnswers[questionNumber - 1] = answer;

                                setAnswers(updatedAnswers);
                                setMyAnswers(updatedAnswers);
                              }
                            };
                            handleAnswerChange(i + 1, a);
                          }}
                        >
                          <p>{a}</p>
                          <img
                            src="https://img.icons8.com/?size=100&id=82766&format=png&color=1A1A1A"
                            alt=""
                            className={` ${
                              answers[i] === a ? "" : "hidden"
                            } h-4`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div
            className={` ${
              showQuiz === questionsLength[0] ? "" : "hidden"
            } p-2 bg-green-400 w-20  flex justify-center items-center mt-5 text-black font-bold cursor-pointer rounded`}
            onClick={() => {
              compareArrays(answers, answerArray);
            }}
          >
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
