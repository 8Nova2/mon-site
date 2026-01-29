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
            const res = await fetch(
                "https://cdn.jsdelivr.net/gh/lukePeavey/quotable@master/data/quotes.json"
            );
            const data = await res.json();
            const random = data[Math.floor(Math.random() * data.length)];
            quoteEl.textContent = `"${random.content}" — ${random.author}`;
        } catch (err) {
            quoteEl.textContent = "Parce qu'il est le héros que Gotham mérite. Pas celui dont on a besoin aujourd'hui... Alors nous le pourchasserons. Parce qu'il peut l'endurer. Parce que ce n'est pas un héros. C'est un Gardien silencieux... qui veille et protège sans cesse. C'est le Chevalier Noir.";
            console.error(err);
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
    async function getWeather() {
        const city = cityInput.value.trim();
        if (!city) {
            weatherEl.textContent = "Entre une ville.";
            return;
        }

        try {
            // 1. Géocodage
            const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=fr`
            );
            const geoData = await geoRes.json();

            if (!geoData.results) {
                weatherEl.textContent = "Ville introuvable.";
                return;
            }

            const { latitude, longitude, name, country } = geoData.results[0];

            // 2. Météo
            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
            );
            const weatherData = await weatherRes.json();

            weatherEl.textContent =
                `${name}, ${country} : ${weatherData.current_weather.temperature}°C`;
        } catch (err) {
            weatherEl.textContent = "Erreur météo.";
            console.error(err);
        }
    }

    getWeatherBtn.addEventListener("click", getWeather);
}
