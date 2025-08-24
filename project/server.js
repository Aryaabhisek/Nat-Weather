const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

// Proxy route to fetch weather data securely
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: "City is required" });

    try {
        const response = await fetch(
            `${process.env.API_URL}?key=${process.env.API_KEY}&q=${city}&aqi=no`
        );
        if (!response.ok) throw new Error("Failed to fetch weather");

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Nat Weather app listening at http://localhost:${port}`);
});
