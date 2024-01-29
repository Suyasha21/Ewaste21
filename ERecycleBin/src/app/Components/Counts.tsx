import React, { useEffect, useState } from "react";
import { FaHome, FaMobile } from "react-icons/fa";
import { MdLaptopChromebook } from "react-icons/md";
import { RiRecycleFill } from "react-icons/ri";
type Props = {};

export const Counts = (props: Props) => {
  const [laptopRecycled, setLaptopRecycled] = useState(0);
  const [mobileRecycled, setMobileRecycled] = useState(0);
  const [homeAppliances, setHomeAppliances] = useState(0);
  const [eWasteRecycled, setEWasteRecycled] = useState(0);

  let maxValue = {
    laptopRecycled: 485136,
    mobileRecycled: 340000,
    homeAppliances: 225000,
    eWasteRecycled: 280000,
  };
  useEffect(() => {
    for (let i = 0; i < maxValue.laptopRecycled / 1780; i++) {
      setTimeout(() => {
        setLaptopRecycled(i * 1780);
      }, i * 10);
    }
    for (let i = 0; i < maxValue.mobileRecycled / 1500; i++) {
      setTimeout(() => {
        setMobileRecycled(i * 1500);
      }, i * 10);
    }
    for (let i = 0; i < maxValue.homeAppliances / 1600; i++) {
      setTimeout(() => {
        setHomeAppliances(i * 1600);
      }, i * 10);
    }
    for (let i = 0; i < maxValue.eWasteRecycled / 1000; i++) {
      setTimeout(() => {
        setEWasteRecycled(i * 1000);
      }, i * 10);
    }
  }, []);
  return (
    <div
      data-aos="fade-right"
      className="flex flex-col w-full min-h-screen justify-center gap-32 items-center p-32"
    >
      <div className="flex flex-col justify-center items-center">
        <p className="section-subtitle font-bold text-gray-700 mb-2">
          -Our Achievements-
        </p>

        <h2 className=" text-4xl section-title font-bold text-black mb-4">
          What we have achieved so far
        </h2>
      </div>
      <div className="flex  justify-between items-center gap-8 flex-wrap ">
        <div className="md:h-128 md:w-128 h-80 w-80 bg-[var(--go-green)] flex flex-col justify-center gap-4 items-center text-white rounded-md">
          <MdLaptopChromebook className="text-9xl" />
          <span className="md:text-5xl" data-val="400">
            {laptopRecycled}
          </span>
          <span className="md:text-3xl">Laptop Recycled</span>
        </div>
        <div className="md:h-128 md:w-128 h-80 w-80 bg-[var(--go-green)] flex flex-col justify-center gap-4 items-center text-white rounded-md">
          <FaMobile className="text-9xl" />
          <span className="md:text-5xl" data-val="340">
            {mobileRecycled}
          </span>
          <span className="md:text-3xl">Mobiles Recycled</span>
        </div>
        <div className="md:h-128 md:w-128 h-80 w-80 bg-[var(--go-green)] flex flex-col justify-center gap-4 items-center text-white rounded-md">
          <FaHome className="text-9xl" />
          <span className="md:text-5xl" data-val="225">
            {homeAppliances}
          </span>
          <span className="md:text-3xl">Home Appliances</span>
        </div>
        <div className="md:h-128 md:w-128 h-80 w-80 bg-[var(--go-green)] flex flex-col justify-center gap-4 items-center text-white rounded-md">
          <RiRecycleFill className="text-9xl" />
          <span className="md:text-5xl" data-val="280">
            {eWasteRecycled}kg
          </span>
          <span className="md:text-3xl">eWaste Recycled as per 2023</span>
        </div>
      </div>
    </div>
  );
};
