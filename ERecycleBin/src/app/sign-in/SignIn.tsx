import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import loader from "../../assets/recycle-2.gif";
import {
  setEmail,
  setPhoneNumber,
  setToken,
  setUser,
  setUserID,
  setUserName,
  setfullname,
  setCredits,
} from "./auth";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { useAuth } from "../utils/AuthContext";
import Image from "next/image";

const Signin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser: setUserData, setToken: setTokenData } = useAuth();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const login = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        formData
      );
      const user = response.data;
      console.log(user);

      localStorage.setItem("user", JSON.stringify(user));

      message.success("Login Successfull");

      if (user) {
        setUserData(user);
        setTokenData(user.token);
      }

      router.push("/");
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error?.response?.data?.message)
        message.error("Login failed :" + error?.response?.data?.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center md:h-screen h-[70vh]">
      {loading && (
        <div
          className="min-h-screen min-w-full fixed top-0 left-0 flex justify-center items-center z-50 "
          style={{
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <Image
            src={loader}
            alt="loading"
            width={100}
            height={100}
            className="object-cover rounded-full"
          />
        </div>
      )}
      <ToastContainer
        limit={1}
        className="text-2xl"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>
          <form className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
              className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              placeholder="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </form>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="password"
              className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
              onChange={handleInputChange}
              value={formData.password}
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <label className="flex items-center text-sm mr-24">
              <input
                type="checkbox"
                name="ch"
                id="ch"
                placeholder="checkbox"
                className="mr-2 p-1"
                onClick={togglePasswordVisibility}
              />
              Show Password
            </label>
            <Link href="/forget-password" className="font-bold text-black">
              forgot password ?
            </Link>
          </div>

          <button
            className="w-full bg-black mt-4 text-white p-2 rounded-lg mb-6 hover:bg-emerald-400 hover:text-black hover:border hover:border-gray-300"
            onClick={login}
          >
            Sign in
          </button>

          <div className="text-center text-gray-400">
            Dont have an account?
            <Link
              href="/sign-up"
              className="font-bold text-black hover:text-emerald-300"
            >
              Sign up{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
