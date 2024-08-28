import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { ListOfUsers } from './components/ListOfUsers';
import type { User, UserList } from './types';

function App(): JSX.Element {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [changeColor, setChangeColor] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
  const [filter, setFilter] = useState('');

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

  const filterUsers = useMemo(() => {
    if (filter.trim().length > 0) {
      return usersList.filter((user) =>
        user.location.country.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return usersList;
  }, [filter, usersList]);

  const sortCountrys = useMemo(() => {
    if (filter.trim().length > 0) {
      return filterUsers;
    }
    if (sortByCountry) {
      return [...usersList].sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      );
    }
    return usersList;
  }, [sortByCountry, filterUsers]);

  return (
    <>
      <h1>Prueba Tecnica</h1>
      <header className="header">
        <button onClick={toggleRows}> Colorear filas </button>
        <button onClick={handleSortByCountry}> Ordenar por pais </button>
        <button onClick={handleRestoreUsers}> Restaurar los usuarios</button>
        <input
          type="text"
          placeholder="Ingresa un pais"
          onChange={(e) => setFilter(e.target.value)}
        />
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
