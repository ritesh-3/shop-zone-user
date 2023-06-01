import React from "react";
import {cardsDataStub } from '../../Data/Data'
import Card from "./Card";

const CardsContainer = ({ cardData }) => {

    const cardsList = (cardData && cardData.length) > 0 ? cardData : cardsDataStub

    return (
        <div className="Cards">
            {cardsList.map((card, id) => {
                return (
                    <div className="parentContainer" key={id}>
                        <Card
                            title={card.title}
                            color={card.color}
                            barValue={card.barValue}
                            value={card.value}
                            navigateTo={card.navigateTo}
                            subtitle={card.subtitle}
                        // png={card.png}
                        // series={card.series}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default CardsContainer;
