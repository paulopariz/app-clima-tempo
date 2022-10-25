const input = document.querySelector("input");
const button = document.querySelector("button");

const place = document.querySelector("#place");
const degrees = document.querySelector("#degrees");
const img = document.querySelector("img");


const umidityElement = document.querySelector("#umidity");
const wind = document.querySelector("#wind");
const tempMax = document.querySelector("#tempMax");
const tempMin = document.querySelector("#tempMin");

const content = document.querySelector(".content");


//TELA INICIAL
const homeScreen = document.querySelector(".homeScreen");

//ERRO DE CIDADE NAO ENCONTRADA
const erro = document.querySelector(".erro");
const iconErro = document.querySelector(".bi-exclamation-octagon");
const removText = document.querySelector(".homeScreen p:nth-child(3)")


function mostrarErro(){
  erro.style.display = "block";
  erro.style.color = "red";
  erro.style.marginTop = "5px"
  erro.style.marginLeft = "5px"
  homeScreen.style.display = "grid";
  homeScreen.style.color = "red";

  iconErro.style.color = "red";
  removText.style.display = "none";
}


function removContent(){
  content.style.display = "none";
 
}

async function getDataApi() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    input.value
  )}&units=metric&appid=8733360d18b91233d6eb5185fd0b7aaa`;

 

  //ERRO
  try {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data?.cod && data.cod === "404") { 
          return (mostrarErro(), removContent());

        }

        loadData(data);
      });
  } catch (error) {
    alert(error);
  }
}

function loadData(data) {

  place.innerHTML = `${data.name}, ${data.sys.country}`;
  degrees.innerHTML = `${Math.floor(data.main.temp)}°C`;
  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  wind.innerHTML = `${data.wind.speed} km/h`;
  umidityElement.innerText = `${data.main.humidity} %`;
  tempMax.innerText = `${Math.floor(data.main.temp_max)}°C`;
  tempMin.innerText = `${Math.floor(data.main.temp_min)}°C`;

  content.style.display = "block";
  homeScreen.style.display = "none";
  erro.style.display = "none";

};



button.addEventListener("click", () => {
  if (!input.value) return;

  getDataApi();
});

var cityInput = document.getElementById("city-input");

cityInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search").click();
  }
});





//DARK MODE
const changeThemeBtn = document.querySelector("#change-theme");

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function loadTheme() {
  const darkMode = localStorage.getItem("dark");

  if (darkMode) {
    toggleDarkMode();
  }
}

loadTheme();

changeThemeBtn.addEventListener("change", function () {
  toggleDarkMode();

  localStorage.removeItem("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark", 1);
  }
});