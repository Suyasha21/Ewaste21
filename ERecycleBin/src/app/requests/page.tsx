"use client";
import React, { use, useEffect } from "react";
import { getUserID } from "../sign-in/auth";
import { toast } from "react-toastify";
import { useAuth } from "../utils/AuthContext";

type Props = {};

type DeviceInfo = {
  _id: string;
  deviceType: string;
  recycleItem: string;
  recycleItemPrice: number;
  pickupDate: string;
  pickupTimeSlot: string;
  address: string;
  phoneNumber: string;
  facility: string;
  status: string;
  deliveryBoy: string;
  deliveryBoyPhone: string;
};

const Requests = (props: Props) => {
  const [requests, setRequests] = React.useState<DeviceInfo[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    async function fetchData() {
      const userId = user?.id || null;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/data/get-requests?id=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setRequests(data.requests);
    }
    fetchData();
  }, []);
  const deleteRequestHandler = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/data/delete-request?id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      setRequests((prev) => {
        return prev.filter((device) => device._id !== id);
      });
      toast.success("Request deleted successfully", {
        position: "top-right",
      });
    } else {
      toast.error("Something went wrong", {
        position: "top-right",
      });
    }
  };
  return (
    <div className="min-h-screen w-full py-48 flex flex-col gap-16 justify-start items-center">
      <h1 className="text-4xl font-extrabold">Your Requests</h1>
      <div className="flex flex-wrap justify-around">
        {requests.length === 0 && (
          <div className="text-2xl font-bold text-center">No requests yet</div>
        )}
        {requests.map((device, index) => (
          <div
            key={index}
            className="max-w-sm rounded overflow-hidden flex flex-col justify-between shadow-lg m-4"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{device.deviceType}</div>
              <p>Device: {device.recycleItem}</p>

              <p>Recycle Price: {device.recycleItemPrice}</p>
              <p>Pickup Date: {device.pickupDate}</p>
              <p>Pickup Timeslot: {device.pickupTimeSlot}</p>
              <p>Location: {device.address}</p>
              <p>Phone: {device.phoneNumber}</p>
              <p>Facility: {device.facility}</p>
              <p>Status: {device.status}</p>
              {device.status === "Approved" ||
                (device.status === "Recieved" && (
                  <>
                    <p>Delivery Boy :{device.deliveryBoy}</p>
                    <p>Phone Number: {device.deliveryBoyPhone}</p>
                  </>
                ))}
            </div>
            <div className="px-6 py-4">
              {device.status !== "Approved" ? (
                device.status === "Recieved" ? (
                  <p className="bg-green-500  text-white font-bold py-2 px-4 rounded">
                    Recieved
                  </p>
                ) : (
                  <button
                    onClick={deleteRequestHandler.bind(null, device._id)}
                    className="bg-red-500 hover:bg-white hover:text-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                )
              ) : (
                <p className="bg-green-500  text-white font-bold py-2 px-4 rounded">
                  Approved
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
