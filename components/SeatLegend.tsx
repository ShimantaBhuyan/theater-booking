import React from "react";
import SeatIcon from "./SeatIcon";
import { Seat as SeatProps } from "@store/store";

export const SeatLegend: React.FC = () => {
  const fillColor = (status: string) => {
    switch (status) {
      case "booked":
        return "fill-purple-600";
      case "reserved":
        return "fill-gray-400";
      case "disabled":
        return "fill-gray-800";
      case "available":
        return "fill-green-300";
      case "selected":
        return "fill-purple-300";
      default:
        return "fill-purple-300";
    }
  };

  const getTooltip = (status: string) => {
    switch (status) {
      case "booked":
        return "This seat is booked";
      case "reserved":
        return "This seat is reserved";
      case "disabled":
        return "This seat is disabled";
      case "available":
        return "This seat is available";
      case "selected":
        return "This seat is currently selected by you";
      default:
        return "This is a seat";
    }
  };

  const legendLayout: SeatProps[] = [
    { id: "S-x-1", status: "booked" },
    { id: "S-x-2", status: "reserved" },
    { id: "S-x-3", status: "disabled" },
    { id: "S-x-4", status: "available" },
    { id: "S-x-5", status: "selected" },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <h2 className="text-md">Seat Legend</h2>

      <div className="flex flex-row justify-center items-center w-fit">
        {legendLayout.map((seat: SeatProps) => (
          <div
            className={`relative flex flex-col justify-center items-center group ${
              seat.status === "available" || seat.status === "selected" ? "cursor-pointer" : null
            } w-fit`}
            data-seat-id={seat.id}
            key={seat.id}
          >
            <SeatIcon className={`h-12 w-12 ${fillColor(seat.status)}`} />
            <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex rounded-md">
              <span className="relative min-w-[100px] z-10 p-2 text-xs leading-none text-gray-800 whitespace-no-wrap bg-gray-200 drop-shadow-2xl rounded-md">
                {getTooltip(seat.status)}
              </span>
              <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
