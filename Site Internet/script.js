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
let count = 0;
document.getElementById("add").addEventListener("click", () => {
    count++;
    document.getElementById("count").textContent = count;
});


