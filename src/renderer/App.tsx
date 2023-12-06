import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import icon from '../../assets/catImg.jpg';
import './App.css';

interface Facts {
  _id: string;
  text: string;
  createdAt: string;
  used: string;
}
const CatFacts: React.FC = () => {
  const [dailyFacts, setDailyFacts] = useState<Facts[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  async function listFacts() {
    try {
      const response = await fetch('https://cat-fact.herokuapp.com/facts');
      const catFacts = await response.json();
      console.log('catFacts::::', catFacts);
      setDailyFacts(catFacts);
    } catch (error) {
      console.error('error here');
    }
  }

  useEffect(() => {
    listFacts();
  }, []);

  const addToFavorites = (factText: string) => {
    console.log('factText:::::', factText);
    setFavorites((prevFavorites) => [...prevFavorites, factText]);
  };

  const listItems = dailyFacts.map((dailyFact) => (
    <div>
      {' '}
      <ol
        style={{ marginBottom: '20px', cursor: 'pointer' }}
        className="hover-effect"
        key={dailyFact._id}
        onClick={() => addToFavorites(dailyFact.text)}
      >
        {dailyFact.text}
      </ol>
      {/* <div className="hidden-div">
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '8px' }}>Add to Favorites</li>
          <li style={{ marginBottom: '8px' }}>Delete</li>
        </ul>
      </div> */}
    </div>
  ));

  return (
    <div>
      <div className="CatHead">
        <img width="100" alt="icon" src={icon} />
      </div>
      <h1 className="CatHead">Cat Facts</h1>
      <ul>{listItems}</ul>
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
