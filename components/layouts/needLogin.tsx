import React from "react";
import {Button} from "@nextui-org/react";
import Link from 'next/link';

export default function NeedLogin() {
  return (
      <div
          className="flex flex-col items-center justify-center gap-10 text-2xl font-bold primary text-center py-48">
        <p>로그인이 필요한 서비스입니다.</p>
        <div className="flex justify-between gap-5">
          <Button color="secondary">
            <Link href="/login">
              <p>로그인</p>
            </Link>
          </Button>
          <Button color="secondary">
            <Link href="/register">
              <p>회원가입</p>
            </Link>
          </Button>
        </div>
      </div>
  );
}