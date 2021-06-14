import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RiCoinsFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import ProgressBar from '../components/ProgressBar';

import './PlayerDetail.css';

function PlayerDetail() {
  //STATES
  //--player
  const [player, setPlayer] = useState({});
  const [show, setShow] = useState(false);
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
      setPlayer(data);
      setShow(true);
    };

    getUserByUsername();
  }, [username]);

  return (
    <main>
      <div className='player-detail-window-wrapper'>
        <Link className='player-detail__back' to='/'>
          <AiOutlineArrowLeft size={25} />
          Start Window
        </Link>
        {show && (
          <>
            <div className='player-detail'>
              <div className='player-detail__about-user'>
                <div className='player-detail__avatar-username'>
                  {
                    <div
                      className='player-detail__avatar'
                      style={{
                        backgroundImage: `url(http://localhost:5000/uploads/${player.image})`,
                      }}
                    ></div>
                  }

                  <div className='player-detail__username'>
                    <h3>{player.username}</h3>
                  </div>
                </div>
                <div className='player-detail__gold-health'>
                  <ProgressBar bgColor='#077285' completed={player.health} />
                  <p className='player-detail__gold'>
                    {' '}
                    <span>{player.gold}</span>{' '}
                    <RiCoinsFill size={30} color={'gold'} />
                  </p>
                </div>
              </div>

              <div>
                <h2 className='player-detail__inventory-list-heading'>
                  INVENTORY LIST
                </h2>
              </div>
              <div className='player-detail__inventory-list'>
                {player.inventory
                  .sort((a, b) => {
                    return a.type < b.type ? -1 : 1;
                  })
                  .map((inventoryItem, index) => {
                    return (
                      <div className='player-detail__inventory' key={index}>
                        <div
                          className='player-detail__inventory-icon'
                          style={{
                            backgroundImage: `url(http://localhost:5000/uploads/${inventoryItem.image})`,
                          }}
                        ></div>
                        <div className='player-detail__inventory-info-container'>
                          <p className='player-detail__inventory-info'>
                            Type: <span>{inventoryItem.type} </span>{' '}
                          </p>
                          {inventoryItem.type === 'armor' && (
                            <p className='player-detail__inventory-info'>
                              Defence: <span>{inventoryItem.defence} </span>{' '}
                            </p>
                          )}
                          {inventoryItem.type === 'potion' && (
                            <p className='player-detail__inventory-info'>
                              Heals: <span>{inventoryItem.heals} </span>{' '}
                            </p>
                          )}
                          {inventoryItem.type === 'weapon' && (
                            <>
                              <p className='player-detail__inventory-info'>
                                Name: <span>{inventoryItem.name} </span>{' '}
                              </p>
                              <p className='player-detail__inventory-info'>
                                Damage: <span>{inventoryItem.damage}</span>{' '}
                              </p>
                            </>
                          )}

                          {inventoryItem.type === 'weapon' && (
                            <p className='player-detail__inventory-info'>
                              <span>{inventoryItem.special} </span>{' '}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default PlayerDetail;
