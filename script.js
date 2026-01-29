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

// ----------- CITATION (ZenQuotes corrigé) -----------
const quoteEl = document.getElementById("quote");
const newQuoteBtn = document.getElementById("newQuote");

if (quoteEl && newQuoteBtn) {
    async function getQuote() {
        try {
            const res = await fetch("https://zenquotes.io/api/random");
            const data = await res.json();
            quoteEl.textContent = `"${data[0].q}" — ${data[0].a}`;
        } catch (err) {
            quoteEl.textContent = "Impossible de charger la citation.";
            console.error(err);
        }
    }

    newQuoteBtn.addEventListener("click", getQuote);
    getQuote();
}

// ----------- METEO (Open-Meteo, SANS CLÉ) -----------
const weatherEl = document.getElementById("weather");
const getWeatherBtn = document.getElementById("getWeather");

if (weatherEl && getWeatherBtn) {
    async function getWeather() {
        try {
            const res = await fetch(
                "https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current_weather=true"
            );
            const data = await res.json();
            weatherEl.textContent = `Paris : ${data.current_weather.temperature}°C`;
        } catch (err) {
            weatherEl.textContent = "Impossible de charger la météo.";
            console.error(err);
        }
    }

    getWeatherBtn.addEventListener("click", getWeather);
    getWeather();
}
