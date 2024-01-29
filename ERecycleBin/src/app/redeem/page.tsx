"use client";
import React, { use, useEffect } from "react";
import { RiCopperCoinFill } from "react-icons/ri";
import { getCredits } from "../sign-in/auth";
import { useAuth } from "../utils/AuthContext";

type Props = {};

const Redeem = (props: Props) => {
  const prizes = [
    {
      name: "100rs Amazon Voucher",
      coins: 1000,
      image: "https://cpimg.tistatic.com/06961262/b/4/Amazon-Gift-Card.jpg",
    },
  ];
  const { user } = useAuth();

  let credits = user?.credits || 0;
  return (
    <div className="min-h-screen w-full py-48 flex flex-col gap-16 justify-start items-center">
      <div className="flex flex-col justify-between gap-4 items-center p-32 border-2 border-green-300 w-128 rounded-lg  transition-all cursor-pointer">
        <RiCopperCoinFill
          style={{
            height: "100px",
            width: "100px",
          }}
          color="green"
        />
        <h4 className="font-semibold text-4xl text-green-700 ">
          {credits} Coins
        </h4>
        <p className="text-2xl">Available</p>
      </div>
      <div className="w-full h-full p-32 flex flex-col gap-12 border-t-2">
        <p className="text-4xl font-extrabold">Choose Prize</p>
        <div>
          {prizes.map((prize, index) => (
            <div
              key={index}
              className="flex flex-col justify-between gap-4 items-center p-32 border-2 border-gray-300 w-128 rounded-lg hover:scale-[1.01]  transition-all cursor-pointer"
            >
              <img src={prize.image} alt="" />
              <h4 className="font-semibold text-4xl text-green-700 ">
                {prize.coins} Coins
              </h4>
              <p className="text-lg">{prize.name}</p>
              <button className="btn-md btn-outline hover:bg-green-600 hover:text-white">
                Redeem Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Redeem;
