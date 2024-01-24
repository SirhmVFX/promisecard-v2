"use client";

import Link from "next/link";
import { useState } from "react";

function GiftAdded({ params }) {
  const [isCopied, setIsCopied] = useState(false);

  const share = () => {
    if (navigator.share) {
      navigator.share({
        title:
          "Unlock the magic of a Promise Card – Share a special commitment with me. Click the link below to make a promise:",
        url: `https://promisecard.netlify.app/${params.userid}/promiseme`,
        text: "Unlock the magic of a Promise Card – Share a special commitment with me. Click the link below to make a promise: ",
      });
    } else {
      navigator.clipboard.writeText(
        `https://promisecard.netlify.app/${params.userid}/promiseme`
      );
    }
  };
  const copytext = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://promisecard.netlify.app/${params.userid}/promiseme`
      );
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="w-full md:w-2/4 mx-auto flex flex-col gap-10 text-black p-4">
        <div className="flex flex-col items-center pt-32 gap-6">
          <h1 className="font-bold text-4xl">Gift Added</h1>
          <Link
            href={`/${params.userid}`}
            className="py-3 px-8 rounded-full text-white bg-[#c015a4]"
          >
            Go to Home
          </Link>
        </div>

        <div className="mt-20">
          <p className="mb-4">
            Copy and share your promise card link , you can always find it in
            your profile
          </p>

          <div className="flex items-center bg-[#F7F3F3] rounded-lg justify-between border p-3">
            <p className="ps-4">{`https://promisecard.netlify.app/${params.userid}/promiseme`}</p>
          </div>
          <div className="flex w-full justify-center items-center gap-4 mt-4 ">
            <button
              className="text-[#C015a4] border rounded-full py-2 px-6 "
              onClick={copytext}
            >
              {isCopied ? "✅Copied" : "Copy"}
            </button>
            <button
              onClick={share}
              className="border border-[#c015a4] py-2 px-8 text-[#c015a4] rounded-full"
            >
              Share
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default GiftAdded;
