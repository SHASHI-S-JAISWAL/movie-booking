import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiPath } from "../../Constants";
import { useAuth } from "../../context/AuthContext";
import "./home.scss";
export default function MyBookings() {
  const [movieData, SetMovieData] = useState(null);
  const { currentUser } = useAuth();
  useEffect(() => {
    axios
      .get(apiPath + `my-bookings?userId=${currentUser.email}`)
      .then((data) => {
        if (data) {
          let obj = {};
          data.data.forEach((i) => {
            obj[i.id] = { ...i, ...obj[i.id] };
            obj[i.id].seats =
              obj[i.id].seats && obj[i.id].seats.length
                ? [...obj[i.id].seats, i.seatId]
                : [i.seatId];
          });
          SetMovieData(Object.values(obj));
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mainWrapper">
      <div>Please find your movie bookings</div>
      {movieData &&
        movieData.map((i) => (
          <div className="movieCard">
            <img src={i.poster} alt="poster not available" />
            <div>
              <div className="title">{i.name}</div>
              <div className="sub-title">{i.released_data}</div>
              <div className="sub-title">{i.location}</div>
              <div className="sub-title">
                Seats booked- {i.seats.join(", ")}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
