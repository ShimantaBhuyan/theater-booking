import { create } from "zustand";

interface SelectionStore {
  seats: Seat[];
  selectedSeats: string[];
  cinemaLayout: CinemaLayout;
  setSeats: (seats: Seat[]) => void;
  toggleSeat: (seatId: string) => void;
  bookSeat: (seatId: string) => void;
  // getSeats: () => Seat[];
  // getSelectedSeats: () => string[];
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

export const useSeatStore = create<SelectionStore>((set, get) => ({
  seats: [],
  selectedSeats: [],
  cinemaLayout: dummyCinemaLayout,
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
  setCinemaLayout: (cinemaLayout: CinemaLayout) => {
    set(state => ({ ...state, cinemaLayout }));
  },
  // getSeats: () => {
  //   return get().seats;
  // },
  // getSelectedSeats: () => {
  //   return get().selectedSeats;
  // },
}));
