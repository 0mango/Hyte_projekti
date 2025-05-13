# TEST.md  
## Sovelluksen kirjautumistoiminnon testaus  


### Testausympäristö  
- Selain: Chrome
- Backend: Node.js + MariaDB  
- Käyttöliittymä: HTML + CSS + JavaScript  
- Testattu osoitteessa: `http://localhost:3000/login`  
- Kirjasto: SeleniumLibrary


---

 

### 1. Kirjautuminen toimivalla salasanalla  

**Tapauskuvaus:**  
Syötetään olemassa oleva käyttäjätunnus ja oikea salasana.


**Odotettu tulos:**  
- Sovellus hyväksyy kirjautumisen  


**Saatu tulos:** 
- Sovellus hyväksyi kirjautumisen


### Testausympäristö  
- Selain: Chrome / Firefox  
- Backend: Node.js + MariaDB  
- Käyttöliittymä: HTML + CSS + JavaScript  
- Testattu osoitteessa: `http://localhost:3000/register`  
- Kirjasto: SeleniumLibrary


---

## Testitapaukset  

### 2. Rekisteröityminen toimivilla tiedoilla  



**Syöte:**  
- Käyttäjänimi: `Testi henkilö`  
- Salasana: `testi`

**Odotettu tulos:**  
- Rekisteröityminen onnistuu  
- Käyttäjä luodaan tietokantaan  

**Saatu tulos:**  
- Rekistöröinti onnistu
- Käyttäjä tiedot luotiin tietokantaan

---


## 3 Lomakkeen täyttötesti Seleniumilla (Robot Framework)

### Testausympäristö

- Testityökalu: Robot Framework + SeleniumLibrary  
- Selain: Chrome  
- Testisivu: [https://www.selenium.dev/selenium/web/web-form.html](https://www.selenium.dev/selenium/web/web-form.html)

**Syöte:**  
- Teksti: `moi!`  
- Salasana: `Salasan!`  
- Valinta: `Three`  
- Liukusäädin: siirto kohtaan `offset x=100, y=50`  
- Checkbox: valitaan  
- Radiopainike: `id=my-radio-2`  
- Päivämäärä: `2025-05-06`  
- Värit: `0Red 90Green 68Blue`

**Odotettu tulos:**  
- Kenttiin syötetyt arvot tallentuvat lomakkeelle  
- Lomake lähetetään onnistuneesti ilman virheitä  

**Tulos:**  
Testi onnistui. Kaikki lomakekentät toimivat

---

---


### Kuavt

Onnistunut kirjautuminen

![Näyttökuva 2025-05-13 235653](https://github.com/user-attachments/assets/a40e4c21-dc3d-4440-be64-13c68efe6e28)

Onnistunut rekistöröinti
![Näyttökuva 2025-05-14 003349](https://github.com/user-attachments/assets/d85cabec-2294-4567-b7ce-f5d3dcdb75e8)

Lomakkeen täyttö 
![Näyttökuva 2025-05-14 003631](https://github.com/user-attachments/assets/f4ac2115-0aeb-4a65-a3e2-1b7c12f66c1d)




