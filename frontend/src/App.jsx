import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import AddHouse from "./Pages/Dashboard/components/AddHouse/AddHouse";
import { UserProvider } from "./Context/UserContext";
import AllHouseList from "./Components/AllHouseList/AllHouseList";
import Userhouse from "./Userhouse";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-house" element={<AddHouse />} />
          <Route path="/browse" element={<AllHouseList />} />
          <Route path="/userhouse" element={<Userhouse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
