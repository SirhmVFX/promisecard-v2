"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

const Profile = ({ params }) => {
  const user = params.userid;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", user);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        router.push("/signin");
      }
    };
    fetchData();
  }, [router, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/signin");
  };
  return (
    <>
      <section className="md:w-2/4 mx-auto p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-black text-2xl p-4 ">Profile</h1>
          <Link
            href={`/${user}/promisedgifts`}
            className="text-[#C015A4] font-bold text-lg"
          >
            Promised Gifts
          </Link>
        </div>

        <div className="flex gap-2 items-center p-4">
          <div className="border-4 rounded-full w-[70px] h-[70px]">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/promisecard-3eb90.appspot.com/o/user_placeholder.png?alt=media&token=afd647e2-546b-4357-83e9-d685d73794cb"
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
              width={70}
              height={70}
            />
          </div>
          <div>
            <h1 className="text-black text-xl font-bold">{params.userid}</h1>
          </div>
        </div>

        <div>
          <form>
            <div>
              <label htmlFor="" className="text-black">
                Username
              </label>
              <div className="flex justify-between p-4 bg-[#F7F3F3] border rounded-2xl">
                <input
                  type="text"
                  name="username"
                  className="outline-none text-black bg-transparent"
                  placeholder={params.userid}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    opacity="0.4"
                    d="M12 22.01C17.5228 22.01 22 17.5329 22 12.01C22 6.48716 17.5228 2.01001 12 2.01001C6.47715 2.01001 2 6.48716 2 12.01C2 17.5329 6.47715 22.01 12 22.01Z"
                    fill="#292D32"
                  />
                  <path
                    d="M12 6.93994C9.93 6.93994 8.25 8.61994 8.25 10.6899C8.25 12.7199 9.84 14.3699 11.95 14.4299C11.98 14.4299 12.02 14.4299 12.04 14.4299C12.06 14.4299 12.09 14.4299 12.11 14.4299C12.12 14.4299 12.13 14.4299 12.13 14.4299C14.15 14.3599 15.74 12.7199 15.75 10.6899C15.75 8.61994 14.07 6.93994 12 6.93994Z"
                    fill="#292D32"
                  />
                  <path
                    d="M18.7802 19.36C17.0002 21 14.6202 22.01 12.0002 22.01C9.38022 22.01 7.00021 21 5.22021 19.36C5.46021 18.45 6.11022 17.62 7.06021 16.98C9.79022 15.16 14.2302 15.16 16.9402 16.98C17.9002 17.62 18.5402 18.45 18.7802 19.36Z"
                    fill="#292D32"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-col my-8 ">
              <label htmlFor="" className="text-black">
                Note
              </label>

              <div className="bg-[#F7F3F3] border border-[#C2BABA] rounded-lg p-4 outline-none text-[#888B89] text-lg">
                Hey, it&apos;s {params.userid} ... your promise could be the
                sweet touch i need right now. Imagine your promise as a little
                gift, bringing us closer to making my dream come true.
                Let&apos;s unwrap the joy of promises together. Your commitment
                means the world! 🎁✨
              </div>
            </div>
            <div className="flex justify-between p-4 bg-[#F7F3F3] border rounded-2xl mb-4">
              <input
                type="text"
                placeholder={`https://promisecard.netlify.app/${params.userid}/promiseme`}
                className="outline-none text-black bg-transparent w-full"
              />
            </div>
            <button>Copy</button>
          </form>

          <button onClick={handleLogout} className="flex text-black mt-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                opacity="0.4"
                d="M9 7.2V16.79C9 20 11 22 14.2 22H16.79C19.99 22 21.99 20 21.99 16.8V7.2C22 4 20 2 16.8 2H14.2C11 2 9 4 9 7.2Z"
                fill="#292D32"
              />
              <path
                d="M5.56994 8.12002L2.21994 11.47C1.92994 11.76 1.92994 12.24 2.21994 12.53L5.56994 15.88C5.85994 16.17 6.33994 16.17 6.62994 15.88C6.91994 15.59 6.91994 15.11 6.62994 14.82L4.55994 12.75H15.2499C15.6599 12.75 15.9999 12.41 15.9999 12C15.9999 11.59 15.6599 11.25 15.2499 11.25H4.55994L6.62994 9.18002C6.77994 9.03002 6.84994 8.84002 6.84994 8.65002C6.84994 8.46002 6.77994 8.26002 6.62994 8.12002C6.33994 7.82002 5.86994 7.82002 5.56994 8.12002Z"
                fill="#292D32"
              />
            </svg>
            Log Out
          </button>
          <div className="mb-80">.</div>
        </div>
      </section>
    </>
  );
};

export default Profile;
