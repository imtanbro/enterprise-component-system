const handleDragStart = (cardRefs, card, e, cardData, setCardData) => {
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

  const updateCardPosition = (id, newPosition) => {
    const updatedCardData = cardData.map((card) => (card.id === id ? { ...card, position: newPosition } : card));
    setCardData(updatedCardData);
    localStorage.setItem("cardsData", JSON.stringify(updatedCardData));
  };

  const handleMouseMove = (e) => {
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

    // Ensure the top position is at least 100px
    if (currentRect.top < 100) return true; // if current card's top is below 100px, consider as overlap

    return cardData.some((otherCard) => {
      if (otherCard.id === id) return false; // Skip the current card

      const otherCardRef = cardRefs.current[otherCard.id].current;
      const otherRect = otherCardRef.getBoundingClientRect();

      // Ensure the other card's top position is at least 100px
      if (otherRect.top < 100) return true; // if other card's top is below 100px, consider as overlap

      // Check for overlap using the bounding rectangle
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
