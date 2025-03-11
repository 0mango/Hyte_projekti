document.addEventListener("DOMContentLoaded", function () {
    const kirjauduNappi = document.getElementById("kirjaudu-nappi");
    const paivakirjaLinkki = document.querySelector(".top_nav a[href='#']");
    const popupTausta = document.getElementById("popup-tausta");
    const suljePopup = document.getElementById("sulje-popup");
    const kayttajaNimi = document.getElementById("name");
    const salasana = document.getElementById("password");
    const tallennaNappi = document.getElementById("tallenna");
    const isoLaatikko = document.getElementById("iso-laatikko");
    const lisääNappi = document.getElementById("lisää_teksti");
    const tallennaMerkintaNappi = document.getElementById("tallennnus"); // 🔹 Muutettu nimi
    const modal = document.getElementById("modal");
    const close = document.getElementById("close");
    const userInput = document.getElementById("userInput");

    isoLaatikko.style.display = "none";

    // Näytä popup, kun "Päiväkirja" -linkkiä painetaan
    paivakirjaLinkki.addEventListener("click", function (event) {
        event.preventDefault();
        popupTausta.style.display = "flex";
    });

    // Sulje popup, kun X-nappia painetaan
    suljePopup.addEventListener("click", function () {
        popupTausta.style.display = "none";
    });

    // Sulje popup, jos käyttäjä painaa taustaa
    popupTausta.addEventListener("click", function (event) {
        if (event.target === popupTausta) {
            popupTausta.style.display = "none";
        }
    });

    // 🔹 Kirjautumisfunktio
    tallennaNappi.addEventListener("click", async function (event) {
        event.preventDefault();

        const name = kayttajaNimi.value;
        const password = salasana.value;

        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password })
            });

            const data = await response.json();
            alert(data.message);
            if (response.ok) {
                localStorage.setItem("token", data.token);  // 🔹 Token tallennus
                popupTausta.style.display = "none";
                isoLaatikko.style.display = "block";
            }
        } catch (error) {
            console.error("Virhe kirjautumisessa:", error);
        }
    });

    // 🔹 Näytä päiväkirjan lisäysikkuna
    lisääNappi.addEventListener("click", function () {
        modal.style.display = "block";
    });

    // 🔹 Sulje modal-ikkuna
    close.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // 🔹 Tallennetaan päiväkirjamerkintä palvelimelle
    tallennaMerkintaNappi.addEventListener("click", async function () {
        const merkinta = userInput.value;
        const token = localStorage.getItem("token"); // 🔹 Haetaan token kirjautumisesta

        if (!token) {
            alert("Sinun täytyy kirjautua sisään!");
            return;
        }

        if (!merkinta.trim()) { // 🔹 Tarkistetaan, ettei merkintä ole tyhjä tai pelkkiä välilyöntejä
            alert("Merkintä ei voi olla tyhjä!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/entries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  // 🔹 Lähetetään token
                },
                body: JSON.stringify({ entry_text: merkinta })
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                userInput.value = "";
                modal.style.display = "none";
            } else {
                alert("Virhe tallennettaessa: " + data.message);
            }
        } catch (error) {
            console.error("Virhe tallennuksessa:", error);
            alert("Yhteysvirhe!");
        }
    });
});
document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");

    if (!token) {
        console.log("Ei kirjautunutta käyttäjää.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/entries", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const merkinnät = await response.json();
        console.log("Päiväkirjamerkinnät:", merkinnät); // 🔹 Tulostaa merkinnät konsoliin

    } catch (error) {
        console.error("Virhe haettaessa merkintöjä:", error);
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");
    const merkinnatDiv = document.getElementById("merkinta");

    if (!token) {
        merkinnatDiv.innerHTML = "<p>Sinun täytyy kirjautua sisään nähdäksesi merkinnät.</p>";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/entries", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const merkinnät = await response.json();

        // 🔹 Tyhjennetään ensin div, jos siellä on vanhoja merkintöjä
        merkinnatDiv.innerHTML = "";

        if (merkinnät.length === 0) {
            merkinnatDiv.innerHTML = "<p>Ei vielä merkintöjä.</p>";
        } else {
            // 🔹 Käydään läpi kaikki merkinnät ja lisätään ne sivulle
            merkinnät.forEach(merkintä => {
                const merkintäElementti = document.createElement("div");
                merkintäElementti.classList.add("merkintä"); // Lisää luokka CSS:ää varten
                merkintäElementti.innerHTML = `
                    <p><strong>Päiväkirjamerkintä:</strong> ${merkintä.entry_text}</p>
                    <small>${new Date(merkintä.created_at).toLocaleString()}</small>
                    <hr>
                `;
                merkinnatDiv.appendChild(merkintäElementti);
            });
        }

    } catch (error) {
        console.error("Virhe haettaessa merkintöjä:", error);
        merkinnatDiv.innerHTML = "<p>Virhe haettaessa merkintöjä!</p>";
    }
});




