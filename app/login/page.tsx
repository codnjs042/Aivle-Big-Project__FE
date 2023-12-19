"use client";

import { useState } from "react";
import { Textarea, Input, Button} from '@nextui-org/react';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Textarea>로그인 화면</Textarea>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <Input
                label="사용자 이름"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Input
                label="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button color="primary" onClick={handleSubmit}>
              로그인
            </Button>
          </div>
        </form>
      </div>
  );
}