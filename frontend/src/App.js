import { Routes, Route, BrowserRouter } from 'react-router-dom';
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from './Pages/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
