import { getRealData } from './data/real_data.js';
import { getSimulatedData } from './data/simulated_data.js';

const urlParams = new URLSearchParams(window.location.search);
const param = urlParams.get('param');

const paramLabels = {
  temperature: "🌡️ Temperatură exterioară",
  humidity: "💧 Umiditate atmosferică",
  pressure: "🧭 Presiune atmosferică",
  vibration: "🌍 Nivel de vibrații",
  airQuality: "🫁 Calitate aer (AQI)",
  noise: "🔊 Nivel de zgomot",
  light: "💡 Intensitate luminoasă"
};

document.getElementById('chart-title').innerText = `Grafic: ${paramLabels[param] || param}`;
document.getElementById('definition').innerText = {
  temperature: 'Temperatura reprezintă măsura gradului de încălzire a aerului.',
  humidity: 'Umiditatea exprimă cantitatea de vapori de apă din aer.',
  pressure: 'Presiunea atmosferică este forța exercitată de coloana de aer de deasupra unui punct.',
  vibration: 'Vibrațiile pot indica mișcări seismice sau activitate mecanică.',
  airQuality: 'Calitatea aerului (AQI) indică nivelul de poluare al aerului.',
  noise: 'Zgomotul este măsurat în decibeli și reflectă intensitatea sunetului.',
  light: 'Luminozitatea indică intensitatea luminii din mediul înconjurător.'
}[param] || '';

const ctx = document.getElementById('paramChart').getContext('2d');
let history = Array(10).fill(null);

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: Array(10).fill(''),
    datasets: [{
      label: paramLabels[param] || param,
      data: history,
      borderColor: 'gold',
      backgroundColor: 'rgba(255, 215, 0, 0.2)',
      tension: 0.4
    }]
  },
  options: { responsive: true, scales: { y: { beginAtZero: true } } }
});

async function updateChart() {
  const mode = document.getElementById('mode').value;
  const data = mode === 'real' ? await getRealData() : getSimulatedData();
  const value = data[param];
  history.push(value);
  history.shift();
  chart.data.datasets[0].data = history;
  chart.update();
  document.getElementById('numeric-value').innerText = `Valoare curentă: ${value}`;
}

document.getElementById('mode').addEventListener('change', () => updateChart());
setInterval(updateChart, 3000);
updateChart();