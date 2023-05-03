import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { UserProvider } from "./Context/UserContext";
import Browse from "./Pages/Browse/Browse";
import UserBookings from "./Pages/UserBookings/UserBookings";
import Userhouse from "./Pages/UserHouse/Userhouse";
import AddHouse from "./Pages/AddHouse/AddHouse";
import AddMoney from "./Pages/AddMoney/AddMoney";


function App() {
  return (
    <UserProvider>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-bookings" element={<UserBookings />} />
          <Route path="/user-houses" element={<Userhouse />} />
          <Route path="/add-house" element={<AddHouse />} />
          <Route path="/deposit-money" element={<AddMoney />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Route>

      </Routes>

    </UserProvider>
  );
}

export default App;
