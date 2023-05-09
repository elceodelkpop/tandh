const glass = document.querySelector("#glass");
const btnTemperature = document.querySelector("#btn_temperature");
const temperature = document.querySelector("#temperature");
const levelTemperature = document.querySelector("#level_temperature");
const progressTemperature = document.querySelector("#progress_temperature");
const btnHumidity = document.querySelector("#btn_humidity");
const humidity = document.querySelector("#humidity");
const levelHumidity = document.querySelector("#level_humidity");
const progressHumidity = document.querySelector("#progress_humidity");

var dataT = [];
var dataH = [];
var t = 0;
var h = 0;
setInterval(() => {
    fetch('/temperature')
        .then(response => response.json())
        .then(data => {
            t = data.temperature;
            dataT.push(data.temperature);
            load();
        })
        .catch(error => console.error(error));

    fetch('/humidity')
        .then(response => response.json())
        .then(data => {
            h = data.humidity;
            dataH.push(data.humidity);
            load();
        })
        .catch(error => console.error(error));
}, 1000);

function toggleGlass() {
    if (glass.style.visibility == 'visible') {
        glass.style.opacity = '0';
        glass.style.visibility = 'hidden';
    }
    else {
        glass.style.opacity = '1';
        glass.style.visibility = 'visible';
    }
}

function load() {
    levelTemperature.innerText = t + "°C"
    levelHumidity.innerText = h + "%";
    progressTemperature.style.height = (t+50) + "%";
    progressHumidity.style.height = h + "%";
}

btnTemperature.addEventListener("click", function () {
    toggleGlass();
    if(temperature.style.transform == "translateY(120%)" || humidity.style.transform == "") {
        temperature.style.transform = "translateY(0)";
    }
    else {
        temperature.style.transform = "translateY(120%)";
    }
});

btnHumidity.addEventListener("click", function () {
    toggleGlass();
    if(humidity.style.transform == "translateY(120%)" || humidity.style.transform == "") {
        humidity.style.transform = "translateY(0)";
    }
    else {
        humidity.style.transform = "translateY(120%)";
    }
})

glass.addEventListener("click", function () {
    toggleGlass();
    humidity.style.transform = "translateY(120%)";
    temperature.style.transform = "translateY(120%)";
});
