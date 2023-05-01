import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { UserProvider } from "./Context/UserContext";
import Browse from "./Pages/Browse/Browse";
import AllHouseList from "./Components/AllHouseList/AllHouseList";
import Userhouse from "./Userhouse";
import Footer from "./Footer";


function App() {
  return (
    <UserProvider>
    
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<Footer/>} />
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
  
        </Route>
       
      </Routes>
  
    </UserProvider>
  );
}

export default App;
