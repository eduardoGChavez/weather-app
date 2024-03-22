import Typography from "@mui/material/Typography";
import React from "react";

import imageNotFound from "../assets/wally.png"

const NotFound = () => {
  return (
		<div className="main_body__content">
      
      <Typography variant="h3" className="text-align-center" >
        404 Página no encontrada
      </Typography>
      <div className="flex justify-content-center mt-2 mb-2">
        <img src={imageNotFound} alt="Image Not found" />
      </div>
		</div>
	);
};

export default NotFound;
