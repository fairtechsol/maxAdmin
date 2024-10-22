import React from 'react';
import './style.scss'; 

const BollywoodTableGameRules = () => {
  return (
    <div className="rules-section text-white title-14">
      <ul className="pl-4 pr-4 list-style">
        <li>
          The Bollywood table game will be played with a total of 16 cards including (J, Q, K, A). These cards are from 2 decks, meaning the game is played with a total of 16 * 2 = 32 cards.
        </li>
        <li>
          <div className="cards-box">
            <span>If the card is</span>
            <span className="card-character black-card ml-1">A</span>
            <span>Don Wins</span>
          </div>
        </li>
        <li>
          <div className="cards-box">
            <span>If the card is</span>
            <span className="card-character red-card ml-1">A</span>
            <span className="card-character red-card ml-1">A[</span>
            <span className="card-character black-card ml-1">A]</span>
            <span>Amar Akbar Anthony Wins</span>
          </div>
        </li>
        <li>
          <div className="cards-box">
            <span>If the card is</span>
            <span className="card-character black-card ml-1">K</span>
            <span className="card-character black-card ml-1">Q</span>
            <span className="card-character black-card ml-1">J</span>
            <span>Sahib Bibi aur Ghulam Wins.</span>
          </div>
        </li>
        <li>
          <div className="cards-box">
            <span>If the card is</span>
            <span className="card-character red-card ml-1">K</span>
            <span className="card-character black-card ml-1">K</span>
            <span>Dharam Veer Wins.</span>
          </div>
        </li>
        <li>
          <div className="cards-box">
            <span>If the card is</span>
            <span className="card-character red-card ml-1">K</span>
            <span className="card-character black-card ml-1">Q</span>
            <span className="card-character red-card ml-1">Q</span>
            <span className="card-character red-card ml-1">Q</span>
            <span>Kis Kisko Pyaar Karoon Wins.</span>
          </div>
        </li>
        <li>
          <div className="cards-box">
            <span>If the card is</span>
            <span className="card-character red-card ml-1">J</span>
            <span className="card-character black-card ml-1">J</span>
            <span className="card-character red-card ml-1">J</span>
            <span>Ghulam Wins.</span>
          </div>
        </li>
      </ul>
      
      <ul className="pl-4 pr-4 list-style">
        <li>
          <b>ODD:</b>
          <span>J K A</span>
        </li>
        <li>
          <b>DULHA DULHAN:</b>
          <span>Q K</span>
          <span>Payout: 1.97</span>
        </li>
        <li>
          <b>BARATI:</b>
          <span>A J</span>
          <span>Payout: 1.97</span>
        </li>
        <li>
          <b>RED:</b>
          <span>Payout: 1.97</span>
        </li>
        <li>
          <b>BLACK:</b>
          <span>Payout: 1.97</span>
        </li>
        <li>
          <span>J, Q, K, A</span>
          <div>PAYOUT: 3.75</div>
        </li>
        <li>A = DON</li>
        <li>B = AMAR AKBAR ANTHONY</li>
        <li>C = SAHIB BIBI AUR GHULAM</li>
        <li>D = DHARAM VEER</li>
        <li>E = KIS KISKO PYAAR KAROON</li>
        <li>F = GHULAM</li>
      </ul>
    </div>
  );
};

export default BollywoodTableGameRules;
