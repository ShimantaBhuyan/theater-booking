import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectionStore {
  seats: Seat[];
  selectedSeats: string[];
  cinemaLayout: CinemaLayout;
  deselectAll: (removeSelectedOnly?: boolean) => void;
  setSeats: (seats: Seat[]) => void;
  toggleSeat: (seatId: string) => void;
  bookSeat: (seatId: string) => void;
  reserveSeats: () => void;
  disableSeats: () => void;
  setCinemaLayout: (layout: CinemaLayout) => void;
}

export interface CinemaLayout {
  rows: Row[];
}

interface Row {
  id: string;
  numCols: number;
  price: number;
}

export interface Seat {
  id: string;
  status: "available" | "selected" | "booked" | "reserved" | "disabled";
}

export const dummyCinemaLayout = {
  rows: [
    { id: "1", numCols: 6, price: 15 },
    { id: "2", numCols: 10, price: 20 },
    { id: "3", numCols: 8, price: 18 },
    { id: "4", numCols: 10, price: 12 },
  ],
};

export const useSeatStore = create<SelectionStore>()(
  persist(
    (set, get) => ({
      seats: [],
      selectedSeats: [],
      cinemaLayout: { rows: [] },
      setSeats: seats => set(state => ({ seats })),
      toggleSeat: seatId => {
        set(state => {
          const seats = [...state.seats];
          const selectedSeat = seats.find(seat => seat.id === seatId);
          if (!selectedSeat) return state;
          if (selectedSeat.status === "available") {
            selectedSeat.status = "selected";
            state.selectedSeats.push(seatId);
          } else if (selectedSeat.status === "selected") {
            selectedSeat.status = "available";
            state.selectedSeats = state.selectedSeats.filter(id => id !== seatId);
          }
          return { ...state, seats, selectedSeats: state.selectedSeats };
        });
      },
      deselectAll: (removeSelectedOnly?: boolean) => {
        set(state => {
          if (removeSelectedOnly != undefined && removeSelectedOnly) {
            return { ...state, selectedSeats: [] };
          } else {
            const seats = [...state.seats];
            state.selectedSeats.map(id => {
              let selectedSeat = seats.find(seat => seat.id === id);
              if (selectedSeat) selectedSeat.status = "available";
            });
            return { ...state, seats, selectedSeats: [] };
          }
        });
      },
      bookSeat: seatId => {
        set(state => {
          const seats = [...state.seats];
          const selectedSeat = seats.find(seat => seat.id === seatId);
          if (!selectedSeat) return state;
          if (selectedSeat.status === "selected") {
            selectedSeat.status = "booked";
          }
          return { ...state, seats, selectedSeats: state.selectedSeats.filter(id => id !== seatId) };
        });
      },
      reserveSeats: () => {
        set(state => {
          let seats = [...state.seats];
          const selectedSeats = state.selectedSeats.map((seatId: string) =>
            seats.find(seat => seat.id === seatId),
          ) as Seat[];
          if (selectedSeats && selectedSeats.length === 0) return state;
          selectedSeats.forEach(seat => {
            if (seat != undefined) seat.status = "reserved";
          });
          return { ...state, seats, selectedSeats: [] };
        });
      },
      disableSeats: () => {
        set(state => {
          let seats = [...state.seats];
          const selectedSeats = state.selectedSeats.map((seatId: string) =>
            seats.find(seat => seat.id === seatId),
          ) as Seat[];
          if (!selectedSeats.length) return state;
          selectedSeats.forEach(seat => {
            if (seat != undefined) seat.status = "disabled";
          });
          return { ...state, seats, selectedSeats: [] };
        });
      },
      setCinemaLayout: (cinemaLayout: CinemaLayout) => {
        set(state => ({ ...state, cinemaLayout }));
      },
    }),
    {
      name: "cinema-booking-storage", // name of the item in the storage (must be unique)
      // getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    },
  ),
);
