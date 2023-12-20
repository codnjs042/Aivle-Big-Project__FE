"use client";

import {useState} from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Input,
  Listbox,
  ListboxItem,
  Spacer,
} from "@nextui-org/react";
import {
  LockFilledIcon,
  MailIcon,
  SunFilledIcon,
  AvatarIcon,
  EditIcon,
  MonitorMobileIcon,
} from "@nextui-org/shared-icons";
import { Link } from "@nextui-org/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<string[]>([]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Signup form submitted:", {
      name,
      email,
      password,
      rememberMe,
      selectedGenres,
    });
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-top rounded-lg shadow-lg">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
        <p className="text-3xl center">회원가입</p>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="string"
          label="아이디"
          labelPlacement="outside"
          startContent={
            <EditIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="password"
          label="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          labelPlacement="outside"
          startContent={
            <LockFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="password"
          label="비밀번호 재확인"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          labelPlacement="outside"
          startContent={
            <LockFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="string"
          label="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          labelPlacement="outside"
          startContent={
            <AvatarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="email"
          label="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          labelPlacement="outside"
          startContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="number"
          label="휴대전화"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          labelPlacement="outside"
          startContent={
            <MonitorMobileIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Divider className="my-4" />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <CheckboxGroup
          className="gap-5"
          label="선호하는 장르"
          orientation="horizontal"
          value={selectedGenres}
          onChange={(values) => setSelectedGenres}
        >
          <Checkbox value="action">액션</Checkbox>
          <Checkbox value="drama">드라마</Checkbox>
          <Checkbox value="comedy">코미디</Checkbox>
          <Checkbox value="romance">로맨스</Checkbox>
          <Checkbox value="history">사극</Checkbox>
          {/* Add more genres as needed */}
        </CheckboxGroup>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Listbox
          className="gap-5"
          aria-label="Favorite Artist"
          label="Favorite Contents"
          variant="flat"
          disallowEmptySelection
          selectionMode="multiple"
          selectedKeys={selectedArtist}
          onChange={(values) => setSelectedArtist}
        >
          <ListboxItem key="start1">BTS</ListboxItem>
          <ListboxItem key="start2">BLACKPINK</ListboxItem>
          <ListboxItem key="start3">NEWJEANS</ListboxItem>
        </Listbox>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Spacer y={1} />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
        <Button color="secondary" fullWidth={true} onClick={handleSubmit}>
          회원가입
        </Button>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
        <SunFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        <SunFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        <SunFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      </div>
    </div>
  );
}
