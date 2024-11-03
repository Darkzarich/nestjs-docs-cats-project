export type Cat = {
  id: string;
  name: string;
  age: number;
  breed: string;
  owner: {
    id: string;
    login: string;
  };
};

export type User = {
  id: string;
  login: string;
  token: string;
};
