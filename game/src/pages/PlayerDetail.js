import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PlayerDetail() {
  //STATES
  //--player
  const [player, setPlayer] = useState({});
  console.log(player);

  //PARAMS
  let { username } = useParams();

  //EFFECTS
  //-- to set player

  useEffect(() => {
    const URL = `http://localhost:5000/users/${username}`;
    const getUserByUsername = async () => {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      await setPlayer(data);
    };

    getUserByUsername();
  }, []);

  return (
    <main>
      <div>
        <div>{player.image}</div>
        <h3>{player.username}</h3>
        <p>{player.health}</p>
        <p>{player.gold}</p>
        {player.inventory &&
          player.inventory.map((inventoryItem) => <p>{inventoryItem}</p>)}
      </div>
    </main>
  );
}

export default PlayerDetail;
