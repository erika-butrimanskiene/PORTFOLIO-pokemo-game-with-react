import React, { useContext, useState, useEffect } from 'react';
import { UserInfoContext } from '../App';
import './Arena.css';

//COMPONENTS
import Button from '../components/Button';
import EnemyProfile from '../components/EnemyProfile';
import Modal from '../components/Modal';

//PAGES
import LoggedInUser from '../components/LoggedInUser';

function Arena() {
  //CONTEXTS
  //-- user
  const user = useContext(UserInfoContext);
  //STATES
  const [enemyToPlay, setEnemyToPlay] = useState({});
  console.log(enemyToPlay);

  //-- select inventory msg
  const [selectMsg, setSelectMsg] = useState('');
  //-- inventory type to modal
  const [inventoryType, setInventoryType] = useState('');

  //EFFECTS
  useEffect(() => {
    generateEnemyToPlay();
  }, []);

  const generateEnemyToPlay = () => {
    const enemies = [
      {
        enemyname: 'Goblin',
        image: 'goblin_02.png',
        damage: 12,
        health: 100,
      },
      {
        enemyname: 'Troll',
        image: 'troll_21.png',
        damage: 8,
        health: 100,
      },
      {
        enemyname: 'Witch',
        image: 'witch_02.png',
        damage: 15,
        health: 100,
      },
    ];
    let randomIndex = Math.floor(Math.random() * 3);
    setEnemyToPlay(enemies[randomIndex]);
  };

  const closeModal = () => {
    setSelectMsg('');
  };

  const openInventoryList = (inventor) => {
    setSelectMsg('Choose Your Inventory');
    setInventoryType(inventor);
  };

  return (
    <main>
      <div className='arena-window-wrapper'>
        <h1 className='arena-window-heading'>LET'S GAME!</h1>
        <div className='arena-window'>
          <LoggedInUser
            image={user.userInfo.image}
            username={user.userInfo.username}
            health={user.userInfo.health}
            gold={user.userInfo.gold}
            isArena={true}
          />
          <div
            className='arena-armor-button'
            onClick={() => openInventoryList('armor')}
          >
            <Button className='button btn-pink' text='ARMOR' />
          </div>
          <div className='hit-button'>
            <Button className='button btn-red' text='HIT ENEMY' />
          </div>
          {Object.keys(enemyToPlay).length !== 0 && (
            <EnemyProfile
              image={enemyToPlay.image}
              enemyname={enemyToPlay.enemyname}
              health={enemyToPlay.health}
              damage={enemyToPlay.damage}
            />
          )}
        </div>

        {selectMsg !== '' && (
          <Modal
            inventory={user.userInfo.inventory}
            modalMsg={selectMsg}
            handleCloseModal={closeModal}
            inventoryType={inventoryType}
          />
        )}
      </div>
    </main>
  );
}

export default Arena;
