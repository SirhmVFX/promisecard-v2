"use client";
import Image from "next/image";
import Link from "next/link";

const { defaultgifts } = require("@/data/data");
import { useRouter } from "next/navigation";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";

import { useState, useEffect } from "react";

function SelectGift({ params }) {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

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
      JSON.parse(localStorage.getItem("usergifts")) || [];

    const isAlreadySelected = existingSelectedGifts.some(
      (gift) => gift.id === selectedGift.id
    );

    if (isAlreadySelected) {
      const updatedSelectedGifts = existingSelectedGifts.filter(
        (gift) => gift.id !== selectedGift.id
      );
      localStorage.setItem("usergifts", JSON.stringify(updatedSelectedGifts));
    } else {
      const updatedSelectedGifts = [...existingSelectedGifts, selectedGift];
      localStorage.setItem("usergifts", JSON.stringify(updatedSelectedGifts));
    }
    console.log(selectedGift);

    setAddedStatus((prevAddedStatus) => ({
      ...prevAddedStatus,
      [selectedGift.id]: !prevAddedStatus[selectedGift.id],
    }));
  };

  const handleAddGift = async (e) => {
    e.preventDefault();
    setClicked(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (!currentUser) {
        router.push("/signin");
      } else {
        const docRef = doc(db, "users", currentUser.username);
        const docSnap = await getDoc(docRef);
        const gifft = JSON.parse(localStorage.getItem("usergifts"));
        if (docSnap.exists()) {
          await setDoc(doc(db, "gifts", currentUser.username), {
            gifft,
            timeStamp: serverTimestamp(),
          });
          setAdded(true);

          setTimeout(() => {
            router.push("giftadded");
          }, 1500);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          setError(true);
        }
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleCancel = () => {
    // Deselect all selected gifts
    localStorage.removeItem("usergifts");
    localStorage.removeItem("addedStatus");
    setAddedStatus({}); // Set addedStatus to an empty object

    // You may also want to update the UI to reflect the deselection
    setClicked(false); // Reset the clicked state

    // Add any additional cleanup code or state updates as needed
  };

  return (
    <>
      <section className="w-full md:w-2/4 p-8 relative h-screen flex flex-col items-center ">
        <div className="flex justify-between items-center py-4 w-full">
          <Link href={"./"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.0901 19.92L8.57009 13.4C7.80009 12.63 7.80009 11.37 8.57009 10.6L15.0901 4.07996"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>

          <button className="text-[#C015A4]" onClick={handleCancel}>
            Cancel
          </button>
        </div>

        {added ? (
          <div className="p-4 bg-green-400 rounded-lg">
            <p>Successfully added gifts</p>
          </div>
        ) : (
          ""
        )}

        {error ? (
          <div className="p-4 border border-red-500 rounded-lg">
            <p className="text-red-500">
              Unable to add gift, please refresh the page and try again
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="py-4 w-full">
          <h1 className="text-black">Select Gift Item</h1>
        </div>
        <div className="w-full">
          {defaultgifts.map((gift) => (
            <div
              key={gift.id}
              className={`flex gap-2 items-center py-4 ${
                addedStatus[gift.id] ? "border-t border-b border-[#C015a4]" : ""
              }`}
              onClick={() => {
                selectGift(gift);
              }}
            >
              <div className={`${gift.bg} p-2`}>
                <Image src={gift.file} height={20} width={20} alt="gift" />
              </div>
              <p className="text-black">{gift.name}</p>
            </div>
          ))}
        </div>

        <div className=" mx-auto gap-2 items-center absolute flex w-3/4 justify-center bottom-32 z-50">
          <button
            className={`py-3 w-2/4 rounded-full ${
              clicked ? "bg-[#ffaff2]" : "bg-[#C015A4]"
            }`}
            onClick={handleAddGift}
          >
            {clicked ? "Adding gift.." : "Add Gift"}
          </button>
          <Link
            href={"customgift"}
            className="bg-gray-100 border py-3 w-2/4 text-black flex justify-center rounded-full"
          >
            Add custom Gift
          </Link>
        </div>
      </section>
    </>
  );
}
export default SelectGift;
