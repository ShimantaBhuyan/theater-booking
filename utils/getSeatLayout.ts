import { CinemaLayout, Seat } from "@store/store";

export const getSeatLayout = (layout: CinemaLayout) => {
  //   let seats: Seat[] = [];
  //   for (let i = 0; i < layout.rows.length; i++) {
  //     for (let j = 0; j < layout.rows[i].numCols; j++) {
  //       seats.push({
  //         id: `S-${i}-${j}`,
  //         status: "available",
  //       });
  //     }
  //   }
  //   return seats;

  const getRandomStatus = () => {
    const random = Math.floor(Math.random() * 4 + 1);
    if (random === 1) {
      return "available";
    } else if (random === 2) {
      return "booked";
    } else if (random === 3) {
      return "reserved";
    } else if (random === 4) {
      return "disabled";
    }
    // return "available";
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
