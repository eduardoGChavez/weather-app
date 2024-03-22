import React, { FC, useMemo } from "react";

import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { isEmpty } from "../../utils/validations";
import { getForcastData } from "../../utils/formattingData";
import { useGetForecastWeatherQuery } from "../../redux_toolkit/weatherSlice";

import ForcastTable from "./ForcastTable";

interface forcastProps {
  longitude: string;
  latitude: string;
};

const Forcast: FC<forcastProps> = ({ latitude, longitude }) => {
  const {
    data,
    error,
    isLoading,
  } = useGetForecastWeatherQuery({ latitude, longitude });
  
  const fieldsBody = useMemo(() => {
    if (isEmpty(data) || !isEmpty(error)) return [];
    return getForcastData(data.list);
  }, [data]);

  
  const dates = useMemo(() => {
    if (isEmpty(fieldsBody)) return [];

    return Object.keys(fieldsBody);
  }, [fieldsBody]);

  return (
    <div>
      <Typography id="modal-modal-title-weather" variant="h6" component="h2" align="center">
        Clima de hoy a 4 días
      </Typography>
      {isLoading && (
        <div>
          <CircularProgress />
          Cargando predicción de clima.
        </div>
      )}

      
      {!isLoading && !isEmpty(error) && (
        <Typography variant="h6" className="bold pl-half text-align-center">
          No fue posible encontrar predicciones
        </Typography>
      )}
      
      {!isLoading && isEmpty(error) && (
        dates.map((date) => (
          <div
            key={`forcast-section-${date}`}
            style={{
              backgroundColor: "#e2e2e2",
              margin: "2rem",
              borderRadius: "15px",
            }}
          >
            <ForcastTable
              key={`forcast-table-${date}`}
              title={date}
              dataTable={fieldsBody[date]}
            />
          </div>
      )))}
    </div>
	);
};

export default Forcast;