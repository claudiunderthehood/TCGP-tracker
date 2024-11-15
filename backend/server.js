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
  // Read and parse the collection data
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  // Define probabilities for rarities
  const rarityProbabilities = {
    // ... existing rarity probabilities
  };

  const packageProbabilities = {};
  const positionProbabilities = {};

  // Calculate package probabilities
  const packs = ["Mewtwo", "Pikachu", "Charizard"];
  packs.forEach(pack => {
    const totalInPack = data.filter(card => card.Pack === pack).length;
    const ownedInPack = data.filter(card => card.Pack === pack && card.Owned).length;
    packageProbabilities[pack] = ((totalInPack - ownedInPack) / totalInPack) * 100;
  });

  // Determine the best package to open for new cards
  const bestPackage = Object.entries(packageProbabilities).reduce((best, [pack, prob]) => {
    return prob > best.probability ? { name: pack, probability: prob } : best;
  }, { name: '', probability: 0 });

  // Assign position probabilities based on rarity
  data.forEach(card => {
    const rarity = card.Rarity;
    positionProbabilities[card.ID] = rarityProbabilities[rarity] || { "1-3": 0, "4": 0, "5": 0 };
  });

  return {
    packageProbabilities,
    bestPackage,
    positionProbabilities,
    collection: data // Include collection data
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