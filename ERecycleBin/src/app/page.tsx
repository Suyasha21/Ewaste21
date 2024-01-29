"use client";
import { useEffect, useState } from "react";
import Home from "./Components";
import { isAuthenticated } from "./sign-in/auth";
import AOS from "aos";
import "aos/dist/aos.css";
export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);
  console.log("hii");
  return (
    <>
      <Home />
    </>
  );
}
