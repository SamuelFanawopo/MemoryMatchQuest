import { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";

const GameContainer = () => {
  // Define the structure of a card
  interface Card {
    letter: string;
    isFlipped: boolean;
    isMatched: boolean;
  }

  // Initialize the game state
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  // Function to initialize or reset the game
  const initializeGame = () => {
    // Create an array of letters A-H twice
    const letters = "ABCDEFGH".split("").concat("ABCDEFGH".split(""));

    // Shuffle the letters and map them to Card objects
    const shuffledCards = shuffleArray(letters).map((letter) => ({
      letter,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(shuffledCards);
    setFlippedIndices([]);
    setMoves(0);
  };

  // Shuffle function
  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Handle card click
  const handleCardClick = (index: number) => {
    if (!cards[index].isFlipped && flippedIndices.length < 2) {
      const newFlippedIndices = [...flippedIndices, index];
      setFlippedIndices(newFlippedIndices);
      const newCards = [...cards];
      newCards[index].isFlipped = true;
      setCards(newCards);

      // Check for match
      if (newFlippedIndices.length === 2) {
        checkForMatch(newFlippedIndices);
      }
    }
  };

  // Check for match
  const checkForMatch = (indices: number[]) => {
    setTimeout(() => {
      const [index1, index2] = indices;
      const newCards = [...cards];

      if (newCards[index1].letter === newCards[index2].letter) {
        newCards[index1].isMatched = true;
        newCards[index2].isMatched = true;
      } else {
        newCards[index1].isFlipped = false;
        newCards[index2].isFlipped = false;
      }

      setCards(newCards);
      setFlippedIndices([]);
      setMoves((moves) => moves + 1);
    }, 1000);
  };

  // Initialize the game on first render
  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-2">
        <h1 className="text-3xl text-white font-bold my-4">
          Memory Match Quest
        </h1>
        <GameBoard cards={cards} onCardClick={handleCardClick} />
        <div className="mt-4 text-center">
          <button
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-md font-medium mr-3"
            onClick={initializeGame}
          >
            Reset Game
          </button>
          <span className="text-white text-md">Moves: {moves}</span>
        </div>
      </div>
    </>
  );
};

export default GameContainer;
