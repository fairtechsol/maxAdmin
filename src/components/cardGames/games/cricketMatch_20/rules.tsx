import "./style.scss";

const Cricket20Rules = () => {
  return (
    <div className="rules-body">
      <div className="ball-rules-section text-white title-14">
        <ul className="pl-2 pr-2 list-style">
          <li>
            This is a game of twenty-20 cricket. We will already have the score
            of the first batting team, and the score of the second batting team
            up to 19.4 overs. At this stage, the second batting team will always
            be 12 runs short of the first batting team (IF THE SCORE IS TIED,
            SECOND BAT WILL WIN). This 12 runs have to be scored by 2 scoring
            shots or two steps.
          </li>
          <li>
            1st step is to select a scoring shot from 2, 3, 4, 5, 6, 7, 8, 9, or
            10. The one who bets will get a rate according to the scoring shot
            they select, and that will be considered as ball number 19.5.
          </li>
          <li>
            2nd step is to open a card from a 40-card deck (numbers 1 to 10 of
            all suits). This will be considered the last ball of the match. This
            twenty-20 game consists of scoring shots ranging from 1 run to 10
            runs.
          </li>
          <li className="text-danger">
            <b>IF THE SCORE IS TIED, SECOND BAT WILL WIN</b>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cricket20Rules;
