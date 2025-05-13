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



