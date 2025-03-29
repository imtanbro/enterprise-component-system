import React, { memo, useEffect, useState } from "react";
import Cards from "./Components/Cards";

interface Card {
  id: number;
  text: string;
}

interface RepositionCardsProps {}

const RepositionCards: React.FC<RepositionCardsProps> = () => {
  console.log("RepositionCards Component Rendered");

  const [cardData, setCardData] = useState<Card[]>([
    { id: 1, text: "🥳🥳" },
    { id: 2, text: "Move" },
    { id: 3, text: "Cards" },
    { id: 4, text: "Around" },
    { id: 5, text: "Have" },
    { id: 6, text: "Fun" },
  ]);

  return (
    <div className="">
      <Cards cardData={cardData} setCardData={setCardData} />
    </div>
  );
};

export const withCenteredLayout = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const [isMobileOrTablet, setIsMobileOrTablet] = useState<boolean>(false);

    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;

        setIsMobileOrTablet(width <= 768);
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 4rem)",
          flexDirection: "column",
        }}
      >
        {!isMobileOrTablet && <WrappedComponent {...props} />}

        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Welcome to the Dashboard!</h1>
        {!isMobileOrTablet && <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>You can move cards around 😁</h1>}
      </div>
    );
  };
};

export default memo(RepositionCards);
