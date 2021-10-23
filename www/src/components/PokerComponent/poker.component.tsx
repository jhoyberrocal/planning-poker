import React from 'react';
import PokerImg from '@assets/png/001-pker.png';
import PokerImg2 from '@assets/png/002-ficha-de-pker.png';
import './poker.component.scss';

type PokerCard = {
  name: string;
  reveal: boolean;
  point: number;
  rol: number;
};

const PokerComponent: React.FC<PokerCard> = ({ name, reveal, point, rol }) => {
  const revealed = reveal && rol !== 1  ?
    (<h1 style={{fontSize: '4rem'}}>{point === 99 ? '?' : point}</h1>) : (<img src={rol !== 1 ? PokerImg : PokerImg2} alt='Poker card' />);
  return (
    <div className={`card-element ${point !== 99 ? 'active': 'inactive'} ${rol === 1 ? 'moderator' : ''}`}>
      <div className='poker-card'>
        {revealed}
      </div>
      <p className='card-name'>{name}</p>
    </div>
  );
};

export default PokerComponent;
