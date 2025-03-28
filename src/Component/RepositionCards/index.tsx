import React, { memo, useState } from "react";
import Cards from "./Components/Cards";

// Define the type for each card's data
interface Card {
  id: number;
  text: string;
}

interface RepositionCardsProps {
  // Props could be passed to the component here if any, in this case it's empty.
}

const RepositionCards: React.FC<RepositionCardsProps> = () => {
  console.log("RepositionCards Component Rendered");

  // Define the state with the type of the card data
  const [cardData, setCardData] = useState<Card[]>([
    { id: 2, text: "Move" },
    { id: 3, text: "Cards" },
    { id: 4, text: "Around" },
    { id: 1, text: "🥳🥳" },
  ]);

  return (
    <div className="">
      <Cards cardData={cardData} setCardData={setCardData} />
    </div>
  );
};

// Memoize the component to avoid unnecessary re-renders
export default memo(RepositionCards);
