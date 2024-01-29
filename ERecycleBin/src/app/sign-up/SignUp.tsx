/* eslint-disable react/no-unescaped-entities */
import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loader from "../../assets/recycle-2.gif";
const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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

  const register = async () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
        formData
      );
      toast.success("Registration Successful!");
      router.push("/sign-in");
    } catch (error: any) {
      toast.error(`Registration Failed. ${error.response.data.message}`);
      console.error("Register failed:", error);
    }
    setLoading(false);
  };

  return (
    <>
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
      <div className="my-3 text-center">
        <span className=" text-4xl font-bold">Welcome to ERecycleBin</span>
        <span className="font-light text-gray-400 mb-4">
          Please enter your details to register
        </span>
      </div>

      <div className="mx-auto w-4/5 md:w-256 h-[90vh] md:h-[70vh]">
        <div className="relative flex flex-col md:flex-row p-6 bg-white shadow-2xl rounded-2xl">
          {/* Left Column */}
          <div className="flex flex-col justify-start p-4 md:w-1/2">
            <div className="py-4">
              <span className="mb-2 text-md">Email</span>
              <input
                type="text"
                className="w-full p-2 px-4 sign-field rounded-md placeholder:font-light text-black placeholder:text-gray-500"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleInputChange}
                value={formData.email}
                required
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
                onChange={handleInputChange}
                value={formData.password}
                required
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Confirm Password</span>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
                onChange={handleInputChange}
                value={formData.confirmPassword}
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-start p-4 md:w-1/2">
            <div className="py-4">
              <span className="mb-2 text-md">Phone Number</span>
              <input
                type="text"
                className="w-full p-2 px-4 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number"
                onChange={handleInputChange}
                value={formData.phoneNumber}
                required
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Full Name</span>
              <input
                type="text"
                className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
                name="name"
                id="name"
                placeholder="Full Name"
                onChange={handleInputChange}
                value={formData.name}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between py-4">
          <label className="flex text-xl">
            <input
              type="checkbox"
              name="ch"
              id="ch"
              placeholder="checkbox"
              className="ml-8 p-1"
              onClick={togglePasswordVisibility}
            />
          </label>
          <span className="md:-ml-120"> Show Password</span>
          <Link href="/forget-password" className="font-bold text-black">
            Forgot Password?
          </Link>
        </div>
        {!passwordMatch && (
          <div className="text-red-600 text-sm">
            Password and Confirm Password do not match.
          </div>
        )}
        <button
          className="w-full bg-black mt-4 text-white p-2 rounded-lg mb-6 hover:bg-emerald-400 hover:text-black hover:border hover:border-gray-300"
          onClick={register}
        >
          Sign Up
        </button>

        <div className="text-center text-gray-400">
          Already have an account?
          <Link
            href="/sign-in"
            className="font-bold text-black hover:text-emerald-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
