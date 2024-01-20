"use client";
import Image from "next/image";
import { useState } from "react";

function DefaultGift({ title, img, bg }) {
  const [clicked, setClicked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div
        className={`flex items-center gap-4 py-2  cursor-pointer ${
          clicked ? "border-t border-b  bg-slate-50 border-[#C015A4]" : " "
        }`}
        onClick={handleClick}
      >
        <input type="checkbox" checked={isChecked} className="hidden" />
        <div className={`p-2 ${bg} rounded-md border-t-2`}>
          <Image src={img} width={25} height={25} alt="money" />
        </div>
        <p className="text-black">{title}</p>
      </div>
    </>
  );
}

export default DefaultGift;
