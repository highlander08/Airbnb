import Image from "next/image";
import React from "react";

const LargeCard = ({ img, title, buttonText, description }) => {
  return (
    <section className="relative py-16 cursor-pointer">
      <div className="relative h-96 min-w-[300px]">
        <Image
          src={img}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-2xl"
        />
      </div>
      <div className="absolute top-32 left-32">
        <h3 className="text-4xl mb-3 w-64 font-semibold">{title}</h3>
        <p>{description}</p>
        <button className="text-sm text-white font-semibold bg-gradient-to-r from-blue-500 via-green-400 to-red-400 px-4 py-2 rounded-lg mt-5">
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default LargeCard;
