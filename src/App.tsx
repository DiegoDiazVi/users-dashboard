import './App.css';
import { ListOfUsers } from './components/ListOfUsers';
import { useUserList } from './hooks/useUserList';
import { UserFilter } from './types.d';

function App(): JSX.Element {
  const {
    sortUsers,
    changeColor,
    toggleRows,
    handleSort,
    handleDeleteUser,
    handleRestoreUsers,
    setFilter,
  } = useUserList();
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
