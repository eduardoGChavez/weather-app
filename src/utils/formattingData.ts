


export const getForcastData = (forcasts: any) => {
  try {
const subArreglos: any = {};
    forcasts.forEach((elemento: any) => {
      const stringSplit = elemento.dt_txt.split(" ");
      const key = stringSplit[0];
      const hour = stringSplit[1];
      if (!subArreglos[key]) {
        subArreglos[key] = [];
      }
      subArreglos[key].push({
        ...getWeather(elemento),
        hour
      });
    });

    return subArreglos;
  } catch (error) {
    console.error("Ocurrió un error en getForcastData", error)
    return [];
  }
};

interface mainProps {
  temp: number,
  temp_min: number,
  temp_max: number,
  humidity: number,
}

interface windProps {
  speed: number,
}

interface weatherProps {
  icon: string,
  description: string,
}

interface weather {
  main: mainProps,
  weather: weatherProps[],
  wind: windProps,
  name: string,
}
export const getWeather = (weather: weather) => {
  return {
    icon: weather.weather[0].icon,
    description: weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1),
    location: weather.name, 
    temp: weather.main.temp,
    temp_min: weather.main.temp_min,
    temp_max: weather.main.temp_max,
    humidity: weather.main.humidity,
    wind_speed: weather.wind.speed,
  }
}