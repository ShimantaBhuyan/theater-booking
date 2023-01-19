import { create } from "zustand";

interface SelectionStore {
  seats: Seat[];
  selectedSeats: string[];
  setSeats: (seats: Seat[]) => void;
  toggleSeat: (seatId: string) => void;
  bookSeat: (seatId: string) => void;
  getSeats: () => Seat[];
  getSelectedSeats: () => string[];
}

export interface Seat {
  id: string;
  status: "available" | "selected" | "booked" | "reserved" | "disabled";
}

export const dummyLayout: Seat[] = [
  { id: "S-1-1", status: "booked" },
  { id: "S-1-2", status: "reserved" },
  { id: "S-1-3", status: "disabled" },
  { id: "S-1-4", status: "available" },
  { id: "S-1-5", status: "available" },
  { id: "S-2-1", status: "booked" },
  { id: "S-2-2", status: "reserved" },
  { id: "S-2-3", status: "disabled" },
  { id: "S-2-4", status: "available" },
  { id: "S-2-5", status: "available" },
  { id: "S-3-1", status: "booked" },
  { id: "S-3-2", status: "reserved" },
  { id: "S-3-3", status: "disabled" },
  { id: "S-3-4", status: "available" },
  { id: "S-3-5", status: "available" },
];

export const useSeatStore = create<SelectionStore>((set, get) => ({
  seats: [],
  selectedSeats: [],
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
  getSeats: () => {
    return get().seats;
  },
  getSelectedSeats: () => {
    return get().selectedSeats;
  },
}));
