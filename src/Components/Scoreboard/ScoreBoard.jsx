import React from 'react';
import { useSelector } from 'react-redux';
import './Scoreboard.css';

function Scoreboard() {
    const foundations = useSelector((state) => state.foundations);
    const moves = useSelector((state) => state.moves); 
    const time = useSelector((state) => state.time); 

    const calculateScore = () => {
        let score=(foundations['H']+foundations['S']+foundations['C']+foundations['D'])*10;
        return score;
    };

    return (
        <div className="scoreboard">
            <div className="score-item">
                <span>Score: </span><span>{calculateScore()}</span>
            </div>
            <div className="score-item">
                <span>Moves: </span><span>{moves}</span>
            </div>
            <div className="score-item">
                <span>Time: </span><span>{time}</span>
            </div>
        </div>
    );
}

export default Scoreboard;
