import '../App.css';
import { type User, UserFilter } from '../types.d';

interface Props {
  users: User[];
  changeColor: boolean;
  handleDeleteUser: (uuid: string) => void;
  handleSort: (sort: UserFilter) => void;
}
export const ListOfUsers = ({
  users,
  changeColor,
  handleDeleteUser,
  handleSort,
}: Props): JSX.Element => {
  const boldTitle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '16px',
  };

  const rowColor = changeColor ? 'table-row-color' : '';

  return (
    <table width={'100%'}>
      <thead>
        <tr style={boldTitle}>
          <td>Foto</td>
          <td className="pointer" onClick={() => handleSort(UserFilter.NAME)}>
            Nombre
          </td>
          <td className="pointer" onClick={() => handleSort(UserFilter.LAST)}>
            Apellido
          </td>
          <td
            className="pointer"
            onClick={() => handleSort(UserFilter.COUNTRY)}
          >
            Pais
          </td>
          <td>Accion</td>
        </tr>
      </thead>
      <tbody className={rowColor}>
        {users.map((user) => (
          <tr key={user.login.uuid}>
            <td>
              <img src={user.picture.thumbnail} alt="a profile image" />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button onClick={() => handleDeleteUser(user.login.uuid)}>
                Borrar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
