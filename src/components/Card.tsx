interface CardProps {
  letter: string;
  isFlipped: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ letter, isFlipped, onClick }) => {
  return (
    <div
      className={`w-20 h-20 bg-gray-200 flex items-center justify-center cursor-pointer ${
        isFlipped ? "bg-blue-500" : ""
      }`}
      onClick={onClick}
    >
      {isFlipped ? <span className="text-2xl font-bold">{letter}</span> : ""}
    </div>
  );
};

export default Card;
