import React from "react";
import { useNavigate } from "react-router-dom";
import icon from "../assets/cloud_weather.png";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="p-1" style={{ backgroundColor: "#efefef" }}>
      <a onClick={() => navigate("/")}> 
        <img
          src={icon}
          alt="icono"
          style={{ maxHeight: "80px" }}
        />
      </a> 
    </div>
  );
};

export default Header;
