document.addEventListener("DOMContentLoaded", function () {
    const kirjauduNappi = document.getElementById("kirjaudu-nappi");
    const popupTausta = document.getElementById("popup-tausta");
    const suljePopup = document.getElementById("sulje-popup");
    const tallennaNappi = document.getElementById("tallenna");
    const saveNappi = document.getElementById("save");


    // Rekisteröintifunktio
    saveNappi.addEventListener("click", async function (event) {
        event.preventDefault();

        const name = document.getElementById("fname").value;
        const password = document.getElementById("pass").value;

        if (!name || !password) {
            alert("Täytä kaikki kentät!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password })
            });

            const data = await response.json();
            alert(data.message);
            if (response.ok) {
                
            }
        } catch (error) {
            console.error("Virhe rekisteröinnissä:", error);
            alert("Virhe rekisteröinnissä!");
        }
    });
});
