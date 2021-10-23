import React, { useState } from 'react';
import './deck-cards.component.scss';
import { CardComponent } from '@components/mui.components';

type DeckCards = {
  cards: number[];
  setNumber: (card: number) => any;
  disabled: boolean;
  value: number;
};

const DeckCardsComponent: React.FC<DeckCards> = ({ cards, setNumber, disabled, value }) => {
  return (
    <section className='selection-cards'>
      {cards.map((card, key) => (
        <CardComponent key={key} number={card} name='selection' val={value} disabled={disabled} onHandleClick={() => setNumber(card)} />
      ))}
    </section>
  );
};

export default DeckCardsComponent;
