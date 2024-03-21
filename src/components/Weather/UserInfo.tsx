import React, { FC, useMemo } from "react";

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import CircularProgress from '@mui/material/CircularProgress';

import { isEmpty } from "../../utils/validations";
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
        !isEmpty(data?.coord) && (latitude !== data.coord.lat || longitude !== data.coord.lon)
      )
    ) {
      return {};
    }
    return getWeather(data);
  }, [data]);

  return (
    <div>
      {isLoading && (
        <div>
          <CircularProgress />
          Cargando información del clima de hoy.
        </div>
      )}

      
      {!isLoading && !isEmpty(error) && (
        <p>No fue posible encontrar información del clima de hoy.</p>
      )}



      <>
        <Grid container>
          <Typography className="flex" component="div">
            <Box sx={{ fontWeight: 'bold', marginRight: 1 }}>Nombre:{" "}</Box>
            <Box sx={{ fontWeight: 'regular' }}>{` ${user.name}`}</Box>
          </Typography>
        </Grid>

        <Grid container>
          <Typography className="flex" component="div">
            <Box sx={{ fontWeight: 'bold', marginRight: 1 }}>Latitud:{" "}</Box>
            <Box sx={{ fontWeight: 'regular' }}>{` ${user.latitude}`}</Box>
          </Typography>
        </Grid>

        <Grid container>
          <Typography className="flex" component="div">
            <Box sx={{ fontWeight: 'bold', marginRight: 1 }}>Longitud:{" "}</Box>
            <Box sx={{ fontWeight: 'regular' }}>{` ${user.longitude}`}</Box>
          </Typography>
        </Grid>
      </>
      

      
      <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
        Clima de hoy
      </Typography>

      {!isLoading && (!isEmpty(error) || isEmpty(weather)) && (
        <div>
          <p>No se encontraron datos</p>
        </div>
      )}

      {!isLoading && isEmpty(error) && !isEmpty(weather) && (
        <div>
          <Grid container>
            <Typography style={{ fontWeight: "bold" }}>
              Lugar:{" "}
            </Typography>
            <Typography className="bold">
              {weather.location}
            </Typography>
          </Grid>

          <Grid container>
            <Typography style={{ fontWeight: "bold" }}>
              Temperatura:{" "}
            </Typography>
            <Typography className="bold">
              {weather.temp}
            </Typography>
          </Grid>

          <Grid container>
            <Typography style={{ fontWeight: "bold" }}>
              Temperatura mínima:{" "}
            </Typography>
            <Typography className="bold">
              {weather.temp_min}
            </Typography>
          </Grid>

          <Grid container>
            <Typography style={{ fontWeight: "bold" }}>
              Temperatura máxima:{" "}
            </Typography>
            <Typography className="bold">
              {weather.temp_max}
            </Typography>
          </Grid>

          <Grid container>
            <Typography style={{ fontWeight: "bold" }}>
              Humedad:{" "}
            </Typography>
            <Typography className="bold">
              {weather.humidity}
            </Typography>
          </Grid>

          <Grid container>
            <Typography style={{ fontWeight: "bold" }}>
              Velocidad del viento:{" "}
            </Typography>
            <Typography className="bold">
              {weather.wind_speed}
            </Typography>
          </Grid>

        </div>
      )}
    </div>
	);
};

export default UserInfo;