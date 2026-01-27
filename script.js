const bouton1 = document.getElementById("btnPage2");
const bouton2 = document.getElementById("btnPage3");
const bouton3 = document.getElementById("btnIndex");
const bouton4 = document.getElementById("btnPage4");

if (bouton1) {
    bouton1.addEventListener("click", () => {
        window.location.href = "page2.html";
    });
}

if (bouton2) {
    bouton2.addEventListener("click", () => {
        window.location.href = "page3.html";
    });
}

if (bouton3) {
    bouton3.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

if (bouton4) {
    bouton4.addEventListener("click", () => {
        window.location.href = "page4.html";
    });
}

// ----------- COMPTEUR -----------
let count = 0;
const addBtn = document.getElementById("add");
const countEl = document.getElementById("count");
if (addBtn && countEl) {
    addBtn.addEventListener("click", () => {
        count++;
        countEl.textContent = count;
    });
}

// ----------- HEURE -----------
const timeEl = document.getElementById("time");
if (timeEl) {
    function updateTime() {
        const now = new Date();
        timeEl.textContent = now.toLocaleTimeString();
    }
    setInterval(updateTime, 1000);
    updateTime();
}

// ----------- CITATION -----------
const quoteEl = document.getElementById("quote");
const newQuoteBtn = document.getElementById("newQuote");
if (quoteEl && newQuoteBtn) {
    async function getQuote() {
        try {
            const res = await fetch("https://api.quotable.io/random");
            const data = await res.json();
            quoteEl.textContent = `"${data.content}" — ${data.author}`;
        } catch (err) {
            quoteEl.textContent = "Impossible de charger la citation.";
        }
    }
    newQuoteBtn.addEventListener("click", getQuote);
    getQuote();
}

// ----------- METEO -----------
const weatherEl = document.getElementById("weather");
const cityInput = document.getElementById("city");
const getWeatherBtn = document.getElementById("getWeather");
if (weatherEl && cityInput && getWeatherBtn) {
    const API_KEY = "9c24d79616645e95b610428f9f99a230"; 
    async function getWeather() {
        const city = cityInput.value || "Paris";
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`);
            const data = await res.json();
            if(data.cod !== 200) throw new Error(data.message);
            weatherEl.textContent = `${data.name}: ${data.weather[0].description}, ${data.main.temp}°C`;
        } catch (err) {
            weatherEl.textContent = "Impossible de charger la météo.";
            console.error(err);
        }
    }
    getWeatherBtn.addEventListener("click", getWeather);
}
