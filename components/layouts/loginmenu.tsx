"use client";

import {Button} from "@nextui-org/react";
import {Link} from "@nextui-org/link";
import {useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import AuthContext from "@/context/AuthContext";
import {logoutFetch} from "@/api/user/logout";
import {infoFetch} from "@/api/user/info";
import {authFetch} from "@/api/authFetch";

export default function LoginMenu() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [login, setLogin] = useState(false);
  const [nickname, setNickname] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      console.log("auth.token: " + auth.token);
      const response = await infoFetch(auth.token, auth.setToken);
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setNickname(result.nickname);
        setLogin(true);
      }
    };
    fetchData();
  }, [auth.token]);

  const handleLogout = async () => {
    const response = await logoutFetch();
    if (response.ok) {
      auth.setToken('');
      setLogin(false);
    }
  }

  return (
      <div className="flex gap-4 justify-start ml-2">
        {login ? (
            <>
              <Button className="h-8" style={{
                background: 'none',
                border: '2px solid var(--nextui-color-secondary)'
              }}>{nickname} 님</Button>
              <Button className="h-8"
                      style={{
                        background: 'none',
                        border: '2px solid var(--nextui-color-secondary)'
                      }}
                      onClick={handleLogout}>로그아웃</Button>
            </>
        ) : (
            <Link href="/login">
              <Button className="h-8"
                      style={{
                        background: 'none',
                        border: '2px solid var(--nextui-color-secondary)'
                      }}>
                로그인</Button>
            </Link>
        )}

        <Link href="/register">
          <Button className="h-8"
                  style={{background: 'none', border: '2px solid var(--nextui-color-secondary)'}}>
            회원가입</Button>
        </Link>
      </div>
  );
}