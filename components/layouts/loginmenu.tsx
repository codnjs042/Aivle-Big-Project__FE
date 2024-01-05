"use client";

import {Button} from "@nextui-org/react";
import {Link} from "@nextui-org/link";
import {usePathname, useRouter} from 'next/navigation'
import {useContext, useEffect, useState} from "react";
import AuthContext from "@/context/AuthContext";
import {logoutFetch} from "@/api/user/logout";
import {Avatar, AvatarIcon} from "@nextui-org/react";


export default function LoginMenu() {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    const response = await logoutFetch();
    if (response.ok) {
      auth.setLogin(false);
    }
  }

  const pathname = usePathname()

  const isMenuSelected = (menuPath: string) => {
    return pathname === menuPath;
  };

  return (
      <div className="flex gap-4 justify-start ml-2">
        {auth.login ? (
            <>
              <Link href="/mypage">
                <Button startContent={<Avatar
                  icon={<AvatarIcon />}
                  size="sm"
                  classNames={{
                    base: "bg-gradient-to-br from-indigo-500 to-pink-500",
                    icon: "text-white/90",
                  }}
                />}
                    className={`h-10 pr-2 text-small ${isMenuSelected("/mypage") ? "text-purple-500" : ""}`}
                    style={{
                      background: 'none',
                      border: '2px solid var(--nextui-color-secondary)'
                    }}>{auth.user?.nickname} 님</Button>
              </Link>
              <Button
                  style={{
                    background: 'none',
                    border: '2px solid var(--nextui-color-secondary)'
                  }}
                  onClick={handleLogout}>로그아웃</Button>
            </>
        ) : (
            <>
              <Link href="/login">
                <Button
                    style={{
                      background: 'none',
                      border: '2px solid var(--nextui-color-secondary)'
                    }}>
                  로그인</Button>
              </Link>
              <Link href="/register">
                <Button
                    style={{
                      background: 'none',
                      border: '2px solid var(--nextui-color-secondary)'
                    }}>
                  회원가입</Button>
              </Link>
            </>
        )}
      </div>
  );
}