import { useEffect, useMemo, useRef, useState } from 'react';
import {
  UserFilter,
  type sortFunctions,
  type User,
  type UserList,
  type UserListHook,
} from '../types.d';

export const useUserList = (url: string): UserListHook => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [changeColor, setChangeColor] = useState(false);
  const [sort, setSort] = useState(UserFilter.NONE);
  const [filter, setFilter] = useState('');

  const originalUsers = useRef<User[]>([]);

  useEffect(() => {
    fetch(url)
      .then((result) => result.json())
      .then((data: UserList) => {
        setUsersList(data.results);
        originalUsers.current = data.results;
      });
  }, [url]);

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

  return {
    sortUsers,
    changeColor,
    toggleRows,
    handleSort,
    handleDeleteUser,
    handleRestoreUsers,
    setFilter,
  };
};
