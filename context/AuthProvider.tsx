import React, {ReactNode, useEffect, useState} from "react";
import AuthContext, {AuthContextType, User} from "@/context/AuthContext";
import {infoFetch} from "@/api/user/info";
import useDidMountEffect from "@/utils/useDidMountEffect";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const [login, setLogin] = useState<boolean>(true);
  const [access, setAccess] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  const getUser = () => {
    console.log('유저정보를 가져옵니다.');
    const fetchUser = async () => {
      const response = await infoFetch(access, setAccess);
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setUser(result);
      } else {
        console.log("유저정보를 가져오는데 실패했습니다.");
        setLogin(false);
      }
    };
    fetchUser();
  }
  const deleteUser = () => {
    console.log('유저정보를 삭제합니다.');
    setAccess('');
    setUser(null);
  }

  useEffect(() => {
    if (login) {
      getUser();
    } else {
      deleteUser();
    }
  }, [login]);

  return (
      <AuthContext.Provider value={{login, setLogin, access, setAccess, user, setUser}}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthProvider;