export interface UserList {
  results: User[];
  info: Info;
}

export interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface User {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Dob;
  phone: string;
  cell: string;
  id: ID;
  picture: Picture;
  nat: string;
}

export interface Dob {
  date: Date;
  age: number;
}

export interface ID {
  name: string;
  value: string;
}

export interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number | string;
  coordinates: Coordinates;
  timezone: Timezone;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Street {
  number: number;
  name: string;
}

export interface Timezone {
  offset: string;
  description: string;
}

export interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export enum UserFilter {
  NONE = 'none',
  COUNTRY = 'country',
  NAME = 'name',
  LAST = 'last',
}

type sortFunctions = {
  [key in UserFilter]: (a: User, b: User) => number;
};

export interface UserListHook {
  sortUsers: User[];
  changeColor: boolean;
  toggleRows: () => void;
  handleSort: (sortType: UserFilter) => void;
  handleDeleteUser: (uuid: string) => void;
  handleRestoreUsers: () => void;
  setFilter: (value: string) => void;
}
