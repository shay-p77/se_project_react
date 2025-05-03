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
      const temperature = Math.round(data.main.temp);
      const city = data.name;

      const weatherMain = data.weather[0].main.toLowerCase();  
      const weatherType = mapWeatherType(weatherMain);

      const currentTime = data.dt;
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;
      const isDay = currentTime >= sunrise && currentTime < sunset;

      return {
        temperature,
        city,
        weatherType,
        isDay,
        type: defineWeatherType(temperature),  
      };
    });
}

 function mapWeatherType(weatherMain) {
  switch (weatherMain) {
    case "clear":
      return "sunny";
    case "clouds":
      return "cloudy";
    case "rain":
    case "drizzle":
      return "rainy";
    case "snow":
      return "snowy";
    case "thunderstorm":
      return "thunderstorm";
    case "fog":
    case "mist":
    case "haze":
    case "smoke":
    case "dust":
    case "sand":
    case "ash":
    case "squall":
      return "foggy";
    default:
      return "sunny";
  }
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
