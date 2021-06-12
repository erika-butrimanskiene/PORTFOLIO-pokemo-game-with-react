import React from 'react';
import './Board.css';
import PlayersBoard from '../components/PlayersBoard';

function Board() {
  return (
    <main>
      <div className='board-window-wrapper'>
        <div className='leaders-board'>
          <div className='leaders-board__heading'>
            <h2>LEADERS BOARD</h2>
          </div>

          <div className='leaders-board__leaders'>
            <PlayersBoard />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Board;
