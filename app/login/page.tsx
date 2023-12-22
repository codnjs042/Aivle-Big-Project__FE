"use client";

import {ReactNode, useState} from "react";
import {Button, Checkbox, Divider, Input, Spacer} from '@nextui-org/react';
import {EditIcon, LockFilledIcon, SunFilledIcon} from "@nextui-org/shared-icons";
import {Link} from "@nextui-org/link";
import {redirect} from 'next/navigation'

function Col(props: { span: number, children: ReactNode }) {
  return null;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const dataToSend = {
      email: username,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:8000/api/hello/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('서버에서 문제가 발생했습니다. 에러 코드: ' + response.status);
      }

      const data = await response.json();
      console.log(data);
      //redirect('/');
    } catch (error) {
      console.error('로그인 요청 중 문제가 발생했습니다: ', error);
    }
  };

  return (
      <div className="flex flex-col gap-4 p-6 bg-top rounded-lg shadow-lg">
        <div
            className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
          <p className="text-3xl center">Welcome !</p>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
              type="string"
              label="ID"
              labelPlacement="outside"
              startContent={
                <EditIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
              }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
              type="password"
              label="Password"
              labelPlacement="outside"
              startContent={
                <LockFilledIcon
                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
              }
          />

        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Divider className="my-4"/>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Checkbox defaultSelected color="secondary">아이디 기억하기</Checkbox>
          <Link color="secondary">비밀번호를 잊으셨나요?</Link>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Spacer y={1}/>
        </div>
        <div
            className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
          <Button color="secondary" fullWidth={true} onClick={handleSubmit}>
            로그인
          </Button>
        </div>
        <div
            className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
          <SunFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
          <SunFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
          <SunFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
        </div>
      </div>
  );
}