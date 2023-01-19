import { create } from "zustand";

export interface SelectionStore {
  selectedSeats: string[];
  bookedSeats: string[];
  reservedSeats: string[];
  disabledSeats: string[];
  toggleSeat: (seatId: string, meta: "booked" | "reserved" | "disabled") => void;
}

export const useSeatStore = create<SelectionStore>(set => ({
  selectedSeats: [],
  bookedSeats: [],
  reservedSeats: [],
  disabledSeats: [],
  toggleSeat: (seatId: string, meta: "booked" | "reserved" | "disabled") => {
    switch (meta) {
      case "booked":
        set(state => {
          const bookedSeats = state.bookedSeats.includes(seatId)
            ? state.bookedSeats.filter(id => id !== seatId)
            : [...state.bookedSeats, seatId];
          return { bookedSeats };
        });
        break;
      case "reserved":
        set(state => {
          const reservedSeats = state.reservedSeats.includes(seatId)
            ? state.reservedSeats.filter(id => id !== seatId)
            : [...state.reservedSeats, seatId];
          return { reservedSeats };
        });
        break;
      case "disabled":
        set(state => {
          const disabledSeats = state.disabledSeats.includes(seatId)
            ? state.disabledSeats.filter(id => id !== seatId)
            : [...state.disabledSeats, seatId];
          return { disabledSeats };
        });
        break;
    }
  },
}));
