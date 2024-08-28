import type { User } from '../types';

interface Props {
  users: User[];
}
export const ListOfUsers = ({ users }: Props): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          <td>Foto</td>
          <td>Nombre</td>
          <td>Apellido</td>
          <td>Pais</td>
          <td>Accion</td>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr>
            <td>
              <img src={user.picture.thumbnail} alt="a profile image" />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button>Borrar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
