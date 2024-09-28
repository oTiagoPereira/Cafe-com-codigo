const apiKey = "95234b9b553150e89196be0f7d36f5c5"; // Sua chave da API

// Função assíncrona para buscar dados do clima com base na cidade fornecida
async function fetchWeather(city) {
  try {
    document.getElementById("loader").style.display = "block"; // Mostra o carregador
    // Faz uma requisição para a API do OpenWeatherMap com a cidade e a chave da API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    // Converte a resposta da API de JSON para um objeto JavaScript
    const data = await response.json();

    document.getElementById("loader").style.display = "none"; // Esconde o carregador

    // Verifica se a resposta da API foi bem-sucedida (codigo 200)
    if (data.cod === 200) {
     const temperature = data.main.temp; 
     const weatherDescription = data.weather[0].description; 
     const iconCode = data.weather[0].icon; 
     const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; 

     document.getElementById('weather').innerHTML = `
                <img src="${iconUrl}" alt="${weatherDescription}" />
                Temperatura: ${temperature.toFixed(2)}°C - ${weatherDescription}`;
    } else {
      document.getElementById("weather").innerHTML =
        "Cidade inválida";
    }
  } catch (error) {
    console.error("Erro ao buscar dados do clima: ", error);
  }
}

// Adiciona um evento para executar a função quando o DOM estiver completamente carregado
document.addEventListener("DOMContentLoaded", () => {
  fetchWeather('Salvador');

  document.getElementById("search-button").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    if (city) {
     fetchWeather(city);
    }
  });
});
