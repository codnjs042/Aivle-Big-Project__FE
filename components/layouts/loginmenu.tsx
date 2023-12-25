"use client";

import {Button} from "@nextui-org/react";
import {Link} from "@nextui-org/link";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {useContext} from "react";
import AuthContext from "@/context/AuthContext";

export default function LoginMenu() {
  const router = useRouter();
  const { isLogin, setIsLogin, nickname, setNickname } = useContext(AuthContext);

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    setIsLogin(false);
    setNickname('');
  }

  return (
      <>
        {isLogin ? (
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
                      onClick={logout}>로그아웃</Button>
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
      </>
  );
}