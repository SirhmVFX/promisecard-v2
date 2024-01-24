"use client";

import { FaUserCircle } from "react-icons/fa";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";

import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "@/app/firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

import { useRouter } from "next/navigation";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();

  const handleVisibility = () => {
    setVisible(!visible);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setClicked(true);

    try {
      const docRef = doc(db, "users", username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setError(true);
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", username), {
          username,
          email,
          password,
          timeStamp: serverTimestamp(),
        });

        const currentUser = {
          username,
          email,
        };
        localStorage.setItem("user", JSON.stringify(currentUser));

        console.log(res);
        setSignedIn(true);
        setTimeout(() => {
          router.push(`/${username}`);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <>
      <section className="py-6 px-6  flex flex-col justify-center md:items-center w-full bg-[#FFFDFA] lg:px-9">
        <h3 className={` text-2xl font-semibold text-black mb-8`}>
          Get Started!
        </h3>

        {error ? (
          <div className="p-4 border rounded-lg border-red-600 text-red-600">
            <p>Account creation unsuccessful!</p>
            <p>Username or Email Address already in use</p>
          </div>
        ) : (
          ""
        )}

        {signedIn ? (
          <div className="p-4 bg-green-500 rounded-lg">
            Account created successfully.
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col justify-center md:w-1/3">
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col text-black">
              <p className={` my-4`}>
                Choose a unique Username
                <span className="text-[#C015A4] text-lg">*</span>
              </p>
              <div className="flex border bg-[#F7F3F3] border-gray-300 rounded-2xl justify-between items-center">
                <input
                  type="text"
                  required={true}
                  onChange={(e) => setUsername(e.target.value)}
                  className=" py-4 bg-transparent px-3 rounded-2xl w-[90%] text-sm outline-none  "
                  placeholder="Enter your username"
                />

                <FaUserCircle className="text-3xl  text-neutral-500 ml-1 mr-2" />
              </div>

              <p className={` my-4`}>
                Email <span className="text-[#C015A4] text-lg">*</span>
              </p>
              <div className="flex border bg-[#F7F3F3] border-gray-300 rounded-2xl justify-between items-center">
                <input
                  type="email"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" bg-transparent py-4 px-3 rounded-2xl w-[90%] text-sm outline-none"
                  placeholder="Enter your email address"
                />

                <MdOutlineMail className="text-3xl  text-neutral-500 ml-1 mr-2" />
              </div>
              <p className={`my-4`}>
                Password <span className="text-[#C015A4] text-lg">*</span>
              </p>
              <div className="flex border bg-[#F7F3F3] border-gray-300 rounded-2xl justify-between items-center">
                <input
                  type={visible ? "text" : "password"}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className=" bg-transparent py-4 px-3 rounded-2xl w-[90%] text-sm outline-none"
                  placeholder="Enter password"
                />

                <div onClick={handleVisibility}>
                  {visible ? (
                    <IoEyeSharp className="text-3xl md:text-4xl text-neutral-500 ml-1 mr-2" />
                  ) : (
                    <IoEyeOffSharp className="text-3xl md:text-4xl text-neutral-500 ml-1 mr-2" />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-12">
              <button
                type="submit"
                className={`${
                  clicked ? "bg-[#ffaff2]" : "bg-[#C015A4]"
                } button`}
              >
                {clicked ? "Creating account, please wait..." : "Sign Up"}
              </button>
              <p className="text-black text-lg text-center my-4">
                Already have an account?
                <Link
                  href="/signin"
                  className="text-xl text-[#C015A4] font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="flex flex-wrap gap-2 mt-28">
          <p className="text-lg text-black">Have any sugesstion/report?</p>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSf56cGUTHNeLiVvv448Q5vn3OMP-RiyXiWHQjaXA5um7E9OdA/viewform"
            className="text-lg text-[#C015A4] font-bold "
          >
            Send Here
          </Link>
        </div>
      </section>
      ;
    </>
  );
};

export default Signup;
