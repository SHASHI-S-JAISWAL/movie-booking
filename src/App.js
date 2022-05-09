import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Seats from "./components/Seats/Seats";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="book-seats" element={<Seats />} />
      </Route>
    </Routes>
  );
}

export default App;
