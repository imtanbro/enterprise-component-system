import React, { createRef, useCallback, useEffect, useRef } from "react";
import Card from "./Card";
import determineNewPosition from "../Methods/determineNewPosition";
import handleDragStart from "../Methods/handleDragStart";

// Define the props for the Cards component
interface CardsProps {
  cardData: { id: number; text: string; position?: { x: number; y: number } }[];
  setCardData: React.Dispatch<React.SetStateAction<{ id: number; text: string }[]>>;
}

const Cards: React.FC<CardsProps> = ({ cardData, setCardData }) => {
  useEffect(() => {
    const savedCardsData = JSON.parse(localStorage.getItem("cardsData") || "[]");

    const updatedCardData = cardData.map((card) => {
      const savedCardData = savedCardsData.find((savedCard: any) => savedCard.id === card.id);
      if (savedCardData) {
        return { ...card, position: savedCardData.position }; // Provide a default position or handle appropriately
      } else {
        const position = determineNewPosition();
        console.log("New Position:", position);

        return { ...card, position };
      }
    });

    setCardData(updatedCardData);
    localStorage.setItem("cardsData", JSON.stringify(updatedCardData));
  }, []);

  const cardRefs = useRef<React.RefObject<HTMLDivElement | null>[]>([]);

  return (
    <div>
      {cardData.map((card) => (
        <Card
          key={card.id}
          ref={cardRefs.current[card.id] || (cardRefs.current[card.id] = createRef<HTMLDivElement | null>())}
          id={card.id}
          initialPos={card.position}
          text={card.text}
          onMouseDown={(e) => {
            console.log("Card ID:", card.id);
            handleDragStart(cardRefs, card, e, cardData, setCardData);
          }}
        />
      ))}
    </div>
  );
};

export default Cards;
