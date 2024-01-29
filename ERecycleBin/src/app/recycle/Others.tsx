// import { facility } from "@/app/e-facilities/data/facility";
import {
  getEmail,
  getPhoneNumber,
  getUserID,
  getfullname,
  isAuthenticated,
} from "@/app/sign-in/auth";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { coinsMap } from "@/app/utils/constants";
import { RiCopperCoinFill } from "react-icons/ri";
import { useAuth } from "../utils/AuthContext";
import { message } from "antd";
import Image from "next/image";
import loader from "../../assets/recycle-2.gif";
interface Brand {
  category: string;
  items: string[];
}

interface Facility {
  _id: string;
  address: string;
  distance: number;
  facilityName: string;
  // capacity: number;
  lng: number;
  lat: number;
  phone: string;
  time: string;
  status: string;
}

interface BookingData {
  userId: string;
  userEmail: string;
  recycleItem: string;
  recycleItemPrice: number;
  pickupDate: string;
  pickupTimeSlot: string;
  facility: string; // Facility ID
  fullName: string;
  address: string;
  phone: number;
  image: any;
  status: string;
}
const deviceTypes = [
  "Mobile",
  "Laptop",
  "Desktop",
  "Keyboard",
  "Mouse",
  "Others",
];

const pickupTimeSlots = [
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
  "06:00 PM - 08:00 PM",
  "08:00 PM - 10:00 PM",
];
const Others: React.FC = () => {
  const { user } = useAuth();
  const email = user?.email || "";
  const userId = user?.id || "";
  const phone = user?.phoneNumber || "";
  const fullname = user?.name || "";

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [recycleItemPrice, setRecycleItemPrice] = useState<number>(0);
  const [pickupDate, setPickupDate] = useState<string>("");
  const [pickupTime, setPickupTime] = useState<string>("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(phone || "");
  const [models, setModels] = useState<string[]>([]);
  const [bookingData, setBookingData] = useState<BookingData[]>([]);
  const [facilityData, setFacilityData] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deviceType, setDeviceType] = useState("");
  const [pickupTimeSlot, setPickupTimeSlot] = useState("");
  const [image, setImage] = useState<any>(null);
  const [pridiction, setPridiction] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [loading, setLoading] = useState(false);
  let predictedCoins = 0;
  if (deviceType === "Mobile") {
    predictedCoins =
      coinsMap?.[deviceType]?.[selectedBrand]?.[selectedModel] ||
      coinsMap[deviceType]?.[selectedBrand]?.["Others"] ||
      coinsMap[deviceType]["Others"];
  } else if (deviceType === "Laptop") {
    predictedCoins =
      coinsMap[deviceType]?.[selectedBrand] || coinsMap[deviceType]?.["Others"];
  } else {
    predictedCoins = coinsMap[deviceType];
  }

  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      try {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/facility");
        let data = await res.json();
        setFacilityData(data);
      } catch (error) {
        message.error("something went wrong");
      }
      setLoading(false);
    };
    fetchFacilities();
  }, []);

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBrand(event.target.value);
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedModel(event.target.value);
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      message.error("Please Login to book a facility");
      return;
    }
    const recycleItem = selectedBrand + " " + selectedModel;
    console.log(recycleItem, isAuthenticated(), facilityData.length);
    console.log(facilityData, user);
    if (user?.id && facilityData.length > 0) {
      console.log("hi");
      if (
        recycleItem.length > 0 &&
        selectedFacility.length > 0 &&
        pickupDate.length > 0 &&
        pickupTimeSlot.length > 0 &&
        phone &&
        address.length > 0 &&
        userId.length > 0
      ) {
        const newBooking: any = {
          userId: userId,
          userEmail: email,
          deviceType: deviceType,
          recycleItem,
          recycleItemPrice,
          pickupDate,
          pickupTimeSlot,
          facility: selectedFacility,
          name: fullname,
          address: address,
          phoneNumber: phoneNumber as unknown as number,
          image: "image",
          status: "pending",
          credits: predictedCoins,
        };
        console.log(newBooking);
        setBookingData([...bookingData, newBooking]);
        setIsLoading(true);

        try {
          setLoading(true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/data/create-request`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newBooking),
            }
          );

          if (response.ok) {
            message.success("Booking Successful");
            setSelectedBrand("");
            setSelectedModel("");
            setSelectedFacility("");
            setRecycleItemPrice(0);
            setPickupDate("");
            setPickupTime("");
            setAddress("");
            setIsLoading(false);
          } else {
            toast.error("Error submitting data.", {
              autoClose: 3000,
            });
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error("Error submitting data.", {
            autoClose: 3000,
          });
        } finally {
          setLoading(false);
          setIsLoading(false);
        }
      } else {
        message.error("Please fill all the fields");
      }
    } else {
      message.error("Please fill all the fields");
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];
  useEffect(() => {
    if (!image || image === "") return;
    let reader = new FileReader();
    console.log("next");
    let base64String;
    reader.onload = function () {
      let base64String = "";
      if (reader && reader.result && typeof reader.result === "string") {
        base64String = reader?.result.replace("data:", "").replace(/^.+,/, "");
      }

      // imageBase64Stringsep = base64String;

      // alert(imageBase64Stringsep);
      console.log(base64String);
      setBase64Image(base64String);
      fetchPrediction(base64String);
    };
    reader.readAsDataURL(image);
    setLoading(false);
    const fetchPrediction = (image: string) => {
      fetch(
        "https://detect.roboflow.com/e-waste-detection-kayh1/2?api_key=pv6GAJtZXhX5yC2EDoWN",
        {
          method: "POST",
          body: image,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          const predictions = data.predictions;
          if (!predictions?.length) {
            setPridiction("No item detected");
            toast.error("No item detected", {
              position: "top-right",
              autoClose: 3000,
            });
            return;
          }
          predictions.sort((a: any, b: any) => b.confidence - a.confidence);
          setPridiction(predictions[0].class);
          console.log(predictions[0].class);
        })
        .catch(function (error) {
          console.log(error.message);
        });
      setLoading(false);
    };
  }, [image]);
  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <div className="loading-text">Submitting...</div>
      </div>
    );
  }
  const predictedItemMap: any = {
    smartphone: "Mobile",
    Laptop: "Laptop",
    Desktop: "Desktop",
    Keyboard: "Keyboard",
    Mouse: "Mouse",
    Others: "Others",
    "No item detected": "Others",
  };

  const brands = {
    Mobile: ["Samsung", "Apple", "Vivo", "Others"],
    Laptop: ["Samsung", "HP", "Apple", "Others"],
  };
  const modelsName = {
    Samsung: ["M31", "A51", "S20", "Others"],
    Apple: ["Iphone 11", "Iphone 12", "Iphone 12", "Others"],
  };

  return (
    <div className="container mx-auto p-8">
      <ToastContainer limit={1} />
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

      <h1 className="text-4xl font-bold mb-6 p-6 text-center">Book a PickUp</h1>
      <form
        className="grid grid-cols-1 md:grid-cols-2 mx-8 md:mx-0 gap-4 justify-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* <div className="mb-4">
          <label
            htmlFor="Image"
            className="block text-2xl font-medium text-gray-600"
          >
            Image :
          </label>
          <input
            onChange={(e) => {
              console.log(e.target.value, e.target.files);
              if (e.target?.files?.[0]) {
                setImage(e?.target?.files?.[0]);
              }
            }}
            type="file"
            accept="image/*"
            multiple={false}
            id="Image"
            className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
          />
        </div>
        {pridiction !== "" && (
          <div className="text-2xl flex flex-col justify-start items-start gap-4 font-medium text-green-600">
            <img src={URL.createObjectURL(image)} height={50} width={50} />
            Predicted Item : {predictedItemMap[pridiction] || "Others"}
          </div>
        )} */}
        <div className="mb-4">
          <label
            htmlFor="deviceType"
            className="block text-2xl font-medium text-gray-600"
          >
            Select Device Type:
          </label>
          <select
            id="deviceType"
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
            className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
          >
            <option value="">Select Device Type</option>
            {deviceTypes.map((deviceType) => (
              <option key={deviceType} value={deviceType}>
                {deviceType}
              </option>
            ))}
          </select>
          {deviceType !== "" && (
            <div className="text-2xl flex  justify-start items-start  font-medium text-green-600">
              Predicted Coins : {predictedCoins}{" "}
              <RiCopperCoinFill
                style={{
                  height: "20px",
                  width: "20px",
                }}
                color="green"
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-2xl font-medium text-gray-600"
          >
            Device Brand:
          </label>

          <input
            type="text"
            id="brand"
            value={selectedBrand}
            onChange={handleBrandChange}
            className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="model"
            className="block text-2xl font-medium text-gray-600"
          >
            Device Model:
          </label>
          <input
            type="text"
            id="model"
            value={selectedModel}
            onChange={handleModelChange}
            className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
          />
        </div>
        {/* <div className="mb-4">
          <label
            htmlFor="recycleItemPrice"
            className="block text-2xl font-medium text-gray-600"
          >
            Recycle Item Price:
          </label>
          <input
            type="number"
            id="recycleItemPrice"
            value={recycleItemPrice}
            onChange={(e) => setRecycleItemPrice(Number(e.target.value))}
            className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
          />
        </div> */}

        <div className="mb-4">
          <label
            htmlFor="pickupDate"
            className="block text-2xl font-medium text-gray-600"
          >
            Pickup Date:
          </label>
          <input
            type="date"
            id="pickupDate"
            value={pickupDate}
            min={currentDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="pickupTime"
            className="block text-2xl font-medium text-gray-600"
          >
            Pickup Time Slot
          </label>
          <select
            id="pickupTime"
            value={pickupTimeSlot}
            onChange={(e) => setPickupTimeSlot(e.target.value)}
            className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
          >
            <option value="">Select Pickup Time Slot</option>
            {pickupTimeSlots.map((pickupTimeSlot) => (
              <option key={pickupTimeSlot} value={pickupTimeSlot}>
                {pickupTimeSlot}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-2xl font-medium text-gray-600"
          >
            Location:
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-2xl font-medium text-gray-600"
          >
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={
              (e) => setPhoneNumber(e.target.value)
              // setPhoneNumber(Number(e.target.value))
            }
            className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="facility"
            className="block text-2xl font-medium text-gray-600"
          >
            Select Facility:
          </label>
          <select
            id="facility"
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
          >
            <option value="">Select Facility</option>
            {facilityData.map((facility) => (
              <option key={facility._id} value={facility._id}>
                {facility.facilityName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 md:col-span-2">
          <button
            onClick={() => {
              console.log("selectedFacility", selectedFacility);
              handleSubmit();
            }}
            type="submit"
            className="bg-[var(--go-green)] text-xl text-white px-6 py-3 rounded-md w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Others;
