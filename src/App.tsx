import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { ListOfUsers } from './components/ListOfUsers';
import type { User, UserList } from './types';

function App(): JSX.Element {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [changeColor, setChangeColor] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);

  const originalUsers = useRef<User[]>([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then((result) => result.json())
      .then((data: UserList) => {
        setUsersList(data.results);
        originalUsers.current = data.results;
      });
  }, []);

  const toggleRows = (): void => {
    setChangeColor(!changeColor);
  };

  const handleSortByCountry = () => {
    setSortByCountry(!sortByCountry);
  };

  const handleDeleteUser = (uuid: string): void => {
    const users = usersList.filter((user) => user.login.uuid !== uuid);
    setUsersList(users);
  };

  const handleRestoreUsers = () => {
    setUsersList(originalUsers.current);
  };

  const sortCountrys = useMemo(() => {
    if (sortByCountry) {
      return [...usersList].sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      );
    }
    return usersList;
  }, [sortByCountry, usersList]);

  return (
    <>
      <h1>Prueba Tecnica</h1>
      <header>
        <button onClick={toggleRows}> Colorear filas </button>
        <button onClick={handleSortByCountry}> Ordenar por pais </button>
        <button onClick={handleRestoreUsers}> Restaurar los usuarios</button>
      </header>
      <main>
        <ListOfUsers
          changeColor={changeColor}
          users={sortCountrys}
          handleDeleteUser={handleDeleteUser}
        />
      </main>
    </>
  );
}

export default App;
