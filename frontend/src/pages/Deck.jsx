import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDecks } from "../api";
import Navbar from "../components/Navbar";
import "../styles/Deck.css";

const Deck = () => {
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const fetchedDecks = await getDecks();
        setDecks(fetchedDecks.data.payload);
        console.log("Fetched decks:", fetchedDecks);
      } catch (error) {
        console.error("Failed to fetch decks:", error);
      }
    };
    fetchDecks();
  }, []);

  const handleAddCard = (deckName) => {
    navigate(`/add-card/${deckName}`);
  };

  const handleEditCard = (cardId) => {
    navigate(`/edit-card/${cardId}`);
  };

  const handleEditDeck = (deckName) => {
    navigate(`/edit-deck/${deckName}`);
  };

  const handleAddDeck = () => {
    navigate("/add-deck");
  };

  const getSettingsDisplay = (settings) => {
    const formatSetting = (setting) => {
      return setting
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    const trueSettings = Object.entries(settings)
      .filter(([key, value]) => value)
      .map(([key]) => formatSetting(key))
      .join(", ");

    return trueSettings ? `Settings: ${trueSettings} ` : "";
  };

  return (
    <div className="decks-container">
      <Navbar />
      <h1>Decks</h1>
      {decks.map((deck) => (
        <div key={deck.id} className="deck">
          <div className="deck-header">
            <h2>{deck.name}</h2>
            <button
              className="edit-deck-button"
              onClick={() => handleEditDeck(deck.name)}
            >
              Edit Deck
            </button>
          </div>
          <h3>{getSettingsDisplay(deck.settings)}</h3>
          <div className="cards-container">
            {deck.cards.map((card) => (
              <div key={card.id} className="card">
                <p>{card.challenge}</p>
                <button
                  className="edit-button"
                  onClick={() => handleEditCard(card.id)}
                >
                  Edit
                </button>
              </div>
            ))}
            <button
              className="add-card-button"
              onClick={() => handleAddCard(deck.name)}
            >
              Add Card
            </button>
          </div>
        </div>
      ))}
      <button className="add-deck-button" onClick={handleAddDeck}>
        Add New Deck
      </button>
    </div>
  );
};

export default Deck;
