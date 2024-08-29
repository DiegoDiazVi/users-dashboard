import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { ListOfUsers } from './components/ListOfUsers';
import {
  type sortFunctions,
  type User,
  UserFilter,
  type UserList,
} from './types.d';

function App(): JSX.Element {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [changeColor, setChangeColor] = useState(false);
  const [sort, setSort] = useState(UserFilter.NONE);
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

  const handleSort = (sortType: UserFilter): void => {
    setSort(sortType);
  };

  const handleDeleteUser = (uuid: string): void => {
    const users = usersList.filter((user) => user.login.uuid !== uuid);
    setUsersList(users);
  };

  const handleRestoreUsers = (): void => {
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

  const sortFunction: sortFunctions = {
    [UserFilter.NONE]: null,
    [UserFilter.NAME]: (a, b) => a.name.first.localeCompare(b.name.first),
    [UserFilter.LAST]: (a, b) => a.name.last.localeCompare(b.name.last),
    [UserFilter.COUNTRY]: (a, b) =>
      a.location.country.localeCompare(b.location.country),
  };

  const sortUsers = useMemo(() => {
    if (filter.trim().length > 0) {
      return filterUsers;
    }

    return sortFunction[sort]
      ? [...usersList].sort(sortFunction[sort])
      : usersList;
  }, [sort, filterUsers]);

  return (
    <>
      <h1>Prueba Tecnica</h1>
      <header className="header">
        <button onClick={toggleRows}> Colorear filas </button>
        <button onClick={() => handleSort(UserFilter.COUNTRY)}>
          {' '}
          Ordenar por pais{' '}
        </button>
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
          users={sortUsers}
          handleDeleteUser={handleDeleteUser}
          handleSort={handleSort}
        />
      </main>
    </>
  );
}

export default App;
