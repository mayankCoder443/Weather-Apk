let text_box = document.getElementById("text");
let searchbtn = document.getElementById("search_btn");

async function checkWeather(city) {
  const api_key = "78864149fe3b40b49e8145241262302";
  const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=yes&units=metric`;

  try {
    const Response = await fetch(`${url} ${api_key}`);

    if (!Response.ok) {
      alert("City not Found");
      return;
    }
    const data = await Response.json();

    //Update UI WIth API Data;
    document.getElementById("city").innerText = data.location.name;
    document.getElementById("degree").innerText =
      Math.round(data.current.temp_c) + "°C";
    document.getElementById("humidity").innerText = data.current.humidity + "%";
    document.getElementById("wind").innerText = data.current.wind_kph + "km/h";
    document.getElementById("img").src = "https:" + data.current.condition.icon;
  } catch (err) {
    console.error("Error Fetching Weather Data :", err);
  }
}
searchbtn.addEventListener("click", () => {
  checkWeather(text_box.value);
});

// ALLOW PRESSING ENTER KEY TO SEARCH
text_box.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(text_box.value);
  }
});
