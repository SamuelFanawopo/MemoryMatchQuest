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
  const [isCompleted, setIsCompleted] = useState(false);

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
    setIsCompleted(false);
  };

  const checkForCompletion = () => {
    const allMatched = cards.every((card) => card.isMatched);
    setIsCompleted(allMatched);
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
      checkForCompletion();
    }, 1000);
  };

  // Initialize the game on first render
  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4">
        <h1 className="text-3xl text-white font-bold mb-4">
          Memory Match Quest
        </h1>

        <div className="flex justify-center items-start relative">
          <GameBoard cards={cards} onCardClick={handleCardClick} />

          <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-md font-medium mb-3 whitespace-nowrap"
              onClick={initializeGame}
            >
              Reset Game
            </button>
            <span className="text-white text-md">Moves: {moves}</span>
          </div>
        </div>
      </div>
      {isCompleted && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p>You've completed the game in {moves} moves!</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={initializeGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GameContainer;
