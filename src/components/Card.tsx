interface CardProps {
  letter: string;
  isFlipped: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ letter, isFlipped, onClick }) => {
  return (
    <div
      className={`w-28 h-28 bg-gray-300 rounded-lg shadow-xl flex items-center justify-center cursor-pointer
                  transition duration-500 ease-in-out transform select-none ${
                    isFlipped ? "rotate-y-180 bg-indigo-600" : ""
                  }`}
      onClick={onClick}
    >
      {isFlipped ? (
        <span className="text-4xl font-bold text-white">{letter}</span>
      ) : (
        <span className="text-4xl font-bold text-gray-300">{letter}</span>
      )}
    </div>
  );
};
export default Card;
