import React from "react";
import icon from "../assets/cloud_weather.png";

const Header = () => {
  return (
    <div className="p-1" style={{ backgroundColor: "#efefef" }}>
      <img
        src={icon}
        alt="icono"
        style={{ maxHeight: "80px" }}
      />
    </div>
  );
};

export default Header;
