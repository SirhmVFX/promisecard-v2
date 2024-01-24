"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";

function Owner({ params }) {
  const router = useRouter();
  const [giftItems, setGiftitems] = useState(null);

  const [selectedGift, setSelectedGift] = useState(null);

  const handleShowModal = (gift) => {
    setSelectedGift(gift);
  };

  const handleHideModal = () => {
    setSelectedGift(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (!currentUser) {
        router.push("/signin");
      } else {
        try {
          const docRef = doc(db, "users", currentUser.username);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userr = docSnap.data();
            const docReff = doc(db, "gifts", userr.username);
            const docSnapp = await getDoc(docReff);
            if (docSnap.exists()) {
              const userGift = docSnapp.data();
              console.log(userGift);
              setGiftitems(userGift.gifft);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [router]);

  const handleRemove = async (theGift) => {
    try {
      // Remove from local storage
      const existingSelectedGifts =
        JSON.parse(localStorage.getItem("usergifts")) || [];
      const updatedSelectedGifts = existingSelectedGifts.filter(
        (gift) => gift.id !== theGift.id
      );

      localStorage.setItem("usergifts", JSON.stringify(updatedSelectedGifts));

      const addedStatus = JSON.parse(localStorage.getItem("addedStatus")) || {};
      addedStatus[theGift.id] = false;
      localStorage.setItem("addedStatus", JSON.stringify(addedStatus));

      setGiftitems(updatedSelectedGifts);

      // Remove from Firestore
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (currentUser) {
        const docRef = doc(db, "users", currentUser.username);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const user = docSnap.data();
          const docRefGifts = doc(db, "gifts", user.username);
          const docSnapGifts = await getDoc(docRefGifts);

          if (docSnapGifts.exists()) {
            const userGifts = docSnapGifts.data();
            const updatedGifts = userGifts.gifft.filter(
              (gift) => gift.id !== theGift.id
            );

            // Update the Firestore document
            await setDoc(docRefGifts, { gifft: updatedGifts }, { merge: true });

            // Reload the page after updating Firestore
            router.reload();
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {giftItems && giftItems.length > 0 ? (
        <div className=" p-8 relative w-full h-screen flex flex-col items-center">
          <div className="w-full">
            <h1 className="text-black py-4 text-xl">Your Gift Items</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            {giftItems.map((gift) => (
              <div
                key={gift.id}
                className={`${
                  gift.bg ? `${gift.bg}` : "bg-gray-50"
                } p-4 flex flex-col items-center rounded-lg `}
              >
                {selectedGift === gift ? (
                  <div className="absolute bg-[#0000005e] backdrop-blur-sm bottom-0 top-0  left-0 right-0 z-50 flex justify-center items-center">
                    <div className=" bg-white p-8 rounded-2xl flex flex-col gap-8">
                      <p>Do you want to delete this gift?</p>
                      <div className="flex flex-col items-center gap">
                        <div className="w-[50px] h-[50px] ">
                          <Image
                            src={gift.file}
                            width={50}
                            height={50}
                            alt="gift"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h1 className="text-black">{gift.name}</h1>
                      </div>

                      <div className="flex items-center gap-2 justify-center">
                        <button
                          onClick={handleHideModal}
                          className="bg-gray-50 text-black px-3 py-2 rounded-full"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleRemove(gift)}
                          className="bg-[#c015a4] py-2 px-4 rounded-full"
                        >
                          Yes, Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="relative w-full flex flex-col items-center">
                  <div
                    className="bg-white rounded-full absolute right-0  cursor-pointer"
                    onClick={() => handleShowModal(gift)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M13.0599 12L15.3599 9.69998C15.6499 9.40998 15.6499 8.92999 15.3599 8.63999C15.0699 8.34999 14.5899 8.34999 14.2999 8.63999L11.9999 10.94L9.69986 8.63999C9.40986 8.34999 8.92986 8.34999 8.63986 8.63999C8.34986 8.92999 8.34986 9.40998 8.63986 9.69998L10.9399 12L8.63986 14.3C8.34986 14.59 8.34986 15.07 8.63986 15.36C8.78986 15.51 8.97986 15.58 9.16986 15.58C9.35986 15.58 9.54986 15.51 9.69986 15.36L11.9999 13.06L14.2999 15.36C14.4499 15.51 14.6399 15.58 14.8299 15.58C15.0199 15.58 15.2099 15.51 15.3599 15.36C15.6499 15.07 15.6499 14.59 15.3599 14.3L13.0599 12Z"
                        fill="#292D32"
                      />
                    </svg>
                  </div>
                  <div className="w-[80px] h-[80px] ">
                    <Image
                      src={gift.file}
                      width={80}
                      height={80}
                      alt="gift"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-black">{gift.name}</h1>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-36 z-10 ">
            <Link
              href={`${params.userid}/selectgift`}
              className="bg-[#c015a4] py-3 px-12 rounded-full"
            >
              Add
            </Link>
          </div>
        </div>
      ) : (
        <section className="bg-[#FFFDFA] flex flex-col justify-center items-center h-screen w-full px-6 lg:px-9 text-black">
          <div>
            <Image
              src="/empty.svg"
              alt="Empty Gift Box"
              width={127.48}
              height={122.5}
              priority
            />
          </div>
          <p className="text-center w-full my-12 md:text-lg">
            You have not added any gift options yet! Would you like to add one
            or more now?
          </p>

          <Link
            href={`${params.userid}/selectgift`}
            className="button bg-[#C015A4]"
          >
            Add Gift
          </Link>
        </section>
      )}
    </>
  );
}

export default Owner;
