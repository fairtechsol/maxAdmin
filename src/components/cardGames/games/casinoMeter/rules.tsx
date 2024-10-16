import React from "react";

const CasinoRulesImage = () => {
  return (
    <div className="ball-rules-section-container">
      <div>
        <img
          src="https://sitethemedata.com/v3/static/front/img/casino-rules/cmeter.jpg"
          alt="Casino Rules Meter"
          className="img-fluid w-50 h-50"
        />
      </div>
      <div>
        <div className="rules-section">
          <h6 className="rules-highlight">Low Zone:</h6>
          <ul className="pl-4 pr-4 list-style">
            <li>
              The Player who bet on Low Zone will have all cards from Ace to 8
              of all suits 3 cards of 9, Heart , Club &amp; Diamond.
            </li>
          </ul>
          <h6 className="rules-highlight">High Zone:</h6>
          <ul className="pl-4 pr-4 list-style">
            <li>
              The Player who bet on high Zone will have all the cards of JQK of
              all suits plus 3 cards of 10, Heart, Club &amp; Diamond.
            </li>
          </ul>
          <h6 className="rules-highlight">Spade 9 &amp; Spade 10:</h6>
          <ul className="pl-4 pr-4 list-style">
            <li>
              If you Bet on Low Card, Spade of 9 &amp; 10 will calculated along
              with High Cards.
            </li>
            <li>
              If you Bet on High Card, Spade of 9 &amp; 10 will calculated along
              with Low Cards.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CasinoRulesImage;
