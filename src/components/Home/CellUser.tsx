import React, { FC } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";

import latitudeIcon from "../../assets/latitude_icon.png";
import longitudeIcon from "../../assets/longitude_icon.png";

interface userProps {
  name: string;
  latitude: string;
  longitude: string;
}

const CellUser: FC<userProps> = ({ name, latitude, longitude }) => {
  return (
    <div className="pl-2">
      <Typography>
        <Box sx={{ fontWeight: "bold", m: 1 }}>{name}</Box>
        <Box sx={{ fontWeight: "regular", m: 1 }}>
          <div className="flex">
            <Icon>
              <img src={latitudeIcon} height={26} width={26} />
            </Icon>
            <Typography className="bold pl-half pr-1">
              {latitude}
            </Typography>

            <Icon>
              <img src={longitudeIcon} height={26} width={26} />
            </Icon>
            <Typography className="bold pl-half">
              {longitude}
            </Typography>
          </div>
        </Box>
      </Typography>
    </div>
  );
};

export default CellUser;
