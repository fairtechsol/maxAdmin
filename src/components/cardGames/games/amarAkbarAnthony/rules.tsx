import React from 'react';

const AmarAkbarRules = () => {
  return (
    <div className="rules-section text-white title-14">
      <p>
        <b className="rules-sub-highlight">EVEN</b>
        <span className="ml-2">(PAYOUT 2.12)</span>
      </p>
      <ul className="pl-4 pr-4 list-style">
        <li>If the card is 2, 4, 6, 8, 10, Q</li>
      </ul>

      <p>
        <b className="rules-sub-highlight">ODD</b>
        <span className="ml-2">(PAYOUT 1.83)</span>
      </p>
      <ul className="pl-4 pr-4 list-style">
        <li>If the card is A, 3, 5, 7, 9, J, K</li>
      </ul>

      <p>
        <b className="rules-sub-highlight">RED</b>
        <span className="ml-2">(PAYOUT 1.97)</span>
      </p>
      <ul className="pl-4 pr-4 list-style">
        <li>If the card color is DIAMOND or HEART</li>
      </ul>

      <p>
        <b className="rules-sub-highlight">BLACK</b>
        <span className="ml-2">(PAYOUT 1.97)</span>
      </p>
      <ul className="pl-4 pr-4 list-style">
        <li>If the card color is CLUB or SPADE</li>
      </ul>

      <p>
        <b className="rules-sub-highlight">UNDER 7</b>
        <span className="ml-2">(PAYOUT 2.0)</span>
      </p>
      <ul className="pl-4 pr-4 list-style">
        <li>If the card is A, 2, 3, 4, 5, 6</li>
      </ul>

      <p>
        <b className="rules-sub-highlight">OVER 7</b>
        <span className="ml-2">(PAYOUT 2.0)</span>
      </p>
      <ul className="pl-4 pr-4 list-style">
        <li>If the card is 8, 9, 10, J, Q, K</li>
      </ul>

      <p>
        <b>Note:</b>
        <span>If the card is 7, bets on under 7 and over 7 will lose 50% of the bet amount.</span>
      </p>

      <p>
        <b className="rules-sub-highlight">CARDS</b>
        <span className="ml-2">(PAYOUT 12.0)</span>
      </p>
      <ul className="pl-4 pr-4 list-style">
        <li>A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K</li>
      </ul>
    </div>
  );
};

export default AmarAkbarRules;
