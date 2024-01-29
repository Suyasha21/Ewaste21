import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import FAQ from "./FAQ";
import { Graphs } from "./Graphs";
import { Counts } from "./Counts";
import Image from "next/image";
import servicesImage from "../../assets/services.jpeg";
type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Hero />
      <Features />
      {/* <Graphs /> */}

      <div className="flex flex-col justify-center items-center">
        <p className="section-subtitle font-bold text-gray-700 mb-2">
          -Our Services-
        </p>

        <h2 className=" text-4xl section-title font-bold text-black mb-4">
          What we offer
        </h2>
        <div className="md:px-80">
          <Image
            src={servicesImage}
            alt="Image"
            className="object-cover rounded-lg h-full w-full"
          />
        </div>
      </div>
      <FAQ />
    </>
  );
};

export default Home;
