import { getSimulatedData } from './simulated_data.js';

const API_KEY = "c0f779c454373eb3043960c5af94065d";

export async function getRealData() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Cluj-Napoca&appid=${API_KEY}&units=metric&lang=ro`
    );
    const data = await response.json();

    return {
      temperature: data.main.temp.toFixed(1),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      vibration: (Math.random() * 10).toFixed(2),
      airQuality: Math.floor(Math.random() * 201),
      noise: Math.floor(Math.random() * 70 + 30),
      light: Math.floor(Math.random() * 20000 + 500),
    };
  } catch (err) {
    console.error("Eroare la conectarea cu OpenWeatherMap. Se folosește simulare:", err);
    return getSimulatedData();
  }
}
