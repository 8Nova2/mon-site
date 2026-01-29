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
// =======================
// TÉLÉMÉTRIE NAVIGATEUR
// =======================

// 🔋 Batterie
const batteryEl = document.getElementById("battery");
if (batteryEl && navigator.getBattery) {
    navigator.getBattery().then(battery => {
        function updateBattery() {
            batteryEl.textContent =
                `${Math.round(battery.level * 100)}% (marche une fois sur deux)         - ` +
                (battery.charging ? "En charge" : "Sur batterie");
        }
        updateBattery();
        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingchange", updateBattery);
    });
}

// 🌐 Réseau
const networkEl = document.getElementById("network");
function updateNetwork() {
    if (!networkEl) return;
    const connection = navigator.connection;
    let text = navigator.onLine ? "En ligne" : "Hors ligne";
    if (connection) {
        text += ` | ${connection.effectiveType} | ${connection.downlink} Mb/s`;
    }
    networkEl.textContent = text;
}
window.addEventListener("online", updateNetwork);
window.addEventListener("offline", updateNetwork);
updateNetwork();

// 🖥️ Écran
const screenEl = document.getElementById("screen");
function updateScreen() {
    if (!screenEl) return;
    screenEl.textContent =
        `${window.innerWidth} x ${window.innerHeight}px`;
}
window.addEventListener("resize", updateScreen);
updateScreen();

// 🧠 Mémoire JS (Chrome)
const memoryEl = document.getElementById("memory");
function updateMemory() {
    if (!memoryEl) return;
    if (performance.memory) {
        const used = Math.round(performance.memory.usedJSHeapSize / 1048576);
        memoryEl.textContent = `${used} MB utilisés`;
    } else {
        memoryEl.textContent = "Non supporté";
    }
}
setInterval(updateMemory, 2000);
updateMemory();

// ⚡ FPS réel
const fpsEl = document.getElementById("fps");
let lastFrame = performance.now();
let frames = 0;

function fpsLoop(now) {
    frames++;
    if (now - lastFrame >= 1000) {
        fpsEl.textContent = `${frames} FPS`;
        frames = 0;
        lastFrame = now;
    }
    requestAnimationFrame(fpsLoop);
}
if (fpsEl) requestAnimationFrame(fpsLoop);

// =======================
// SPEEDTEST PAGE 5
// =======================
const startBtn = document.getElementById("start");
const pingEl = document.getElementById("ping");
const downloadEl = document.getElementById("download");
const progressFill = document.getElementById("progress");

if (startBtn && pingEl && downloadEl && progressFill) {
    startBtn.addEventListener("click", async () => {
        startBtn.disabled = true;
        pingEl.textContent = "…";
        downloadEl.textContent = "…";
        progressFill.style.width = "0%";

        try {
            // -------- PING --------
            // Ping simulé avec fichier local
            const pingStart = performance.now();
            await fetch("test-file.bin", { cache: "no-store" });
            const ping = Math.round(performance.now() - pingStart);
            pingEl.textContent = ping;


            // -------- DOWNLOAD --------
            const fileUrl = "https://speed.cloudflare.com/__down?bytes=5000000"; // 5 MB
            const startTime = performance.now();
            const response = await fetch(fileUrl, { cache: "no-store" });
            const reader = response.body.getReader();
            const contentLength = +response.headers.get('Content-Length');
            let receivedLength = 0;

            while(true) {
                const {done, value} = await reader.read();
                if (done) break;
                receivedLength += value.length;
                const percent = Math.round((receivedLength / contentLength) * 100);
                progressFill.style.width = percent + "%";
            }

            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000;
            const bitsLoaded = 5_000_000 * 8;
            const speedMbps = (bitsLoaded / duration / 1_000_000).toFixed(2);

            downloadEl.textContent = speedMbps;
            progressFill.style.width = "100%";

        } catch (err) {
            pingEl.textContent = "Erreur";
            downloadEl.textContent = "Erreur";
            console.error(err);
            progressFill.style.width = "0%";
        }

        startBtn.disabled = false;
    });
}
