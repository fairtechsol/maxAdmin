
const AndarBaharRules = () => {
  const rules = [
    "Andar Bahar is a very simple game that involves the use of a single pack of cards. The game is played between the House and the Player. The dealer deals a single card face up on the Joker place and then proceeds to deal cards face up on A (ANDAR) and B (BAHAR) spots. When a card appears that matches the value of the Joker card, the game ends. Before the start of the game, players bet on which side they think the game will end.",
    "Before the dealer starts dealing/opening cards from the deck, he/she also offers a side bet to the players who have estimated time to bet if the card/joker will be dealt as the 1st card.",
    "If the 1st placed card doesn't match the value of the Joker's card, the game continues and the dealer then offers the option to players to put their 2nd bet on the same joker card to be dealt either on ANDAR or on BAHAR. The players again have estimated time to decide if they want to place a 2nd bet. Dealer deals the cards one at a time alternating between two spots.",
    "If the 1st dealt card in 1st bet matches the joker’s card, the Bahar side wins with payout 1:0.5.",
    "If the 1st dealt card in 1st bet matches the joker’s card, the Andar side wins with payout 1:0.5.",
    "If the 2nd dealt card in 1st bet matches the joker’s card, the Bahar side wins with payout 1:0.5.",
    "If the 2nd dealt card in 1st bet matches the joker’s card, the Andar side wins with payout 1:0.5.",
  ];

  const payoutTable = [
    {
      bet: "1st Bet Bahar",
      description: "Payout if Bahar Wins on the 1st bet",
      payout: "1 to 1",
    },
    {
      bet: "1st Bet Andar",
      description: "Payout if Andar wins on the 1st bet",
      payout: "1 to 1",
    },
    {
      bet: "2nd Bet Bahar",
      description: "Payout if Bahar wins on the 2nd bet",
      payout: "1 to 1",
    },
    {
      bet: "2nd Bet Andar",
      description: "Payout if Andar wins on the 1st bet",
      payout: "1 to 1",
    },
    {
      bet: "Side Bets Bahar",
      description: "Payout for winning side bet.",
      payout: "1 to 14",
    },
    {
      bet: "Side Bets Andar",
      description: "Payout for winning side bet.",
      payout: "1 to 14",
    },
  ];

  return (
    <div className="rules-body text-white title-14">
      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <h6 style={{ color: "#FDCF13", fontSize: "16px" }}>Rules</h6>
        <ul
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            listStyleType: "disc",
          }}
        >
          {rules.map((rule, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              {rule}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <h6 style={{ color: "#FDCF13", fontSize: "16px" }}>Payout</h6>
        <div
          style={{
            overflowX: "auto",
            border: "1px solid #444",
            backgroundColor: "#222",
            borderRadius: "5px",
          }}
        >
          <table style={{ color: "#fff", fontSize: "12px", width: "100%" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #444" }}>Bet</th>
                <th style={{ borderBottom: "1px solid #444" }}>Description</th>
                <th style={{ borderBottom: "1px solid #444" }}>Payout</th>
              </tr>
            </thead>
            <tbody>
              {payoutTable.map((item, index) => (
                <tr key={index}>
                  <td style={{ borderBottom: "1px solid #444" }}>{item.bet}</td>
                  <td style={{ borderBottom: "1px solid #444" }}>
                    {item.description}
                  </td>
                  <td style={{ borderBottom: "1px solid #444" }}>
                    {item.payout}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AndarBaharRules;
