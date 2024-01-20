"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/app/firebase/config";

const Customgift = ({ params }) => {
  const router = useRouter();
  const [giftName, setGiftName] = useState("");
  const [file, setFile] = useState(null);

  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const uploadFile = async () => {
      if (!file) {
        return;
      }
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setUploading(true);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
          setError(true);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setFile(downloadURL);
            setUploading(false);
          } catch (error) {
            console.error(error);
            setError(true);
          }
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleAddGift = async (e) => {
    e.preventDefault();
    setClicked(true);

    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (!currentUser) {
        router.push("/signin");
        return;
      }

      const docRefGift = doc(db, "gifts", currentUser.username);
      const docSnapGift = await getDoc(docRefGift);

      if (docSnapGift.exists()) {
        const gifts = docSnapGift.data();
        const giftsArray = gifts.gifft || [];

        // Create a new gift object
        const newGift = {
          name: giftName,
          file,
          // Add other properties as needed
        };

        // Add the new gift to the array
        giftsArray.push(newGift);

        // Update the Firestore document with the new gifts array
        await setDoc(docRefGift, { gifft: giftsArray }, { merge: true });

        // Update the usergift array in localStorage
        const existingUserGifts =
          JSON.parse(localStorage.getItem("usergifts")) || [];
        existingUserGifts.push(newGift);
        localStorage.setItem("usergifts", JSON.stringify(existingUserGifts));

        setAdded(true);
        setTimeout(() => {
          router.push(`/${params.userid}`);
        });

        // Redirect to the home page or any other desired page
        // router.push("/");
      }
    } catch (error) {
      console.error("Error adding custom gift:", error);
      setError(true);
    }
  };

  return (
    <>
      <section className=" p-4 md:w-2/4 mx-auto">
        <div className="flex justify-between py-8">
          <Link href={`/${params.userid}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.09 19.9201L8.56997 13.4001C7.79997 12.6301 7.79997 11.3701 8.56997 10.6001L15.09 4.08008"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <Link
            href={`/${params.userid}`}
            className="text-[#C015A4] font-bold "
          >
            Cancel
          </Link>
        </div>

        {added ? (
          <div className="p-4 bg-green-400 rounded-lg my-2">
            <p>Custom Product added Successfully</p>
          </div>
        ) : (
          ""
        )}

        <div className="p-4 bg-[#FCF1F6] border border-primary rounded-lg">
          <p className="text-black">
            You can add a custom gift option here which you can add to your
            catalogue
          </p>
        </div>

        {error ? (
          <div className="p-4 bg-red-50 border border-red-500 mt-4 rounded-lg">
            <p className="text-red-500">
              Unable to add custom product, please refresh and try again
            </p>
          </div>
        ) : (
          ""
        )}

        <div className="pt-20">
          <form className="flex flex-col py-4" onSubmit={handleAddGift}>
            <label htmlFor="" className="text-black pb-4">
              Gift name <span className="text-primary font-bold">*</span>
            </label>
            <input
              type="text"
              required={true}
              onChange={(e) => setGiftName(e.target.value)}
              className="bg-[#F7F3F3] border rounded-2xl p-4 text-black outline-none"
            />
            <div className="mt-4 flex flex-col">
              <input
                type="file"
                name=""
                id=""
                onChange={(e) => setFile(e.target.files[0])}
                className="file:bg-[#C015A40D]  my-4 text-black file:border-3 file:border-[#C015A4] file:rounded-2xl file:p-8 file:border-dashed "
              />
            </div>
            {uploading ? (
              <p className="text-black my-4">
                Uploading product, please wait...
              </p>
            ) : (
              ""
            )}
            <button
              type="submit"
              className={` p-3 rounded-full ${
                clicked ? "bg-[#ffaff2]" : "bg-[#c015a4]"
              }  `}
            >
              {clicked ? "Adding gift...." : "Add gift"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Customgift;
