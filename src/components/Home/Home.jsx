import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./home.scss";
import { cityList, apiPath } from "../../Constants";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Home() {
  const [city, SetCity] = useState("mumbai");
  const [movieData, SetMovieData] = useState(null);
  const changeCity = (id) => {
    SetCity(id);
  };
  useEffect(() => {
    axios.get(apiPath + `movies?location=${city}`).then((data) => {
      console.log(data);
      if (data) SetMovieData(data.data);
    });
  }, [city]);

  return (
    <div className="mainWrapper">
      <div>Select the city to watch movie </div>
      <DropdownButton
        id="dropdown-basic-button"
        title={city.toLocaleUpperCase()}
      >
        {cityList.map((id) => (
          <Dropdown.Item onClick={() => changeCity(id)}>
            {id.toLocaleUpperCase()}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      {movieData &&
        movieData.map((i) => (
          <Link to={`/book-seats/${i.id}`}>
            <div className="movieCard">
              <img src={i.poster} alt="poster not available" />
              <div>
                <div className="title">{i.name}</div>
                <div className="sub-title">{i.released_data}</div>
                <div className="sub-title">{i.location}</div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
