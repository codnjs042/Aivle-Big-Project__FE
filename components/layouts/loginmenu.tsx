"use client";

import {Button} from "@nextui-org/react";
import {Link} from "@nextui-org/link";
import {useContext, useEffect, useState} from "react";
import AuthContext from "@/context/AuthContext";
import {logoutFetch} from "@/api/user/logout";

export default function LoginMenu() {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    const response = await logoutFetch();
    if (response.ok) {
      auth.setLogin(false);
    }
  }

  return (
      <div className="flex gap-4 justify-start ml-2">
        {auth.login ? (
            <>
              <Button style={{
                background: 'none',
                border: '2px solid var(--nextui-color-secondary)'
              }}>{auth.user?.nickname} 님</Button>
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