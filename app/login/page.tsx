"use client";

import {ReactNode, useState} from "react";
import {Textarea, Input, Button, Spacer, Checkbox, Divider} from '@nextui-org/react';
import {LockFilledIcon, MailIcon, SunFilledIcon} from "@nextui-org/shared-icons";
import {Link} from "@nextui-org/link";

function Col(props: { span: number, children: ReactNode }) {
  return null;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
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
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
              }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
              type="password"
              label="Password"
              labelPlacement="outside"
              startContent={
                <LockFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
              }
          />

        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Divider className="my-4"/>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Checkbox defaultSelected>아이디 기억하기</Checkbox>
          <Link>비밀번호를 잊으셨나요?</Link>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Spacer y={1}/>
        </div>
        <div
            className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
          <Button color="primary" fullWidth={true}>
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