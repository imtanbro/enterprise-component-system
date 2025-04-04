import React, { createRef, memo, useCallback, useEffect, useRef } from "react";
import Card from "./Card";
import determineNewPosition from "../Methods/determineNewPosition";
import handleDragStart from "../Methods/handleDragStart";

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
        return { ...card, position: savedCardData.position };
      } else {
        const position = determineNewPosition();

        return { ...card, position };
      }
    });

    setCardData(updatedCardData);
    localStorage.setItem("cardsData", JSON.stringify(updatedCardData));
  }, []);

  const cardRefs = useRef<{ [key: number]: React.RefObject<HTMLDivElement> }>({});

  return (
    <div>
      {cardData.map((card) => (
        <Card
          key={card.id}
          ref={cardRefs.current[card.id] || (cardRefs.current[card.id] = createRef<HTMLDivElement | null>())}
          id={card.id}
          initialPos={card.position}
          text={card.text}
          isDarkMode={false}
          onMouseDown={(e) => {
            handleDragStart(cardRefs, card, e, cardData, setCardData);
          }}
        />
      ))}
    </div>
  );
};

export default memo(Cards);
