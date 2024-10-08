import React from 'react';
import "./style.scss";
const CasinoBox = ({ playerNames, cards, odds, pairPlus, total }:any) => {
    return (
        <div className="casino-box mb-2 d-none-small">
            <div className="casino-open-card-box">
                {cards?.map((cardGroup:any, index:any) => (
                    <div key={index}>
                        <div><b>{index + 1}</b></div>
                        <div>
                            {cardGroup?.map((card:any, cardIndex:any) => (
                                <span key={cardIndex} >
                                    <img src={card} alt={`Card ${cardIndex + 1}`} />
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="casino-box-header">
                <div className="casino-nation-name no-border"></div>
                <div className="casino-bl-box text-right">
                    {playerNames?.map((name:any, index:any) => (
                        <div className="casino-bl-box-item" key={index}>
                            <span>{name}</span>
                        </div>
                    ))}
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
                        {odds?.map((odd:any, index:any) => (
                            <div className="back casino-bl-box-item suspended lock-top" key={index}>
                                <span className="casino-box-odd">{odd}</span>
                                <span className="casino-book book-red">0</span>
                            </div>
                        ))}
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
                        {pairPlus?.map((pair:any, index:any) => (
                            <div className="back casino-bl-box-item suspended lock-top" key={index}>
                                <span className="casino-box-odd open-pair">{pair}</span>
                                <span className="casino-book book-red">0</span>
                            </div>
                        ))}
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
                        {total?.map((totalOdd:any, index:any) => (
                            <div className="back casino-bl-box-item suspended lock-top" key={index}>
                                <span className="casino-box-odd">{totalOdd}</span>
                                <span className="casino-book book-red">0</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CasinoBox;
