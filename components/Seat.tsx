import React from "react";
import SeatIcon from "./SeatIcon";

interface SeatProps {
  id: string;
  status: "booked" | "reserved" | "disabled" | "available" | "selected";
  onClick: () => void;
}

export const Seat: React.FC<SeatProps> = ({ id, status, onClick }) => {
  const fillColor = () => {
    switch (status) {
      case "booked":
        return "fill-purple-700";
      case "reserved":
        return "fill-gray-400";
      case "disabled":
        return "fill-gray-600";
      case "available":
        return "fill-green-300";
      case "selected":
        return "fill-purple-300";
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center ${
        status === "available" || status === "selected" ? "cursor-pointer" : null
      } w-fit`}
      onClick={onClick}
      data-seat-id={id}
    >
      <SeatIcon className={`h-6 w-6 sm:h-12 sm:w-12 ${fillColor()}`} />
    </div>
  );
};
