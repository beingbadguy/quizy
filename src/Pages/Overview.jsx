import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/Context";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Watch } from "react-loader-spinner";

const Overview = () => {
  const {
    user,
    setMyAnswers,
    setActualAnswers,
    score,
    setScore,
    recentQuestions,
    setRecentQuestions,
    setUser,
  } = useContext(MyContext);
  const { id } = useParams();
  const [userQuiz, setUserQuiz] = useState([]);

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

  const [answerArray, setAnswersArray] = useState([]);

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
  }, [userQuiz]);

  useEffect(() => {
    fetchQuizById(id);
  }, []);

  const [showQuiz, setShowQuiz] = useState(1);

  const [answers, setAnswers] = useState([]);

  useEffect(() => {}, [answers]);

  const compareArrays = async (array1, array2) => {
    if (answers.length === 0) {
      return alert("Atleast one answer");
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

    setUser({ ...user, points: user.points + points });

    navigate("/final");
  };
  // console.log();
  const [counter, setCounter] = useState(60 * 2);

  useEffect(() => {
    const subscribe = setInterval(() => {
      if (counter == 0) {
        compareArrays(answers, answerArray);
      }
      setCounter(counter - 1);
    }, 1000);
    return () => clearInterval(subscribe);
  }, [counter]);

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
      <div className=" pb-10 mt-20 flex items-center lg:items-center justify-center  gap-20 lg:mx-20 flex-col lg:flex-row ">
        <div className="lg:w-[50%] p-4 ">
          <p className="font-bold">Questions</p>
          <div className="grid grid-cols-5 mt-10 gap-4  ">
            {Array(questionsLength[0])
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={` ${
                    showQuiz === i + 1
                      ? "bg-[#F0A8D0] text-white font-bold"
                      : ""
                  } ${
                    answers[i]?.length > 0
                      ? "bg-green-500 text-white font-bold"
                      : ""
                  }  border p-4 cursor-pointer  hover:text-black flex items-center justify-center rounded-full border-gray-300 `}
                  onClick={() => {
                    setShowQuiz(i + 1);
                  }}
                >
                  {i + 1}
                </div>
              ))}
          </div>
        </div>

        <div className="p-5 font-bold w-[100%] lg:w-[50%]  ">
          {filtered?.map((item, index) => (
            <div key={index}>
              <p>{item.title}</p>
              <div className="">
                {item?.questions.map((q, i) => (
                  <div
                    key={i}
                    className={` ${
                      showQuiz === i + 1 ? "" : "hidden"
                    } shadow-md   bg-sky-50 mt-8 p-8`}
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
                          } mt-2 p-2 min-w-[40%] max-w-[60%] px-10 flex justify-between items-center hover:shadow-md hover:border-purple-300 hover:border border border-gray-300 rounded cursor-pointer`}
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
