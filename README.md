# TCGP-tracker 🎴✨

A **Pokémon TCGP Collection Tracker** built with **Angular** and **Node.js** to manage your Pokémon card collection! Track ownership, calculate probabilities, and find the best pack to open next—all wrapped in a sleek UI. Gotta collect 'em all! 🕹️

---

## 🚀 Features

### 🎯 **Track Your Collection**
- Easily toggle ownership of Pokémon cards.
- Dynamic visuals of cards categorized by packs (`Mewtwo`, `Pikachu`, `Charizard`, and `All`).

### 🔮 **Probability Insights**
- **Position Probabilities**: See your chances for each card position (1-3, 4, and 5).
- **Pack Statistics**: Find out which pack is most worth opening based on your current collection!

### 🎨 **Sleek and Modern UI**
- Responsive and colorful design for each card pack:
  - 🟡 **Pikachu Pack**: Bright yellow
  - 🟠 **Charizard Pack**: Bold orange
  - 🟣 **Mewtwo Pack**: Striking purple
  - ⚪ **All Packs**: Neutral tones with visibility in both light and dark backgrounds

### 📸 **Card Visuals**
- Automatically displays card images based on their ID.
- Fallback placeholder image for missing cards.

---

## 🛠️ Technologies Used

### Frontend
- **Angular**: For building the dynamic and interactive UI.
- **Bootstrap**: For styling the application with a responsive and modern look.

### Backend
- **Node.js** + **Express.js**: API for managing data and probabilities.
- **File-based Database**: JSON files for simplicity.

---

## 🎮 Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **Angular CLI** (v15 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/claudiunderthehood/TCGP-tracker.git
   cd pokemon-collection-tracker
   ```

2. Install dependencies:
   - **Frontend**:
     ```bash
     cd pokemon-collection-tracker/
     npm install
     ```
   - **Backend**:
     ```bash
     cd ../backend
     npm install
     ```

3. Run the application:
   - Start the **backend server**:
     ```bash
     node server.js
     ```
   - Start the **frontend app**:
     ```bash
     cd ../pokemon-collection-frontend
     ng serve
     ```

4. Open the app in your browser:
   ```
   http://localhost:4200
   ```

---

## 🧩 Project Structure

```
TCGP-tracker/
├── backend/
│   ├── data/                  # JSON files for card data and collection
│   ├── server.js              # Node.js backend
├── pokemon-collection-frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # Angular components (Collection, Stats, etc.)
│   │   │   ├── assets/        # Pokémon card images and background
│   ├── angular.json           # Angular configuration
│   ├── package.json           # Dependencies for the frontend
├── README.md                  # Project documentation
```


## 💡 Future Enhancements
- **User Authentication**: Save collections to user accounts.
- **Multi-language Support**: Add translations for the app.
- **Advanced Filters**: Search and filter cards by rarity or pack.

---

## 🧑‍💻 Contributing

Contributions are welcome! To get started:
1. Fork this repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push your branch and create a pull request.

## 🤝 Acknowledgements

- Inspired by the Pokémon Trading Card Game 🎮
- Designed with ❤️ and a passion for collecting!
