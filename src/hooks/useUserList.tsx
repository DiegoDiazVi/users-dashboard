import { useEffect, useMemo, useRef, useState } from 'react';
import {
  UserFilter,
  type sortFunctions,
  type User,
  type UserList,
  type UserListHook,
} from '../types.d';

/**
 * Custom hook for managing a user list.
 *
 * @param {string} url - The URL to fetch user data from.
 * @returns {UserListHook} - An object containing functions and state variables for managing the user list.
 */
export const useUserList = (url: string): UserListHook => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [changeColor, setChangeColor] = useState(false);
  const [sort, setSort] = useState(UserFilter.NONE);
  const [filter, setFilter] = useState('');

  const originalUsers = useRef<User[]>([]);

  useEffect(() => {
    /**
     * Fetches user data from the specified URL and updates the user list state.
     *
     * @returns {Promise<void>} A promise that resolves when the data is fetched and the state is updated.
     */
    const fetchData = async () => {
      try {
        const result = await fetch(url);
        const data: UserList = await result.json();
        setUsersList(data.results);
        originalUsers.current = data.results;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url]);

  /**
   * Toggles the color of the rows.
   */
  const toggleRows = (): void => {
    setChangeColor(!changeColor);
  };

  /**
   * Handles the sorting of the user list.
   *
   * @param sortType - The type of sorting to apply to the user list.
   * @returns void
   */
  const handleSort = (sortType: UserFilter): void => {
    setSort(sortType);
  };

  /**
   * Deletes a user from the user list.
   *
   * @param {string} uuid - The UUID of the user to be deleted.
   * @returns {void}
   */
  const handleDeleteUser = (uuid: string): void => {
    const users = usersList.filter((user) => user.login.uuid !== uuid);
    setUsersList(users);
  };

  /**
   * Restores the users list to its original state.
   */
  const handleRestoreUsers = (): void => {
    setUsersList(originalUsers.current);
  };

  /**
   * Memoized hook to filter a list of users based on a filter string.
   *
   * @param {string} filter - The filter string to apply.
   * @param {User[]} usersList - The list of users to filter.
   * @returns {User[]} - The filtered list of users.
   */
  const filterUsers = useMemo(() => {
    if (filter.trim().length > 0) {
      return usersList.filter((user) =>
        user.location.country.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return usersList;
  }, [filter, usersList]);

  /**
   * Defines a sort function object for user filtering.
   * @typedef {Object} sortFunctions
   * @property {Function} [UserFilter.NONE] - Sort function for no filter.
   * @property {Function} [UserFilter.NAME] - Sort function for filtering by user name.
   * @property {Function} [UserFilter.LAST] - Sort function for filtering by user last name.
   * @property {Function} [UserFilter.COUNTRY] - Sort function for filtering by user country.
   */
  const sortFunction: sortFunctions = {
    [UserFilter.NONE]: () => 0,
    [UserFilter.NAME]: (a, b) => a.name.first.localeCompare(b.name.first),
    [UserFilter.LAST]: (a, b) => a.name.last.localeCompare(b.name.last),
    [UserFilter.COUNTRY]: (a, b) =>
      a.location.country.localeCompare(b.location.country),
  };

  /**
   * Memoized function that sorts the user list based on the provided sort and filter criteria.
   *
   * @returns The sorted user list.
   */
  const sortUsers = useMemo(() => {
    if (filter.trim().length > 0) {
      return filterUsers;
    }

    return sortFunction[sort]
      ? [...filterUsers].sort(sortFunction[sort])
      : usersList;
  }, [sort, filterUsers, filter]);

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
