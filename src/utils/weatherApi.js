import { API_KEY } from "./constants";

export function getWeatherData(latitude, longitude) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching weather: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      return {
        temperature: Math.round(data.main.temp),
        city: data.name,
        type: defineWeatherType(data.main.temp),
      };
    });
}

function defineWeatherType(temp) {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}
