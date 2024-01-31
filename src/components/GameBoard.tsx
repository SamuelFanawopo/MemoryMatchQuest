import Card from "./Card";

interface GameBoardProps {
  cards: { letter: string; isFlipped: boolean }[];
  onCardClick: (index: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick }) => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="grid grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
        {cards.map((card, index) => (
          <Card
            key={index}
            letter={card.letter}
            isFlipped={card.isFlipped}
            onClick={() => onCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
