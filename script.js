// Target Elements in the DOM
const searchbtn = document.querySelector("#searchbtn");
const input = document.querySelector(".searchbox input");
const celcius = document.querySelector(".weather-celciusVal");
const humidity = document.querySelector(".humidityBox");
const windSpeed = document.querySelector(".windSpeedBox");
const city = document.querySelector(".cityBox");
const conditions = document.querySelector(".condition");
const lastUpdated = document.querySelector(".lastUpdated");
const longitude = document.querySelector(".longitude");
const latiitude = document.querySelector(".latiitude");

// SearchBtn logic
searchbtn.addEventListener("click", () => {
  let inputVal = input.value;
  if (inputVal == "") {
    alert("Please provide valid input");
    return;
  }
  fetchWeather(inputVal);
  input.value = "";
});

const fetchWeather = (inputVal) => {
  let url = `https://api.weatherapi.com/v1/current.json?key=f7545fb9b90c4ec197345653232409&q=${inputVal}&aqi=no`;

  let p1 = fetch(url);
  p1.then((response) => {
    console.log(response.status);
    return response.json();
  })
    .then((data) => {
      console.log(data);
      const conditionpresent = data.current.condition.text;
      console.log("Condition", conditionpresent);
      if (conditionpresent === "Clear") {
        conditions.innerHTML = `<i class="uil uil-rainbow condition-icon"></i>`;
      } else if (conditionpresent === "Mist") {
        conditions.innerHTML = `<i class="uil uil-wind condition-icon"></i>`;
      } else if (conditionpresent === "Sunny") {
        conditions.innerHTML = `<i class="uil uil-brightness condition-icon"></i>`;
      } else if (conditionpresent === "Patchy rain possible") {
        conditions.innerHTML = `<i class="uil uil-cloud-showers-heavy condition-icon"></i>`;
      } else if (conditionpresent === "Partly cloudy") {
        conditions.innerHTML = `<i class="uil uil-cloud-sun condition-icon"></i>`;
      } else if (conditionpresent === "Light rain shower") {
        conditions.innerHTML = `<i class="uil uil-cloud-sun-rain condition-icon"></i>`;
      } else if (conditionpresent === "Light rain") {
        conditions.innerHTML = `<i class="uil uil-cloud-drizzle condition-icon"></i>`;
      } else if (conditionpresent === "Overcast") {
        conditions.innerHTML = `<i class="uil uil-clouds condition-icon"></i>`;
      }
      celcius.innerHTML = `${data.current.temp_c} °C`;
      lastUpdated.innerHTML = `Last Updated: ${data.current.last_updated}`;
      longitude.innerHTML = `Lat ${data.location.lat}°`;
      latiitude.innerHTML = `Long ${data.location.lon}°`;
      humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
      windSpeed.innerHTML = `Wind Speed: ${data.current.wind_kph} Km/hr`;
      city.innerHTML = `${data.location.name}, ${data.location.country}`;
    })
    .catch((err) => {
      console.log("Error Fetching Weather", err);
      alert("Cannot Fetch Weather details");
    });
};

// window.onload = () =>{
//     fetchWeather("new delhi");
// }