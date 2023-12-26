"use client";

import {Button} from "@nextui-org/react";
import {Link} from "@nextui-org/link";
import {useRouter} from "next/navigation";
import {useContext} from "react";
import AuthContext from "@/context/AuthContext";
import {logout} from "@/api/user/logout";

export default function LoginMenu() {
  const router = useRouter();
  const { isLogin, setIsLogin, nickname, setNickname } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await logout({refresh: 'x'});
      setIsLogin(false);
      setNickname('');
    } catch (e) {
      console.log(e);
    }
  }

  return (
      <div className="flex gap-4 justify-start ml-2">
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