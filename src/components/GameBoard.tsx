import Card from "./Card";

interface GameBoardProps {
  cards: { letter: string; isFlipped: boolean }[];
  onCardClick: (index: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          letter={card.letter}
          isFlipped={card.isFlipped}
          onClick={() => onCardClick(index)}
        />
      ))}
    </div>
  );
};

export default GameBoard;
