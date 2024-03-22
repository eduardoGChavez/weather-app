import React, { FC, useMemo } from "react";

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';

import CellUser from "../Home/CellUser";
import humidityIcon from "../../assets/humidity.png";
import windIcon from "../../assets/wind_icon.svg";
import minTempIcon from "../../assets/min_temp.png";
import maxTempIcon from "../../assets/max_temp.svg";

import { isEmpty, icon } from "../../utils/validations";
import { getWeather } from "../../utils/formattingData";
import { useGetTodayWeatherQuery } from "../../redux_toolkit/weatherSlice";

interface user {
  id: string;
  name: string;
  longitude: string;
  latitude: string;
};

interface userInfoProps {
  user: user,
};

const UserInfo: FC<userInfoProps> = ({ user }) => {
  const latitude = user.latitude;
  const longitude = user.longitude;

  const {
    data,
    error,
    isLoading,
  } = useGetTodayWeatherQuery({ latitude, longitude });

  const weather = useMemo(() => {
    if (
      (isEmpty(data) || !isEmpty(error)) || (
        !isEmpty(data?.coord) && (isEmpty(latitude) || isEmpty(latitude))
      )
    ) {
      return {};
    }
    return getWeather(data);
  }, [data]);

  return (
    <div>
      <Typography id="modal-modal-title-weather" variant="h6" component="h2" align="center">
        Clima de hoy
      </Typography>

      <Grid container className="justify-content-center mb-2">
        {isLoading && (
          <div>
            <CircularProgress />
            Cargando predicción de clima.
          </div>
        )}
        {!isLoading && (!isEmpty(error) || isEmpty(weather)) && (
          <Typography variant="h6" className="bold pl-half">
            No se pudo encontrar el clima con la latitud y longitud proporcionados
          </Typography>
        )}
        {!isLoading && isEmpty(error) && !isEmpty(weather) && (
          <div>
            <Grid container>
              <div className="flex pr-1">
                <Tooltip title={weather.description} placement="top">
                  <Icon>
                    <img className="mr-1" src={icon(weather.icon)} height={24} width={24} />
                  </Icon>
                </Tooltip>
                <Typography variant="h6" className="bold pl-half">
                  {weather.temp}°C
                </Typography>
              </div>

              <div>
                <div className="flex pr-1">
                  <Icon>
                    <img className="mr-1" src={minTempIcon} height={24} width={24} />
                  </Icon>
                  <div className="flex flex-direction-column">
                    <Typography variant="caption" className="bold">
                      Temp. minima
                    </Typography>
                    <Typography variant="caption">
                      {weather.temp_min}°C
                    </Typography>
                  </div>
                </div>
                <div className="flex">
                  <Icon>
                    <img className="mr-1" src={maxTempIcon} height={24} width={24} />
                  </Icon>
                  <div className="flex flex-direction-column">
                    <Typography variant="caption" className="bold">
                      Temp. máxima
                    </Typography>
                    <Typography variant="caption">
                      {weather.temp_max}°C
                    </Typography>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex">
                  <Icon>
                    <img className="mr-1" src={humidityIcon} height={24} width={24} />
                  </Icon>
                  <Typography variant="h6" className="bold pl-half">
                    {weather.humidity}%
                  </Typography>
                </div>
                <div className="flex">
                  <Icon>
                    <img src={windIcon} height={24} width={24} />
                  </Icon>
                  <Typography variant="h6" className="bold pl-half">
                    {weather.wind_speed} m/s
                  </Typography>
                </div>
              </div>
            </Grid>
          </div>
        )}
        <CellUser
          name={user.name}
          latitude={user.latitude}
          longitude={user.longitude}
        />
      </Grid>

    </div>
	);
};

export default UserInfo;