import React, { FC, useMemo } from "react";

import CircularProgress from '@mui/material/CircularProgress';

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
      {isLoading && (
        <div>
          <CircularProgress />
          Cargando predicción de clima.
        </div>
      )}

      
      {!isLoading && !isEmpty(error) && (
        <p>No fue posible encontrar predicciones </p>
      )}
      
      {!isLoading && isEmpty(error) && (
        dates.map((date) => (
          <div
            key={`forcast-section-${date}`}
            style={{
              backgroundColor: "#e2e2e2",
              margin: "2rem",
              borderRadius: "4px",
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