export function getSimulatedData() {
  return {
    temperature: (Math.random() * 30 + 5).toFixed(1),
    humidity: (Math.random() * 60 + 20).toFixed(0),
    pressure: (Math.random() * 20 + 1000).toFixed(0),
    vibration: (Math.random() * 10).toFixed(2),
    airQuality: Math.floor(Math.random() * 201),
    noise: Math.floor(Math.random() * 70 + 30),
    light: Math.floor(Math.random() * 20000 + 500),
  };
}