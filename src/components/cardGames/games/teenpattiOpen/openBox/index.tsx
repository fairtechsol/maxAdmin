import React from 'react';
import './style.scss';

const CasinoBox = ({ player, pairPlus, cards, indx }: any) => {
    //const playerName = `Player ${indx + 1}`;
    const odds = player?.rate || "1.98"; // Default odds
    const total = player?.max || "1.98"; // Default total
    const pairPlusName = pairPlus?.nation || `Pair Plus ${indx + 1}`; // Pair Plus naming
    const pairPlusRate = pairPlus?.rate || "0"; // Pair Plus rate

    const validCards = Array.isArray(cards) ? cards : [];

    return (
        <div className="casino-box mb-2 d-none-small">
            {/* Cards Display */}
            <div className="casino-open-card-box">
                <div>
                    <b>{indx + 1}</b> {/* Player number */}
                    <div>
                        {validCards.map((card: any, cardIndex: any) => (
                            <span key={cardIndex} data-showclosecard="true">
                                <img src={card} alt={`Card ${cardIndex + 1}`} />
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Odds, Pair Plus, and Total Rows */}
            <div className="casino-box-content">
                {/* Odds Row */}
                <div className="casino-box-row mb-4">
                    <div className="casino-nation-name">
                        <b>Odds</b>
                        <i data-target={`#rangeOdds${indx}`} data-toggle="collapse" className="fas fa-info-circle float-right"></i>
                        <div id={`rangeOdds${indx}`} className="collapse icon-range">
                            R:<span>100</span>-<span>1L</span>
                        </div>
                    </div>
                    <div className="casino-bl-box">
                        <div className="back casino-bl-box-item suspended lock-top">
                            <span className="casino-box-odd">{odds}</span>
                            <span className="casino-book book-red">0</span>
                        </div>
                    </div>
                </div>

                {/* Pair Plus Row */}
                <div className="casino-box-row mb-4">
                    <div className="casino-nation-name">
                        <b>Pair Plus</b>
                        <i data-target={`#rangePairPlus${indx}`} data-toggle="collapse" className="fas fa-info-circle float-right"></i>
                        <div id={`rangePairPlus${indx}`} className="collapse icon-range">
                            R:<span>100</span>-<span>10K</span>
                        </div>
                    </div>
                    <div className="casino-bl-box">
                        <div className="back casino-bl-box-item suspended lock-top">
                            <span className="casino-box-odd open-pair">{pairPlusRate}</span>
                            <span className="casino-book book-red">{pairPlusName}</span>
                        </div>
                    </div>
                </div>

                {/* Total Row */}
                <div className="casino-box-row mb-4">
                    <div className="casino-nation-name">
                        <b>Total</b>
                        <i data-target={`#rangeTotal${indx}`} data-toggle="collapse" className="fas fa-info-circle float-right"></i>
                        <div id={`rangeTotal${indx}`} className="collapse icon-range">
                            R:<span>100</span>-<span>10K</span>
                        </div>
                    </div>
                    <div className="casino-bl-box">
                        <div className="back casino-bl-box-item suspended lock-top">
                            <span className="casino-box-odd">{total}</span>
                            <span className="casino-book book-red">0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CasinoBox;
