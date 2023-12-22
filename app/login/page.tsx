"use client";

import { ReactNode, useState } from "react";
import { Input, Button, Spacer } from '@nextui-org/react';
import { MailIcon } from "@nextui-org/shared-icons";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [step, setStep] = useState(false);

  const nextStep = () => setStep(step => !step);

  return (
    <div className="flex flex-col gap-4 p-6 bg-top rounded-lg shadow-lg">
      <div>
        <p>비밀번호를 잊었다면, 이메일을 입력해 주세요.</p>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            type="email"
            label="이메일"
            labelPlacement="outside"
            startContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Button color="secondary" onClick={() => {
            // 서버에 비밀번호 재설정 요청을 보냅니다.
            fetch('/api/reset-password', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: username }),
            })
              .then(response => response.json())
              .then(data => {
                console.log("서버 응답:", data);
                // 서버 응답을 기반으로 사용자에게 메시지를 표시하거나 다음 단계로 이동하는 등의 로직 추가
              })
              .catch(error => {
                console.error("서버 요청 에러:", error);
                // 에러 핸들링 로직 추가
              });
          }}>
            비밀번호 재설정 링크 받기
          </Button>
        </div>
        <button onClick={nextStep}>창닫기</button>
      </div>
    </div>
  );
}
