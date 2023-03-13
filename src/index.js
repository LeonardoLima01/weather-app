let searchForm = document.querySelector("#searchForm");
let searchInput = document.querySelector("#searchInput");
let nameDisplayed = document.querySelector("#locationName");
let weatherIcon = document.querySelector("#weatherIcon");
let temperature = document.querySelector("#temperature>#text");
let infoDisplay = document.querySelector("#info");

const apiKey = "add84e844eabefa7b3ae5594556d93e8";

async function getWeather(location) {
  let data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`,
    { mode: "cors" }
  );
  return await data.json();
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form from submitting

  let locationName = document.querySelector("#searchInput").value;
  getWeather(locationName).then((info) => {
    try {
      let iconCode = info["weather"][0]["icon"];

      nameDisplayed.textContent = info["name"];
      weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      temperature.textContent = info["main"]["temp"];
      infoDisplay.style.display = "flex";
    } catch (err) {
      console.log(err);
      searchInput.value = "";
      searchInput.placeholder = "Invalid location";
    }
  });
});
