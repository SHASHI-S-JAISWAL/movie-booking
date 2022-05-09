import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { apiPath } from "../../Constants";
import "./seats.scss";

const greySeat = "https://i.ibb.co/wwXCpFV/grey-seat.png";
const blueSeat =
  "https://i.ibb.co/Km0x9GH/icons8-theatre-seat-80-1-removebg-preview.png";

export default function Seats() {
  const [selectedSeat, SetSeat] = useState(null);
  const [seatsData, SetSeatsData] = useState(null);
  const { movieId } = useParams();
  const [showAlert, SetShowAlert] = useState(false);

  const changeSeat = (item) => {
    if (!item.reservationId) SetSeat(item);
  };
  const bookSeat = () => {
    SetShowAlert(false);
    axios
      .post(
        apiPath +
          `reservations/reserve-seat?movieId=${movieId}&seatId=${selectedSeat.seatId}`,
        {
          movieId,
          seatId: selectedSeat.seatId,
        }
      )
      .then((data) => {
        console.log(data);
        SetSeat(null);
        SetShowAlert(true);
      });
  };
  console.log(selectedSeat);

  let getData = useCallback(() => {
    axios.get(apiPath + `seats?movieId=${movieId}`).then((data) => {
      console.log(data);
      if (data) SetSeatsData(data.data);
    });
  }, [movieId]);
  useEffect(() => {
    if (showAlert) getData();
  }, [getData, movieId, showAlert]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <div className="mainWrapper">
        <div className="screen">
          <div>Movie Screen</div>
        </div>
        <div className="title">Select seat </div>
        <div className="seatWrapper">
          {seatsData &&
            seatsData.map((i) => (
              <div className="seats" onClick={() => changeSeat(i)}>
                <img src={i.reservationId ? greySeat : blueSeat} alt="" />
                {/* <div>
              <div className="title">{i.name}</div>
              <div className="sub-title">{i.released_data}</div>
              <div className="sub-title">{i.location}</div>
            </div> */}
              </div>
            ))}
        </div>
        <Button variant={"primary"} disabled={!selectedSeat} onClick={bookSeat}>
          Book Seat
        </Button>
      </div>
      {showAlert && (
        <Alert
          key={"primary"}
          variant={"primary"}
          onClose={() => SetShowAlert(false)}
        >
          the seat was booked
        </Alert>
      )}
    </>
  );
}
