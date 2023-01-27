import { CinemaLayout, Seat, useSeatStore } from "@store/store";
import { useEffect, useState } from "react";
import { getSeatLayout } from "utils/getSeatLayout";
import { SBClient } from "../utils/SBClient";
import CinemaTable from "./CinemaTable";
import SeatLayout from "./SeatLayout";

export const Admin = () => {
  const [status, setStatus] = useState("available");
  const [currentCinemaLayout, setCurrentCinemaLayout] = useState<CinemaLayout>({ rows: [] });
  const { setCinemaLayout, setSeats, reserveSeats, disableSeats } = useSeatStore();
  const cinemaLayout = useSeatStore(state => state.cinemaLayout);
  const seats = useSeatStore(state => state.seats);

  const supabase = SBClient.getInstance();

  useEffect(() => {
    const getDBValues = async () => {
      const rowsData = await supabase.fetchRows();
      const seatsData = await supabase.fetchSeats();
      if (rowsData.success) {
        setCinemaLayout({ rows: rowsData.data?.data as Array<{ id: string; numCols: number; price: number }> });
      } else {
        alert("Failed to load cinema layout...");
      }
      if (seatsData.success) {
        setSeats(seatsData.data?.data as Seat[]);
      } else {
        alert("Failed to load seats for cinema...");
      }
    };
    getDBValues();
  }, []);

  const handleSubmit = async () => {
    const deleteCinemaTableResult = await supabase.delete("rows");
    const deleteSeatTableResult = await supabase.delete("seat");
    if (deleteCinemaTableResult.success) {
      if (deleteSeatTableResult.success) {
        const insertLayoutResult = await supabase.upsert("rows", cinemaLayout.rows);
        const insertSeatsResult = await supabase.upsert("seat", seats);
        if (insertLayoutResult.success) {
          alert("CINEMA LAYOUT DATA UPDATED SUCCESSFULLY");
        } else {
          alert("CINEMA LAYOUT DATA UPDATE FAILED");
        }
        if (insertSeatsResult.success) {
          alert("SEATS DATA UPDATED SUCCESSFULLY");
        } else {
          alert("SEATS DATA UPDATE FAILED");
        }
      } else {
        alert("SEAT LAYOUT DELETION FAILED");
      }
    } else {
      alert("CINEMA LAYOUT DELETION FAILED");
    }
  };

  const handleUpdate = () => {
    if (status === "reserved") {
      reserveSeats();
    } else if (status === "disabled") {
      disableSeats();
    }
  };

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };

  const generateCinema = (rows: Array<{ id: string; numCols: number; price: number }>) => {
    setCinemaLayout({ rows });
    setSeats(getSeatLayout({ rows }, true));
  };

  useEffect(() => {
    console.log({ cinemaLayout });
    if (cinemaLayout.rows.length > 0) {
      setCurrentCinemaLayout(cinemaLayout);
    }
  }, [cinemaLayout]);

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl mb-5">Create Cinema Layout</h1>
      <CinemaTable getValues={generateCinema} />
      {currentCinemaLayout.rows.length > 0 ? (
        <>
          <h2 className="text-md">Current layout</h2>
          <SeatLayout />
          <div className="flex flex-col justify-center items-center gap-5 w-[200px] mt-5">
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-500 w-full">
              Seat Status:
              <select
                value={status}
                onChange={handleStatusChange}
                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Chose selected status</option>
                <option value="reserved">Reserved</option>
                <option value="disabled">Disabled</option>
              </select>
            </label>

            <button
              type="button"
              onClick={handleUpdate}
              className="px-4 py-2 bg-gray-700 rounded-md w-full text-gray-300 dark:text-gray-300 drop-shadow-lg"
            >
              Update Selected Seats
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-700 rounded-md w-full text-gray-300 dark:text-gray-300 drop-shadow-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};
