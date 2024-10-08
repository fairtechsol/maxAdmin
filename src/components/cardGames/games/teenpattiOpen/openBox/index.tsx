import React from 'react';
import "./style.scss"; // Make sure this path is correct

const CasinoBox = ({ player, pairPlus, cards, indx }: any) => {
    const playerName = player?.nation;
    const odds = player?.rate; // Assuming rate is the odds
    const total = player?.total; // Assuming total is part of player data

    return (
        <div className="casino-box mb-2 d-none-small">
            <div className="casino-open-card-box">
                {cards?.map((cardGroup: any, index: any) => (
                    <div key={index}>
                        <div><b>{index + 1}</b></div>
                        <div>
                            {cardGroup?.map((card: any, cardIndex: any) => (
                                <span key={cardIndex}>
                                    <img src={card} alt={`Card ${cardIndex + 1}`} />
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="casino-box-header">
                <div className="casino-nation-name no-border">
                    <span>{playerName}</span>
                </div>
                <div className="casino-bl-box text-right">
                    <div className="casino-bl-box-item">
                        <span>{playerName}</span>
                    </div>
                </div>
            </div>
            <div className="casino-box-content">
                <div className="casino-box-row mb-4">
                    <div className="casino-nation-name">
                        <b>Odds</b>
                        <i data-target="#range1" data-toggle="collapse" className="fas fa-info-circle float-right" aria-expanded="true"></i>
                        <div id="range1" className="icon-range collapse show">
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
                <div className="casino-box-row mb-4">
                    <div className="casino-nation-name">
                        <b>Pair Plus</b>
                        <i data-target="#range3" data-toggle="collapse" className="fas fa-info-circle float-right"></i>
                        <div id="range3" className="collapse icon-range">
                            R:<span>100</span>-<span>10K</span>
                        </div>
                    </div>
                    <div className="casino-bl-box">
                        <div className="back casino-bl-box-item suspended lock-top">
                            <span className="casino-box-odd open-pair">{pairPlus?.nation}</span>
                            <span className="casino-book book-red">0</span>
                        </div>
                    </div>
                </div>
                <div className="casino-box-row mb-4">
                    <div className="casino-nation-name">
                        <b>Total</b>
                        <i data-target="#range2" data-toggle="collapse" className="fas fa-info-circle float-right"></i>
                        <div id="range2" className="collapse icon-range">
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
