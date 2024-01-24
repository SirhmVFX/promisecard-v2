"use client";

import { defaultgifts } from "@/data/data";
import Link from "next/link";
import { PiHandHeartBold } from "react-icons/pi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";

export const PromisePage = ({ params }) => {
  const [promiseGift, setPromiseGift] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user?.username === params.userid) {
        router.push(`/${params.userid}`);
      } else if (!user || user.username !== params.userid) {
        try {
          const docRef = doc(db, "gifts", params.userid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const giftMe = docSnap.data();
            setPromiseGift(giftMe.gifft);
          } else {
            router.push(`/signin`);
            console.log("Gifts not found");
          }
          console.log(promiseGift);
        } catch (error) {
          console.error("Error fetching gifts:", error);
        }
      }
    };
    fetchData();
    console.log(promiseGift);
  }, [params.userid, router]);

  const [addedStatus, setAddedStatus] = useState(() => {
    const savedAddedStatus =
      JSON.parse(localStorage.getItem("addedStatus")) || {};
    return savedAddedStatus;
  });

  useEffect(() => {
    localStorage.setItem("addedStatus", JSON.stringify(addedStatus));
  }, [addedStatus]);

  const selectGift = (selectedGift) => {
    const existingSelectedGifts =
      JSON.parse(localStorage.getItem("gifts")) || [];

    const isAlreadySelected = existingSelectedGifts.some(
      (gift) => gift.id === selectedGift.id
    );

    if (isAlreadySelected) {
      const updatedSelectedGifts = existingSelectedGifts.filter(
        (gift) => gift.id !== selectedGift.id
      );
      localStorage.setItem("gifts", JSON.stringify(updatedSelectedGifts));
    } else {
      const updatedSelectedGifts = [...existingSelectedGifts, selectedGift];
      localStorage.setItem("gifts", JSON.stringify(updatedSelectedGifts));
    }

    setAddedStatus((prevAddedStatus) => ({
      ...prevAddedStatus,
      [selectedGift.id]: !prevAddedStatus[selectedGift.id],
    }));
  };

  function handleClick() {
    router.push("give");
  }

  return (
    <>
      <section className="  p-2 flex flex-col w-full md:w-3/4 mx-auto items-center bg-[#FFFDFA] h-screen relative">
        <div className="py-14 text-center">
          <h1 className="text-4xl font-semibold text-black font-he">
            Promise Card
          </h1>

          <h2 className="text-black text-xl">God Loves Cheerful Givers </h2>
        </div>

        <div className="w-full px-6 lg:w-2/4">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 text-black">
              <h2 className="text-lg">Promise me</h2>
              <PiHandHeartBold />
            </div>

            <Link href="/" className="text-primary font-bold">
              See All
            </Link>
          </div>

          <div className="py-4 gap-4 w-full">
            {promiseGift && (
              <div className="grid grid-cols-2 py-4 gap-4">
                {promiseGift.map((gift) => (
                  <div
                    key={gift.id}
                    className={`${
                      addedStatus[gift.id]
                        ? `${
                            gift.bg ? gift.bg : "bg-grey-50"
                          } text-black p-4 rounded-lg flex flex-col items-center border-2 border-primary border-[#c015a4]`
                        : `${
                            gift.bg ? gift.bg : "bg-grey-50"
                          } text-black p-4 rounded-lg flex flex-col items-center`
                    }`}
                    onClick={() => {
                      selectGift(gift);
                    }}
                  >
                    <Image
                      src={gift.file}
                      alt={gift.name}
                      width={60}
                      height={60}
                    />
                    <h1>{gift.name}</h1>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          className="bg-[#c015a4] py-3 px-8 rounded-full absolute bottom-10 "
          onClick={handleClick}
        >
          give
        </button>
      </section>
    </>
  );
};

export default PromisePage;
