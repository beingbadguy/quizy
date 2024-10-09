import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";

export const MyContext = createContext();

const MainContext = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [dp, setDp] = useState(user?.profile_picture);

  const [myAnswers, setMyAnswers] = useState();
  const [actualAnswers, setActualAnswers] = useState();
  const [recentQuestions, setRecentQuestions] = useState();
  const [score, setScore] = useState();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const actualUser = await getDoc(doc(db, "users", user.uid));
        if (actualUser.exists()) {
          localStorage.setItem("user", JSON.stringify(actualUser.data()));
        }
      } else {
        localStorage.clear();
      }
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        logout,
        setMyAnswers,
        setActualAnswers,
        myAnswers,
        actualAnswers,
        score,
        setScore,
        recentQuestions,
        setRecentQuestions,
        dp,
        setDp,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
export default MainContext;
