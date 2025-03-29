interface Card {
  id: number;
  position: { x: number; y: number };
}

interface CardRefs {
  current: {
    [key: number]: {
      current: HTMLDivElement;
    };
  };
}

type HandleDragStart = (
  cardRefs: CardRefs,
  card: Card,
  e: React.MouseEvent<HTMLDivElement>,
  cardData: Card[],
  setCardData: React.Dispatch<React.SetStateAction<Card[]>>
) => void;

const handleDragStart: HandleDragStart = (cardRefs, card, e, cardData, setCardData) => {
  const { id } = card;
  const cardRef = cardRefs.current[id].current;
  const rect = cardRef.getBoundingClientRect();

  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  const startPos = card.position;

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    const finalRect = cardRef.getBoundingClientRect();
    const newPosition = { x: finalRect.left, y: finalRect.top };

    if (checkForOverlap(id)) {
      cardRef.style.left = `${startPos.x}px`;
      cardRef.style.top = `${startPos.y}px`;
    } else {
      updateCardPosition(id, newPosition);
    }
  };

  const updateCardPosition = (id: number, newPosition: { x: number; y: number }) => {
    const updatedCardData = cardData.map((card) => (card.id === id ? { ...card, position: newPosition } : card));
    setCardData(updatedCardData);
    localStorage.setItem("cardsData", JSON.stringify(updatedCardData));
  };

  const handleMouseMove = (e: MouseEvent) => {
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;

    cardRef.style.left = `${newX}px`;
    cardRef.style.top = `${newY}px`;
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  const checkForOverlap = (id: number): boolean => {
    const currentCardRef = cardRefs.current[id].current;
    const currentRect = currentCardRef.getBoundingClientRect();

    if (currentRect.top < 100) return true;

    return cardData.some((otherCard) => {
      if (otherCard.id === id) return false;

      const otherCardRef = cardRefs.current[otherCard.id].current;
      const otherRect = otherCardRef.getBoundingClientRect();

      if (otherRect.top < 100) return true;

      return !(
        currentRect.right < otherRect.left ||
        currentRect.left > otherRect.right ||
        currentRect.bottom < otherRect.top ||
        currentRect.top > otherRect.bottom
      );
    });
  };
};

export default handleDragStart;
