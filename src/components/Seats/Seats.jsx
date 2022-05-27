import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { apiPath } from "../../Constants";
import { useAuth } from "../../context/AuthContext";
import "./seats.scss";

const greySeat = "https://cdn-icons-png.flaticon.com/512/302/302240.png";
const blueSeat = "https://cdn-icons-png.flaticon.com/512/302/302271.png";

export default function Seats() {
  const [selectedSeat, SetSeat] = useState(null);
  const [seatsData, SetSeatsData] = useState(null);
  const { movieId } = useParams();
  const [showAlert, SetShowAlert] = useState(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !currentUser.email) navigate("/login");
  }, [currentUser, navigate]);
  const changeSeat = (item) => {
    if (!item.reservationId) SetSeat(item);
  };
  const bookSeat = () => {
    SetShowAlert(false);
    axios
      .post(
        apiPath +
          `reservations/reserve-seat?movieId=${movieId}&seatId=${selectedSeat.seatId}&userId=${currentUser.email}`,
        {
          movieId,
          seatId: selectedSeat.seatId,
          userId: currentUser.email,
        }
      )
      .then((data) => {
        console.log(data);
        SetSeat(null);
        SetShowAlert(true);
      });
  };

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
