"use client";

import Link from "next/link";
import { useState } from "react";

function GiftAdded({ params }) {
  const [isCopied, setIsCopied] = useState(false);
  const copytext = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://promisecard.netlify.app/${params.userid}/promiseme`
      );
      setIsCopied(true);
      setTimeout(() => {
        isCopied(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="w-full md:w-2/4 mx-auto flex flex-col gap-10 text-black p-6">
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

          <div className="flex items-center bg-[#F7F3F3] rounded-lg justify-between border">
            <p className="ps-4">{`https://promisecard.netlify.app/${params.userid}/promiseme`}</p>
            <button
              className="text-[#C015a4] border-s py-3 px-6 "
              onClick={copytext}
            >
              {isCopied ? "✅Copied" : "Copy"}
            </button>
          </div>
          <div className="flex w-full justify-center">
            <button className="border border-[#c015a4] py-2 px-8 text-[#c015a4] mt-4 rounded-full">
              Share
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default GiftAdded;
