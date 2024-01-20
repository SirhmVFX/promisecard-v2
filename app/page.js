import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-gradient flex flex-col justify-center items-center h-screen w-full px-6 lg:px-9">
      <div>
        <Image
          src="/home.svg"
          alt="Promise card Logo"
          width={120}
          height={120}
          priority
        />
      </div>
      <h4 className="text-xl text-center w-full">
        Bring back your childhood memories
      </h4>
      <h3 className="text-center text-2xl font-bold mb-4 w-full lg:w-1/3">
        Create your own promise card
      </h3>
      <Link
        href={"/signin"}
        className="bg-[#C015A4] text-white w-full md:w-1/2 lg:w-1/5 flex justify-center p-4 rounded-2xl"
      >
        Get Started
      </Link>

      <div className="flex flex-wrap gap-2 mt-28">
        <p className="text-lg">Have any sugesstion/report?</p>
        <Link href="#" className="text-lg text-primary font-bold ">
          Send Here
        </Link>
      </div>
    </section>
  );
}
