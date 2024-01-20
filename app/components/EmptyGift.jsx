import Image from "next/image";
import Link from "next/link";

const EmptyGift = () => {
  return (
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
        You have not added any gift options yet! Would you like to add one or
        more now?
      </p>

      <Link href={`/choosegift`} className="button bg-[#C015A4]">
        Add Gift
      </Link>
    </section>
  );
};

export default EmptyGift;
