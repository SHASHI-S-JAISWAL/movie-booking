import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MyBookings from "./components/MyBookings/MyBookings";
import Seats from "./components/Seats/Seats";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="book-seats/:movieId" element={<Seats />} />
        <Route path="expenses" element={<div />} />
        <Route path="invoices" element={<div />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="my-bookings" element={<MyBookings />} />
      </Routes>
    </>
  );
}

export default App;
