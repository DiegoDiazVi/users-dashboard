import { useEffect, useState } from 'react';
import './App.css';
import { ListOfUsers } from './components/ListOfUsers';
import type { User, UserList } from './types';

function App(): JSX.Element {
  const [usersList, setUsersList] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then((result) => result.json())
      .then((data: UserList) => setUsersList(data.results));
  }, []);

  return (
    <>
      <h1>Prueba Tecnica</h1>
      <ListOfUsers users={usersList} />
    </>
  );
}

export default App;
