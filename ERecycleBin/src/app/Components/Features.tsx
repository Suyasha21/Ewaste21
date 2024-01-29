import React from "react";
import AboutUs from "../about/About";
import Image from "next/image";
import { Counts } from "./Counts";

const elocateFeatures = [
  {
    number: "01",
    url: "/garbage.png",
    title: "Doorstep Collection",
    animation: "fade-right",
    description:
      "E-waste is the regular waste produced by extra, damaged, and outdated electronic equipment.",
  },
  {
    number: "02",
    url: "/computer.png",
    title: "IT Asset Disposal",
    animation: "fade-up",
    description:
      "Electronic assets that are no longer required or in use are safely recycled or reused in ITAD.",
  },
  {
    number: "03",
    url: "/security.png",
    title: "Secure Data Destruction",
    animation: "fade-left",
    description:
      "To protect your data and the environment, send old devices in for recycling and refurbishment.",
  },
];

const Features: React.FC = () => {
  return (
    <>
      <section
        className="features min-h-screen"
        id="features"
        aria-label="features"
      >
        <AboutUs />
        <Counts />
        <div className=" container mx-auto px-4 pb-4 text-center rounded">
          <div className="flex flex-col justify-center items-center">
            <p className="section-subtitle font-bold text-gray-700 mb-2">
              -Our Features-
            </p>

            <h2 className=" text-4xl section-title font-bold text-black mb-4">
              What we offer
            </h2>
          </div>
          <ul className=" grid-list section py-20 my-2">
            {elocateFeatures.map((feature, index) => (
              <li data-aos={feature.animation} key={index}>
                <div className="features-card cursor-pointer rounded-3xl flex flex-col justify-center items-center">
                  <data className="card-number" value={feature.number}>
                    {feature.number}
                  </data>
                  <Image
                    className="w-32 h-32 bg-white p-2 rounded-md m-4"
                    src={feature.url}
                    alt=""
                    width={400}
                    height={400}
                  />
                  <h3 className="h3 card-title">{feature.title}</h3>
                  <p className="card-text text-2xl">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Features;
