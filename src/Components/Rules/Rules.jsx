import React from 'react';
import './Rules.css';

const Rules = () => {
  return (
    <div className="rules-container">
      <h2>Game Rules</h2>
      <ul>
        <li><strong>Click on a proper card to move it.</strong></li>
        <li><strong>On the top left, click on the face-down card to reveal new cards.</strong></li>
        <li><strong>Move cards to build sequences in descending order and alternating colors.</strong></li>
        <li><strong>Empty tableau spaces can only be filled with a King.</strong></li>
        <li><strong>The goal is to move all cards to the foundation piles, sorted by suit and in ascending order.</strong></li>
        <li><strong>Only the top card of each tableau pile can be moved to the foundation or another tableau pile.</strong></li>
        <li><strong>You can cycle through the deck as many times as needed.</strong></li>
      </ul>
    </div>
  );
};

export default Rules;
