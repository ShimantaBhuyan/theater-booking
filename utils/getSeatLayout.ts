import { CinemaLayout, Seat } from "@store/store";

export const getSeatLayout = (layout: CinemaLayout, initial?: boolean) => {
  const getRandomStatus = () => {
    if (initial != undefined && initial) {
      return "available";
    } else {
      const random = Math.floor(Math.random() * 4 + 1);
      if (random === 1) {
        return "available";
      } else if (random === 2) {
        return "booked";
      } else if (random === 3) {
        return "reserved";
      } else {
        return "disabled";
      }
    }
  };

  return layout.rows.reduce((seats: Seat[], row) => {
    for (let i = 1; i <= row.numCols; i++) {
      seats.push({
        id: `S-${row.id}-${i}`,
        status: getRandomStatus(),
      });
    }
    return seats;
  }, []);
};
