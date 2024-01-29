"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { menuOutline } from "ionicons/icons";
import { closeOutline } from "ionicons/icons";
import { location } from "ionicons/icons";
import logo from "../../assets/logo-transparent.png";
import {
  getEmail,
  getUser,
  getUserName,
  handleLogout,
  isAuthenticated,
} from "../sign-in/auth";
import { FiUser } from "react-icons/fi";
import getLocation from "../utils/getLocation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../utils/AuthContext";
import { useRouter } from "next/navigation";
interface NavItemProps {
  label: string;
}

const Header = () => {
  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [locations, setLocation] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const EwasteIssues = [
    "E-waste is the fastest growing waste stream in the world.",
    "Only 20% of global e-waste is recycled each year.",
    "E-waste represents 2% of America's trash in landfills, but it equals 70% of overall toxic waste.",
    "20 to 50 million metric tons of e-waste are disposed worldwide every year.",
    "Cell phones and other electronic items contain high amounts of precious metals like gold or silver.",
    "Americans dump phones containing over $60 million in gold/silver every year.",
    "Only 12.5% of e-waste is currently recycled.",
    "For every 1 million cell phones that are recycled, 35,274 lbs of copper, 772 lbs of silver, 75 lbs of gold, and 33 lbs of palladium can be recovered.",
    "Recycling 1 million laptops saves the energy equivalent to the electricity used by 3,657 U.S. homes in a year.",
    "E-waste is still the fastest growing municipal waste stream.",
    "In 2011, 3.41 million tons of e-waste were recycled.",
    "Electronics comprise 70% of toxic waste in landfills.",
  ];
  useEffect(() => {
    if (!message) {
      console.log("hi");
      setInterval(() => {
        setMessage(true);
        toast.info(
          EwasteIssues[Math.floor(Math.random() * EwasteIssues.length)],
          {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }, 10000);
    }
  }, []);
  useEffect(() => {
    document.documentElement.classList.remove("no-js");

    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=pk.eyJ1Ijoic2h1ZW5jZSIsImEiOiJjbG9wcmt3czMwYnZsMmtvNnpmNTRqdnl6In0.vLBhYMBZBl2kaOh1Fh44Bw`
          )
            .then((response) => response.json())
            .then((data) => {
              const city = data.features[0].context.find(
                (context: { id: string | string[] }) =>
                  context.id.includes("place")
              ).text;
              const state = data.features[0].context.find(
                (context: { id: string | string[] }) =>
                  context.id.includes("region")
              ).text;
              setLocation(`${city}, ${state}`);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        },
        (error) => {
          console.error(error);
        },
        options
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHeaderActive(true);
      } else {
        setIsHeaderActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { user, setUser, setToken } = useAuth();
  const router = useRouter();
  console.log(user);
  const toggleNavbar = () => {
    setIsNavbarActive(!isNavbarActive);
  };

  return (
    <header className={`header ${isHeaderActive ? "active" : ""}`} data-header>
      <div className="bg-[var(--go-green)] w-full flex justify-between px-8">
        <Link href="/">
          <div className="flex justify-center items-center">
            <img
              src="https://moef.gov.in/wp-content/uploads/2018/10/right_logo.png"
              className="h-24 w-24"
              alt=""
            />
            <p className="font-semibold text-white text-sm xl:text-xl ml-1">
              Ministry of Environment, Forest and Climate Change
            </p>
          </div>
        </Link>
        <h1 className="font-montserrat font-bold text-xl ml-12 md:ml-4 md:text-2xl text-white flex items-center gap-[1vh]">
          <IonIcon icon={location} aria-hidden="true" role="img"></IonIcon>
          {locations || "Loading..."}
        </h1>
      </div>
      <div className="container shadow-md">
        <Link href="/">
          <div className="flex justify-center items-center">
            <Image
              src={logo}
              className="h-32 w-32 ml-16 object-contain"
              alt=""
            />
          </div>
        </Link>

        <nav className={`navbar ${isNavbarActive ? "active" : ""}`} data-navbar>
          <div className="wrapper">
            <Link href="/" className="logo">
              ELocate
            </Link>
            <button
              className="nav-close-btn"
              aria-label="close menu"
              data-nav-toggler
              onClick={toggleNavbar}
            >
              <IonIcon
                icon={closeOutline}
                className={`close-icon ${isNavbarActive ? "" : "hidden"}`}
              ></IonIcon>
            </button>
          </div>

          <ul className="navbar-list">
            <NavItem label="Home" />
            <NavItem label="About" />
            <NavItem label="E-Facilities" />
            <NavItem label="Recycle" />
            <NavItem label="Education" />
            <NavItem label="Contactus" />
            {/* <NavItem label="Rules" /> */}
            {user && <NavItem label="Requests" />}
          </ul>
        </nav>

        {user ? (
          <div className="relative flex justify-between items-center">
            <Link href="/redeem" className="btn-md btn-outline md:mr-4">
              Redeem coins
            </Link>
            <button
              className="md:mr-8 text-sm md:text-xl font-semibold"
              onClick={handleToggleDropdown}
            >
              {user?.name || ""}
            </button>

            {isDropdownOpen && (
              <div className="absolute top-12 right-0 projects p-4  shadow-md divide-y rounded-lg w-44 mt-2">
                <Link href="/profile" className="hover:text-emerald-500">
                  Profile
                </Link>
                <button
                  className="hover:text-emerald-500"
                  onClick={() => {
                    handleLogout();
                    setUser(null);
                    setToken(null);
                    router.push("/");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/sign-in" className="btn-md btn-outline md:mr-4">
              SignIn
            </Link>
          </>
        )}
        <button
          className="nav-open-btn"
          aria-label="open menu"
          data-nav-toggler
          onClick={toggleNavbar}
        >
          <IonIcon icon={menuOutline} aria-hidden="true" role="img"></IonIcon>
        </button>

        <div
          className={`overlay ${isNavbarActive ? "active" : ""}`}
          data-nav-toggler
          data-overlay
          onClick={toggleNavbar}
        ></div>
      </div>
    </header>
  );
};

const NavItem = ({ label }: NavItemProps) => {
  return (
    <li className="navbar-link">
      <Link href={label === "Home" ? "/" : `/${label.toLowerCase()}`}>
        {label}
      </Link>
    </li>
  );
};

export default Header;
