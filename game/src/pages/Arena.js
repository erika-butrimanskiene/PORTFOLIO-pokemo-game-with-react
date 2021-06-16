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
// import { RiSurroundSoundLine } from 'react-icons/ri';

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

  //-- select inventory msg
  const [selectMsg, setSelectMsg] = useState('');
  //-- is inventory selected
  const [inventoryUnselectedMsg, setInventoryUnselectedMsg] = useState('');
  //-- inventory type to modal
  const [inventoryType, setInventoryType] = useState('');

  //EFFECTS
  useEffect(() => {
    generateEnemyToPlay();
  }, []);

  //FUNCTIONS
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

  const closeUnselectedInfoModal = () => {
    setInventoryUnselectedMsg('');
  };

  const openInventoryList = (inventor) => {
    setSelectMsg(`Select ${inventor}`);
    setInventoryType(inventor);
  };

  const handleHit = () => {
    let enemyToPlayHit = enemyToPlay;
    let userHit = user.userInfo;
    handlePlayerHit(userHit, enemyToPlayHit);
  };

  const handlePlayerHit = (userHit, enemyToPlayHit) => {
    if (Object.keys(selectedWeapon).length !== 0) {
      let randomDamage = Math.floor(Math.random() * selectedWeapon.damage);
      enemyToPlayHit.health = enemyToPlayHit.health - randomDamage;
      handleEnemyHit(userHit, enemyToPlayHit);
    } else {
      setInventoryUnselectedMsg('Please select weapon.');
    }
  };

  const handleEnemyHit = async (userHit, enemyToPlayHit) => {
    if (Object.keys(selectedWeapon).length !== 0) {
      if (enemyToPlayHit.health > 0) {
        let randomDamage = Math.floor(Math.random() * enemyToPlayHit.damage);
        let randomDefence;
        let randomAmountOfGold = Math.floor(Math.random() * 10);

        if (Object.keys(selectedArmor).length !== 0) {
          randomDefence = Math.floor(Math.random() * selectedArmor.defence);
        } else {
          randomDefence = 0;
        }

        if (randomDefence - randomDamage < 0) {
          userHit.health = userHit.health - randomDamage + randomDefence;
        }

        if (userHit.health > 0) {
          userHit.gold = userHit.gold + randomAmountOfGold;
          await fetchToUpdateUser(userHit);
          user.invokeGetUserFetch();
          setEnemyToPlay({ ...enemyToPlayHit });
        } else {
          console.log('REIKIA PADARYTI KO NEPABAIGEI');
        }
      } else {
        generateEnemyToPlay();
      }
    } else {
      setInventoryUnselectedMsg(
        `Please select weapon. And don't forget armors!`
      );
    }
  };

  const usePotion = async (heals, index) => {
    user.userInfo.inventory.splice(index, 1);

    let userToUpdate = {
      ...user.userInfo,
      inventory: user.userInfo.inventory,
      health: user.userInfo.health + heals,
    };
    await fetchToUpdateUser(userToUpdate);
    user.invokeGetUserFetch();
  };

  //-- fetch to update user
  const fetchToUpdateUser = async (userToFetch) => {
    const URL = `http://localhost:5000/user/${user.userInfo._id}`;
    const token = localStorage.getItem('game-auth');
    const updateUser = async () => {
      const response = await fetch(URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'game-token': token,
        },
        body: JSON.stringify(userToFetch),
      });

      return response;
    };
    await updateUser();
  };

  return (
    <main>
      <SelectedInventoryContext.Provider
        value={{
          selectedArmor,
          setSelectedArmor,
          selectedWeapon,
          setSelectedWeapon,
          usePotion,
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

              <div className='hit-button' onClick={handleHit}>
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
          {inventoryUnselectedMsg !== '' && (
            <Modal
              modalMsg={inventoryUnselectedMsg}
              handleCloseModal={closeUnselectedInfoModal}
            />
          )}
        </div>
      </SelectedInventoryContext.Provider>
    </main>
  );
}

export default Arena;
