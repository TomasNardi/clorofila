import { Routes, Route } from "react-router-dom";
import App from "./App";
import Home from './store/home'
import Taller from './pages/Taller'

const Router = () => {
  return (
    <Routes>
      <Route path="/"       element={<App />} />
      <Route path="/tienda" element={<Home />} />
      <Route path="/taller" element={<Taller />} />
    </Routes>
  );
};

export default Router;
