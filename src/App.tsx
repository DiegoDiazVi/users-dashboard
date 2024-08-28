import { useEffect, useState } from 'react';
import './App.css';
import { ListOfUsers } from './components/ListOfUsers';
import type { User, UserList } from './types';

function App(): JSX.Element {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [changeColor, setChangeColor] = useState(false);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then((result) => result.json())
      .then((data: UserList) => setUsersList(data.results));
  }, []);

  const toggleRows = () => {
    setChangeColor(!changeColor);
  };

  return (
    <>
      <h1>Prueba Tecnica</h1>
      <header>
        <button onClick={toggleRows}> Colorear filas </button>
      </header>
      <main>
        <ListOfUsers changeColor={changeColor} users={usersList} />
      </main>
    </>
  );
}

export default App;
