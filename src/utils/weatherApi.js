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
      const tempF = data.main.temp;
      const tempC = ((tempF - 32) * 5) / 9;
    
      return {
        temperature: {
          F: Math.round(tempF),
          C: Math.round(tempC),
        },
        city: data.name,
        weatherType: {
          F: defineWeatherType(tempF, "F"),
          C: defineWeatherType(tempC, "C"),
        },
        isDay: data.dt > data.sys.sunrise && data.dt < data.sys.sunset,
      };
    });
}

function defineWeatherType(temp, unit = "F") {
  if (unit === "F") {
    if (temp >= 86) return "hot";
    if (temp >= 66) return "warm";
    return "cold";
  } else if (unit === "C") {
    if (temp >= 30) return "hot";
    if (temp >= 18) return "warm";
    return "cold";
  }
}
