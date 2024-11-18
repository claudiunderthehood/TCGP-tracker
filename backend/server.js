const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS for Angular's development server on port 4200
app.use(cors({ origin: 'http://localhost:4200' }));

app.use(bodyParser.json());

const dataPath = path.join(__dirname, 'data/collected_cards.json');
const pokemonDataPath = path.join(__dirname, 'data/pokemon_data.json');

function initializeCollection() {
  if (!fs.existsSync(dataPath)) {
    const initialData = JSON.parse(fs.readFileSync(pokemonDataPath, 'utf-8'));
    const collectionData = initialData.map(card => ({ ...card, Owned: false }));
    fs.writeFileSync(dataPath, JSON.stringify(collectionData, null, 2));
  }
}

function calculateProbabilities() {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const rarityProbabilities = {
    "♢": { "1-3": 100.0, "4": 0.0, "5": 0.0 },
    "♢♢": { "1-3": 0.0, "4": 90.0, "5": 60.0 },
    "♢♢♢": { "1-3": 0.0, "4": 5.0, "5": 20.0 },
    "♢♢♢♢": { "1-3": 0.0, "4": 1.666, "5": 6.664 },
    "☆": { "1-3": 0.0, "4": 2.572, "5": 10.288 },
    "☆☆": { "1-3": 0.0, "4": 0.5, "5": 2.0 },
    "☆☆☆": { "1-3": 0.0, "4": 0.222, "5": 0.888 },
    "♛": { "1-3": 0.0, "4": 0.04, "5": 0.16 },
  };

  const packageProbabilities = {};
  const positionProbabilities = {};

  const packs = ["Mewtwo", "Pikachu", "Charizard"];
  packs.forEach(pack => {
    const totalInPack = data.filter(card => card.Pack === pack).length;
    const ownedInPack = data.filter(card => card.Pack === pack && card.Owned).length;
    packageProbabilities[pack] = ((totalInPack - ownedInPack) / totalInPack) * 100;
  });

  const bestPackage = Object.entries(packageProbabilities).reduce((best, [pack, prob]) => {
    return prob > best.probability ? { name: pack, probability: prob } : best;
  }, { name: '', probability: 0 });

  // Dynamically calculate position probabilities
  data.forEach(card => {
    const rarity = card.Rarity;
    const probabilities = rarityProbabilities[rarity] || { "1-3": 0, "4": 0, "5": 0 };

    const totalForRarity = data.filter(c => c.Rarity === rarity && !c.Owned).length;
    const ownedForRarity = data.filter(c => c.Rarity === rarity && c.Owned).length;

    positionProbabilities[card.ID] = {
      "1-3": probabilities["1-3"] * (1 - ownedForRarity / totalForRarity),
      "4": probabilities["4"] * (1 - ownedForRarity / totalForRarity),
      "5": probabilities["5"] * (1 - ownedForRarity / totalForRarity),
    };
  });

  return {
    packageProbabilities,
    bestPackage,
    positionProbabilities,
    collection: data,
  };
}


app.get('/api/probabilities', (req, res) => {
  try {
    const probabilities = calculateProbabilities();
    res.json(probabilities);
  } catch (error) {
    console.error("Error calculating probabilities:", error);
    res.status(500).json({ error: 'Failed to calculate probabilities' });
  }
});


// API endpoint to retrieve collection
app.get('/api/collection', (req, res) => {
  initializeCollection();
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  res.json(data);
});

app.get('/api/probabilities', (req, res) => {
  try {
    const probabilities = calculateProbabilities();
    res.json(probabilities);
  } catch (error) {
    console.error("Error calculating probabilities:", error); // Detailed logging
    res.status(500).json({ error: 'Failed to calculate probabilities' });
  }
});

// API endpoint to update collection
app.post('/api/collection', (req, res) => {
  fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
  res.status(200).json({ message: 'Collection saved successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});