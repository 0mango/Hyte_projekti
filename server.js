require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require("mysql2/promise");

app.use(cors()); // Salli kaikki pyynnöt eri alkuperistä
app.use(express.json());

// Luo yhteys tietokantaan
const pool = mysql.createPool({
    host: 'localhost',
    user: 'sumeya',
    password: '1234',
    database: 'healthdiary'
});

// 🔹 Autentikaatiomiddleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("AuthenticateToken - saatu token:", token);
    if (!token) return res.status(401).json({ message: "Token puuttuu" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Virheellinen token" });
        console.log("AuthenticateToken - käyttäjä:", user);
        req.user = user;
        next();
    });
}

// Käyttäjä luominen
app.post('/users', async (req, res) => {
    try {
        const { name, password } = req.body;

        // Tarkistetaan, onko käyttäjänimi jo olemassa
        const [existingUser] = await pool.execute("SELECT * FROM users WHERE name = ?", [name]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Käyttäjänimi on jo käytössä!" });
        }

        // Hashataan salasana
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (name, password) VALUES (?, ?)";
        const [result] = await pool.execute(sql, [name, hashedPassword]);

        res.status(201).json({ message: "Käyttäjä luotu!", userId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Virhe käyttäjän luonnissa!" });
    }
});

// 🔹 Käyttäjän kirjautuminen + TOKENIN LUONTI
app.post('/users/login', async (req, res) => {
    const { name, password } = req.body;
    // Etsitään käyttäjä
    const [users] = await pool.execute("SELECT * FROM users WHERE name = ?", [name]);
    if (users.length === 0) {
        return res.status(400).json({ message: "Käyttäjää ei löydy" });
    }

    const user = users[0];

    // Vertaillaan salasanoja
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ message: "Väärä salasana" });
    }

    // 🔹 Luodaan ja palautetaan JWT-token, joka sisältää käyttäjän ID:n
    const token = jwt.sign({ id: user.id, name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    console.log("Kirjautumis Token:", token)
    res.status(200).json({ message: "Kirjautuminen onnistui", token });
});

// 🔹 Päiväkirjamerkintöjen tallentaminen (Vain kirjautuneille käyttäjille)
app.post('/entries', authenticateToken, async (req, res) => {
    try {
        const { entry_text } = req.body;
        const user_id = req.user.id; // 🔹 Nyt req.user.id on varmasti olemassa
        console.log("Tallennetaan merkintää käyttäjälle:", user_id);
        if (!entry_text) {
            return res.status(400).json({ message: "Merkintä ei voi olla tyhjä" });
        }

        const sql = "INSERT INTO entries (user_id, entry_text) VALUES (?, ?)";
        const [result] = await pool.execute(sql, [user_id, entry_text]);

        res.status(201).json({ message: "Merkintä tallennettu!", entryId: result.insertId });
    } catch (error) {
        console.error("Virhe tallennettaessa merkintää:", error);
        res.status(500).json({ message: "Virhe tallennettaessa merkintää" });
    }
});

/// hakee tietokannasta merkinnän

app.get('/entries', authenticateToken, async (req, res) => {
    try {
        const user_id = req.user.id; // Haetaan kirjautuneen käyttäjän ID
        const sql = "SELECT * FROM entries WHERE user_id = ?";
        const [rows] = await pool.execute(sql, [user_id]);

        res.json(rows); // Lähetetään merkinnät frontille
    } catch (error) {
        console.error("Virhe haettaessa merkintöjä:", error);
        res.status(500).json({ message: "Virhe haettaessa merkintöjä" });
    }
});


app.listen(3000, () => console.log('Server running on port 3000'));