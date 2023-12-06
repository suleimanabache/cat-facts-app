import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import icon from '../../assets/catImg.jpg';
import './App.css';

interface Facts {
  _id: string;
  text: string;
  createdAt: string;
  used: string;
}
const CatFacts: React.FC = () => {
  const [dailyFact, setDailyFact] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const favRef = useRef([]);

  const getRandomItem = (array: Facts[]) => {
    if (array.length === 0) {
      return undefined;
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };
  const listFacts = async () => {
    try {
      const response = await fetch('https://cat-fact.herokuapp.com/facts');
      const catFacts = await response.json();

      const resultArray = catFacts.filter(
        (element) => !favRef.current.includes(element.text)
      );
      const randomItem = getRandomItem(resultArray);
      setDailyFact(randomItem?.text);
    } catch (error) {
      console.error('error here');
    }
  };

  useEffect(() => {
    listFacts();
  }, []);

  const addToFavorites = (factText: string) => {
    setFavorites((prevFavorites) => [...prevFavorites, factText]);
    favRef.current = [...favRef.current, factText ?? ''];
    listFacts();
  };

  return (
    <div>
      <div className="CatHead">
        <img width="100" alt="icon" src={icon} />
      </div>
      <h1 className="CatHead">Cat Facts</h1>
      <ul onClick={() => addToFavorites(dailyFact)}>{dailyFact}</ul>
      <div className="favorites-container">
        <h2>Favorites:</h2>
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index} style={{ marginBottom: '20px' }}>
              {favorite}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CatFacts />} />
      </Routes>
    </Router>
  );
}
