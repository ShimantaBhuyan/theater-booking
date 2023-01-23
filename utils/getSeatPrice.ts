import { CinemaLayout, Seat } from "@store/store";

export const getSeatPrice = (seats: string[], layout: CinemaLayout) => {
  if (seats.length === 0) {
    return [];
  }
  return seats.map(seatId => {
    let rowID = seatId.split("-")[1];
    let price = (layout.rows.find(row => row.id == rowID)?.price ?? 0).toString();
    return [seatId, price];
  });
};
