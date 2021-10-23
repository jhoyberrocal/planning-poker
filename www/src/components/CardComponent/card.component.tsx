import React from 'react';
import './card.component.scss';

type CardComponent = {
  number: number;
  name: string;
  onHandleClick: () => any;
  disabled: boolean;
  val: number;
};

const CardComponent: React.FC<CardComponent> = ({ number, name, onHandleClick, disabled, val }) => {
  return (
    <div className='card-component'>
      <input type='radio' checked={val === number} name={name} onChange={onHandleClick} disabled={disabled}/>
      <div className='card'>
        <span>{number}</span>
        <span>&spades;</span>
      </div>
    </div>
  );
};

export default CardComponent;
