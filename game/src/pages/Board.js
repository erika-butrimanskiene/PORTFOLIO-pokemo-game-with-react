import React from 'react';
import './Board.css';
import PlayersBoard from '../components/PlayersBoard';

function Board() {
  return (
    <main>
      <div className='board-window-wrapper'>
        <div className='leaders-board'>
          <div className='leaders-board__heading'>
            <h1>LEADERS BOARD</h1>
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
