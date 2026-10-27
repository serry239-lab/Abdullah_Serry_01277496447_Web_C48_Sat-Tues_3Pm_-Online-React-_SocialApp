import React, { createContext, useState } from "react";

type propsPage = {
  tkn: null | string;
  setToken: React.Dispatch<React.SetStateAction<null | string>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};
type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo: string;
  cover: string;
};
export const authContext = createContext<propsPage | null>(null);
export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tkn, setToken] = useState<null | string>(() => {
    return localStorage.getItem("tkn");
  });
  const [user, setUser] = useState<null | User>(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? (JSON.parse(stored) as User) : null;
    } catch (error) {
      return null;
    }
  });
  return (
    <authContext.Provider value={{ tkn, setToken, user, setUser }}>
      {children}
    </authContext.Provider>
  );
}
