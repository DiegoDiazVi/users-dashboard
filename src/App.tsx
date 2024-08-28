import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { ListOfUsers } from './components/ListOfUsers';
import type { User, UserList } from './types';

function App(): JSX.Element {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [changeColor, setChangeColor] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then((result) => result.json())
      .then((data: UserList) => setUsersList(data.results));
  }, []);

  const toggleRows = (): void => {
    setChangeColor(!changeColor);
  };

  const handleSortByCountry = () => {
    setSortByCountry(!sortByCountry);
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
      </header>
      <main>
        <ListOfUsers changeColor={changeColor} users={sortCountrys} />
      </main>
    </>
  );
}

export default App;
