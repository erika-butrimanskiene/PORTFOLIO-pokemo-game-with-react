import React, { useContext, useState, useEffect } from 'react';
import { UserInfoContext } from '../App';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { GiHealthPotion } from 'react-icons/gi';
import { GiSwitchWeapon } from 'react-icons/gi';
import { GiArmorUpgrade } from 'react-icons/gi';
import './Arena.css';

//COMPONENTS
import Button from '../components/Button';
import EnemyProfile from '../components/EnemyProfile';
import Modal from '../components/Modal';

//PAGES
import LoggedInUser from '../components/LoggedInUser';

export const SelectedInventoryContext = React.createContext();

function Arena() {
  //CONTEXTS
  //-- user
  const user = useContext(UserInfoContext);
  //STATES
  //-- enemy to play
  const [enemyToPlay, setEnemyToPlay] = useState({});
  //-- selected armor
  const [selectedArmor, setSelectedArmor] = useState({});

  //-- selected weapon
  const [selectedWeapon, setSelectedWeapon] = useState({});

  //-- selected potion
  const [selectedPotion, setSelectedPotion] = useState({});

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
    setSelectMsg(`Select ${inventor}`);
    setInventoryType(inventor);
  };

  return (
    <main>
      <SelectedInventoryContext.Provider
        value={{
          selectedArmor,
          setSelectedArmor,
          selectedWeapon,
          setSelectedWeapon,
          selectedPotion,
          setSelectedPotion,
        }}
      >
        <div className='arena-window-wrapper'>
          <Link className='arena-window__back' to='/'>
            <AiOutlineArrowLeft size={25} />
            Start Window
          </Link>
          <h1 className='arena-window-heading'>LET'S GAME!</h1>
          <div className='arena-window'>
            <LoggedInUser
              image={user.userInfo.image}
              username={user.userInfo.username}
              health={user.userInfo.health}
              gold={user.userInfo.gold}
              isArena={true}
            />
            <div className='arena-window__all-buttons'>
              <div className='arena-window__inventory-buttons'>
                <div
                  className='arena-armor-button btn-blue'
                  onClick={() => openInventoryList('armor')}
                >
                  <GiArmorUpgrade size={30} />
                </div>

                <div
                  className='arena-armor-button btn-green'
                  onClick={() => openInventoryList('weapon')}
                >
                  <GiSwitchWeapon size={30} />
                </div>

                <div
                  className='arena-armor-button btn-pink'
                  onClick={() => openInventoryList('potion')}
                >
                  <GiHealthPotion size={30} />
                </div>
              </div>

              <div className='hit-button'>
                <Button className='button btn-red' text='HIT' />
              </div>
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
      </SelectedInventoryContext.Provider>
    </main>
  );
}

export default Arena;
