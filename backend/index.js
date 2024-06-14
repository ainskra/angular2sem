const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

let highScores = [];

app.get('/scores/snake-game', (req, res) => {
    res.json(highScores.sort((a, b) => b.score - a.score).slice(0, 10));
});

app.post('/scores/snake-game', (req, res) => {
    const newScore = req.body;
    highScores.push(newScore);
    res.status(201).json(newScore);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});