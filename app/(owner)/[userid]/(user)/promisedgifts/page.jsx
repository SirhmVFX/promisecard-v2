"use client";

import { defaultgifts } from "@/data/data";
import Image from "next/image";

import { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useRouter } from "next/router";
import Link from "next/link";

const Promisedgifts = ({ params }) => {
  const user = params.userid;
  const [allgift, setAllGift] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", user);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        try {
          const q = query(
            collection(db, "promisedGifts"),
            where("promisedUser", "==", user)
          );

          let theGift = [];
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            theGift.push({ ...doc.data(), id: doc.id });
            console.log(doc.id, " => ", doc.data());
          });
          setAllGift(theGift);
        } catch (error) {
          console.log(error);
        }
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <section className="md:w-2/4 mx-auto p-6">
        <div className="py-4">
          <Link href={`/${user}/profile`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.0898 19.9201L8.56984 13.4001C7.79984 12.6301 7.79984 11.3701 8.56984 10.6001L15.0898 4.08008"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </div>
        <h1 className="text-black font-semibold text-2xl">Gifts</h1>
        {/* <div className="flex justify-between py-4">
          <p className="text-black font-base">Reminder</p>
          <div>
            <div class="flex items-center">
              <label for="toggle" class="flex items-center cursor-pointer">
                <div class="relative">
                  <input type="checkbox" id="toggle" class="hidden" />

                  <div class="toggle__line w-12 h-6 bg-gray-400 rounded-full shadow-inner"></div>

                  <div class="toggle__dot absolute w-4 h-4 bg-white rounded-full shadow left-3 top-1 transition"></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <select name="" id="" className="w-3/4 text-black  p-4  outline-none">
            <option className="" value="">
              1 day
            </option>
            <option value="">2 days</option>
            <option value="">3 days</option>
            <option value="">4 days</option>
            <option value="">5 days</option>
          </select>
        </div> */}
        <div className="py-4">
          {allgift.map((gift) => (
            <div
              key={gift.id}
              className="flex items-center gap-4 py-2 border-t"
            >
              <div className={`p-2 bg-gray-100 rounded-lg`}>
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/promisecard-3eb90.appspot.com/o/image%209.png?alt=media&token=546af285-3d29-4938-9039-2349e5a0cbd8"
                  width={50}
                  height={50}
                  alt={gift.giverName}
                />
              </div>
              <div>
                <p className="text-black">
                  <span className="font-bold"> {gift.giverName}</span> promised
                  you
                </p>
                <div className="flex gap-2">
                  {gift.saidGift.map((each) => (
                    <p className="text-gray-400">{each.name}, </p>
                  ))}
                </div>
                <div className="flex gap-2">
                  <p className="text-black"> Amount: </p>
                  <p className="text-black">{gift.curenncy}</p>
                  <p className="text-black">{gift.amount}</p>
                </div>
                <p className="text-black">Remind them on {gift.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Promisedgifts;
