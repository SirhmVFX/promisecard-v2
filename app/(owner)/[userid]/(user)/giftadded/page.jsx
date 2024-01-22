import Link from "next/link";

function GiftAdded({ params }) {
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

          <div className="flex p-2 bg-[#F7F3F3] rounded-lg justify-between">
            <input
              type="text"
              className="bg-transparent w-[90%]"
              placeholder={`https://promisecard/${params.userid}/promiseme`}
            />
            <button className="text-[#C015a4]">Copy</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default GiftAdded;
