const Teen20Rules = () => {
  const ulStyle = {
    listStyleType: "disc",
    paddingLeft: "1rem",
  };

  return (
    <div>
      <div className="text-white title-14">
        <h6 style={{ color: "#FDCF13", fontSize: "16px" }}>Rules of Total:</h6>
        <ul style={ulStyle}>
          <li>
            It is a comparison of total of all three cards of both the games.
          </li>
          <li>Point value of all the cards for the bet of total:</li>
          <ul style={ulStyle}>
            <li>Ace = 1</li>
            <li>2 = 2</li>
            <li>3 = 3</li>
            <li>4 = 4</li>
            <li>5 = 5</li>
            <li>6 = 6</li>
            <li>7 = 7</li>
            <li>8 = 8</li>
            <li>9 = 9</li>
            <li>10 = 10</li>
            <li>Jack = 11</li>
            <li>Queen = 12</li>
            <li>King = 13</li>
          </ul>
          <li>Suits don't matter.</li>
          <li>If the total of both games is equal, it is a Tie.</li>
          <li>
            If the total of both games is equal, then half of your bet amount
            will be returned.
          </li>
        </ul>
        <div className="rules-section">
          <ul className="pl-2 pr-2 list-style">
            <li>
              The game is played with a regular 52 cards single deck, between 2
              players A and B.
            </li>
            <li>Each player will receive 3 cards.</li>
            <li>
              <b>Rules of regular teenpatti winner</b>
            </li>
          </ul>
          <div>
            <img src="https://sitethemedata.com/casino-new-rules-images/teen20b.jpg" />
          </div>
        </div>
        <div className="rules-section">
          <h6 className="rules-highlight">Rules of 3 baccarat</h6>
          <p>There are 3 criteria for winning the 3 Baccarat .</p>
          <h6 className="rules-sub-highlight">First criteria:</h6>
          <ul className="pl-2 pr-2 list-style">
            <li>Game having trio will win,</li>
            <li>If both game has trio then higher trio will win.</li>
            <li>
              Ranking of trio from high to low.
              <div className="pl-2 pr-2">1,1,1</div>
              <div className="pl-2 pr-2">K,K,K</div>
              <div className="pl-2 pr-2">Q,Q,Q</div>
              <div className="pl-2 pr-2">J,J,J</div>
              <div className="pl-2 pr-2">10,10,10</div>
              <div className="pl-2 pr-2">9,9,9</div>
              <div className="pl-2 pr-2">8,8,8</div>
              <div className="pl-2 pr-2">7,7,7</div>
              <div className="pl-2 pr-2">6,6,6</div>
              <div className="pl-2 pr-2">5,5,5</div>
              <div className="pl-2 pr-2">4,4,4</div>
              <div className="pl-2 pr-2">3,3,3</div>
              <div className="pl-2 pr-2">2,2,2</div>
            </li>
            <li>
              If none of the game have got trio then second criteria will apply.
            </li>
          </ul>
          <h6 className="rules-sub-highlight">Second criteria:</h6>
          <ul className="pl-2 pr-2 list-style">
            <li>Game having all the three face card will win.</li>
            <li>Here JACK, QUEEN AND KING are named face card.</li>
            <li>
              if both the game have all three face cards then game having
              highest face card will win.
            </li>
            <li>
              Ranking of face card from High to low :
              <div className="pl-2 pr-2">Spade King</div>
              <div className="pl-2 pr-2">Heart King</div>
              <div className="pl-2 pr-2">Club King</div>
              <div className="pl-2 pr-2">Diamond King</div>
            </li>
            <li>Same order will apply for Queen (Q) and Jack (J) also .</li>
            <li>
              If second criteria is also not applicable, then 3rd criteria will
              apply .
            </li>
          </ul>
          <h6 className="rules-sub-highlight">3rd criteria:</h6>
          <ul className="pl-2 pr-2 list-style">
            <li>Game having higher baccarat value will win .</li>
            <li>
              For deciding baccarat value we will add point value of all the
              three cards
            </li>
            <li>
              Point value of all the cards :
              <div className="pl-2 pr-2">1 = 1</div>
              <div className="pl-2 pr-2">2 = 2</div>
              <div className="pl-2 pr-2">To</div>
              <div className="pl-2 pr-2">9 = 9</div>
              <div className="pl-2 pr-2">
                10, J ,Q, K has zero (0) point value .
              </div>
            </li>
          </ul>
          <p>
            <b>Example 1st:</b>
          </p>
          <ul className="pl-2 pr-2 list-style">
            <li>
              Last digit of total will be considered as baccarat value
              <div className="pl-2 pr-2">2,5,8 =</div>
              <div className="pl-2 pr-2">
                2+5+8 =15 here last digit of total is 5 , So baccarat value is
                5.
              </div>
            </li>
          </ul>
          <p>
            <b>Example 2nd :</b>
          </p>
          <ul className="pl-2 pr-2 list-style">
            <li>1,3,K</li>
            <li>
              1+3+0 = 4 here total is in single digit so we will take this
              single digit 4 as baccarat value
            </li>
          </ul>
          <p>
            <b>
              If baccarat value of both the game is equal then Following
              condition will apply :
            </b>
          </p>
          <p>
            <b>Condition 1 :</b>
          </p>
          <ul className="pl-2 pr-2 list-style">
            <li>Game having more face card will win.</li>
            <li>
              Example : Game A has 3,4,k and B has 7,J,Q then game B will win as
              it has more face card then game A .
            </li>
          </ul>
          <p>
            <b>Condition 2 :</b>
          </p>
          <ul className="pl-2 pr-2 list-style">
            <li>
              If Number of face card of both the game are equal then higher
              value face card game will win.
            </li>
            <li>
              Example : Game A has 4,5,K (K Spade ) and Game B has 9,10,K ( K
              Heart ) here baccarat value of both the game is equal (9 ) and
              both the game have same number of face card so game A will win
              because It has got higher value face card then Game B .
            </li>
          </ul>
          <p>
            <b>Condition 3 :</b>
          </p>
          <ul className="pl-2 pr-2 list-style">
            <li>
              If baccarat value of both the game is equal and none of game has
              got face card then in this case Game having highest value point
              card will win .
            </li>
            <li>
              Value of Point Cards :<div className="pl-2 pr-2">Ace = 1</div>
              <div className="pl-2 pr-2">2 = 2</div>
              <div className="pl-2 pr-2">3 = 3</div>
              <div className="pl-2 pr-2">4 = 4</div>
              <div className="pl-2 pr-2">5 = 5</div>
              <div className="pl-2 pr-2">6 = 6</div>
              <div className="pl-2 pr-2">7 = 7</div>
              <div className="pl-2 pr-2">8 = 8</div>
              <div className="pl-2 pr-2">9 = 9</div>
              <div className="pl-2 pr-2">10 = 0 (Zero )</div>
            </li>
            <li>Example : GameA: 1,6,10 And GameB: 7,10,10</li>
            <li>
              here both the game have same baccarat value . But game B will win
              as it has higher value point card i.e. 7 .
            </li>
          </ul>
          <p>
            <b>Condition 4 :</b>
          </p>
          <ul className="pl-2 pr-2 list-style">
            <li>
              If baccarat value of both game is equal and none of game has got
              face card and high point card of both the game is of equal point
              value , then suits of both high card will be compared
            </li>
            <li>
              Example :
              <div className="pl-2 pr-2">
                Game A : 1(Heart) ,2(Heart) ,5(Heart)
              </div>
              <div className="pl-2 pr-2">
                Game B : 10 (Heart) , 3 (Diamond ) , 5 (Spade )
              </div>
            </li>
            <li>
              Here Baccarat value of both the game (8) is equal . and none of
              game has got face card and point value of both game's high card is
              equal so by comparing suits of both the high card ( A 5 of Heart ,
              B 5 of spade ) game B is declared 3 Baccarat winner .
            </li>
            <li>
              Ranking of suits from High to low :
              <div className="pl-2 pr-2">Spade</div>
              <div className="pl-2 pr-2">Heart</div>
              <div className="pl-2 pr-2">Club</div>
              <div className="pl-2 pr-2">Diamond</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Teen20Rules;
