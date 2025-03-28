
const DTLGameRules = () => {
  return (
    <div className="rules-body text-white title-14">
      <div>
        <div className="rules-section">
          <ul className="pl-4 pr-4 list-style">
            <li>
              20-20 DTL (Dragon Tiger Lion) is a 52 playing cards game. In the
              DTL game, 3 hands are dealt for each of the 3 players. The player
              will bet on which hand will win.
            </li>
            <li>
              The ranking of cards is from lowest to highest: Ace, 2, 3, 4, 5,
              6, 7, 8, 9, 10, Jack, Queen, and King, where Ace is “1” and King
              is “13”.
            </li>
            <li>
              On the same card with different suits, the winner will be declared
              based on the below winning suit sequence.
              <div className="cards-box">
                <span className="card-character black-card ml-1">1</span>
                <span>1st</span>
              </div>
              <div className="cards-box">
                <span className="card-character red-card ml-1">1</span>
                <span>2nd</span>
              </div>
              <div className="cards-box">
                <span className="card-character black-card ml-1">1</span>
                <span>3rd</span>
              </div>
              <div className="cards-box">
                <span className="card-character red-card ml-1">1</span>
                <span>4th</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DTLGameRules;
