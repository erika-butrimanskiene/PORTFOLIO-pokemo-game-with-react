import React, { useState, useEffect } from 'react';
import Player from './Player';

function PlayersBoard() {
  //STATES
  //-- plaeyrs
  const [players, setPlayers] = useState([]);

  //EFFECTS
  //-- to set players
  useEffect(() => {
    const URL = 'http://localhost:5000/users';

    const getUsers = async () => {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      await setPlayers(data);
      console.log(data);
    };

    getUsers();
  }, []);

  return (
    <div>
      {players.map((player) => (
        <Player
          image={player.image}
          username={player.username}
          gold={player.gold}
          key={player._id}
        />
      ))}
    </div>
  );
}

export default PlayersBoard;
