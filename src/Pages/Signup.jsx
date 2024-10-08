import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/Context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";
import { FallingLines } from "react-loader-spinner";

const Signup = () => {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSignup = async (e) => {
    setLoading(true);

    e.preventDefault();
    if (form.name == "" || form.email == "" || form.password == "") {
      setError("Please fill all the fields carefully");
      setLoading(false);
    } else if (form.password.length < 8) {
      setError("Password length must be at Least 8");
      setLoading(false);
    } else {
      try {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
        const userData = auth.currentUser;

        await setDoc(doc(db, "users", userData.uid), {
          name: form.name,
          email: form.email,
          user_id: userData.uid,
          quiz_created: [],
          rank: 0,
          points: 0,
        });
        setLoading(false);
        window.location.reload();
        navigate("/");
      } catch (error) {
        console.log(error.message);
        setError(error.message);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/create");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh]">
      <div className="flex items-center  cursor-pointer">
        <img src="./logo.svg" alt="" className="h-8" />
        <p className="text-2xl font-bold text-[#343131]">uizy</p>
      </div>
      <p className="my-2">Hi, Welcome Back </p>
      <form className="flex flex-col gap-3 w-[80%] sm:w-[70%] md:w-[60%] lg:w-[40%]">
        <label htmlFor="" className="flex flex-col gap-1 ">
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border border-black  p-2 rounded focus:outline-red-400"
          />
        </label>
        <label htmlFor="" className="flex flex-col gap-1 ">
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border border-black  p-2 rounded focus:outline-red-400"
          />
        </label>
        <label htmlFor="" className="flex flex-col gap-1 relative">
          Password
          <input
            type={showPassword ? "string" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            className="border border-black  p-2 rounded focus:outline-red-400"
          />
          <div
            className="absolute right-3 top-10 cursor-pointer "
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <PiEyeThin size={20} />
            ) : (
              <PiEyeSlashThin size={20} />
            )}
          </div>
        </label>
        <p className="text-red-500 text-sm">{error}</p>
        <button
          className="p-2 bg-black hover:bg-gray-900 text-white rounded font-bold flex items-center justify-center "
          onClick={(e) => {
            handleSignup(e);
          }}
        >
          {loading ? (
            <FallingLines
              type="spin"
              color="#fff"
              height={25}
              width={25}
              timeout={0}
              loader="Grid"
            />
          ) : (
            "Create Account"
          )}
        </button>
        <p>
          Already have an account ?{" "}
          <Link to={"/login"} className="underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
