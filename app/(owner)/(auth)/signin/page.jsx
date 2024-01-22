"use client";
import { FaUserCircle } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/app/firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setClicked(true);
    try {
      const docRef = doc(db, "users", username);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("Document data:", docSnap.data());

        if (userData.password === password) {
          setSignedIn(true);
          const currentUser = {
            username: userData.username,
            email: userData.email,
          };

          localStorage.setItem("user", JSON.stringify(currentUser));

          setTimeout(() => {
            localStorage.removeItem("user");
          }, 10 * 60 * 60 * 1000); // 10 hours in milliseconds

          setTimeout(() => {
            router.push(`/${username}`);
          }, 3000);
        } else {
          setError(true);
        }
      } else {
        console.log("No such user");
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <section className="py-6 px-6  h-screen flex flex-col md:items-center w-full bg-[#FFFDFA] lg:px-9">
      <h3 className={`text-2xl font-semibold text-black mb-8`}>
        Welcome Back!
      </h3>
      {error ? (
        <div className="p-4 border rounded-lg border-red-600 text-red-600">
          <p>Login unsuccessful!</p>
          <p>User not Found</p>
        </div>
      ) : (
        ""
      )}
      {signedIn ? (
        <div className="p-4 bg-green-500 rounded-lg">SignIn Successfull!!</div>
      ) : (
        ""
      )}
      <div className="flex flex-col justify-center md:w-1/3">
        <form onSubmit={handleSignIn}>
          <div className="flex flex-col text-black">
            <p className={` my-4`}>
              Username <span className="text-[#C015A4] text-lg">*</span>
            </p>
            <div className="flex border bg-[#F7F3F3] border-gray-300 rounded-2xl justify-between items-center">
              <input
                type="text"
                required={true}
                onChange={(e) => setUsername(e.target.value)}
                className=" bg-transparent py-4 px-3 rounded-2xl w-[90%] text-sm outline-none"
                placeholder="Enter your username"
              />

              <FaUserCircle className="text-3xl  text-neutral-500 ml-1 mr-2" />
            </div>
            <p className={`my-4`}>
              Password <span className="text-[#C015A4] text-lg">*</span>
            </p>
            <div className="flex bg-[#F7F3F3] border border-gray-300 rounded-2xl justify-between items-center">
              <input
                type="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent py-4 px-3 rounded-2xl w-[90%] text-sm outline-none"
                placeholder="Enter your password"
              />

              <IoIosEyeOff className="text-3xl md:text-4xl text-neutral-500 ml-1 mr-2" />
            </div>
          </div>
          <div className="flex justify-end py-4 ">
            <Link
              href="/forgotpassword"
              className="text-[#C015A4] font-semibold text-lg"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="mt-12 flex flex-col w-full">
            <button
              type="submit"
              className={`  py-3 rounded-xl text-white ${
                clicked ? "bg-[#ffaff2]" : "bg-[#C015A4]"
              }  `}
            >
              {clicked ? "Signing you in, please wait.." : "Sign In"}
            </button>
            <p className="text-black text-lg text-center my-4">
              Dont have an account?
              <Link
                href="/signup"
                className="text-xl text-[#C015A4] font-medium"
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="flex flex-wrap gap-2 mt-28">
        <p className="text-lg text-black">Have any sugesstion/report?</p>
        <Link href="#" className="text-lg text-[#C015A4] font-bold ">
          Send Here
        </Link>
      </div>
    </section>
  );
};

export default Signin;
