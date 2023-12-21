"use client";

import {useState} from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Listbox,
  ListboxItem,
  Spacer
} from "@nextui-org/react";
import {
  AvatarIcon,
  EditIcon,
  LockFilledIcon,
  MailIcon,
  MonitorMobileIcon,
  SunFilledIcon,
} from "@nextui-org/shared-icons";
import PrivacyPolicy from "@/components/modals/privacyPolicy";
import TermOfUse from "@/components/modals/termOfUse";

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [number, setNumber] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedArtist, setSelectedArtist] = useState(new Set(["start1"]));

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Signup form submitted:", {
      name,
      email,
      password,
      repassword,
      selectedArtist,
      selectedGenres,
    });
  };

  // const fixedWidthStyle = {
  //   maxWidth: "400px", // 고정된 너비
  //   margin: "0 auto", // 가운데 정렬
  // };

  switch (step) {
    case 0:
      return (
          <div className="flex flex-col gap-4 p-6 bg-top rounded-lg shadow-lg">
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <p className="text-3xl center">회원가입</p>
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <p className="text-2xl center">Step 0</p>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-between">
              <PrivacyPolicy/>
              <Checkbox color="secondary" isSelected={agreePrivacy} onValueChange={setAgreePrivacy}>
                개인정보 처리방침에 동의합니다.
              </Checkbox>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-between">
              <TermOfUse/>
              <Checkbox color="secondary" isSelected={agreeTerms} onValueChange={setAgreeTerms}>
                서비스 이용약관에 동의합니다.
              </Checkbox>
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <Button color="secondary" variant = {(agreePrivacy && agreeTerms) ? "solid" : "flat"} fullWidth={true} onClick={nextStep} disabled={!(agreePrivacy && agreeTerms)}>
                {(agreePrivacy && agreeTerms) ? "다음 단계로" : "모든 항목을 체크해주세요"}
              </Button>

            </div>
          </div>
      );
    case 1:
      return (
          <div className="flex flex-col gap-4 p-6 bg-top rounded-lg shadow-lg">
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <p className="text-3xl center">회원가입</p>
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <p className="text-2xl center">Step 1</p>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                  type="string"
                  label="아이디"
                  labelPlacement="outside"
                  startContent={
                    <EditIcon
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
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
                    <LockFilledIcon
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                  }
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                  type="repassword"
                  label="비밀번호 재확인"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  labelPlacement="outside"
                  startContent={
                    <LockFilledIcon
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                  }
              />
            </div>

            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <Button color="secondary" fullWidth={true} onClick={prevStep}>
                이전 단계로
              </Button>
              <Button color="secondary" fullWidth={true} onClick={nextStep}>
                다음 단계로
              </Button>
            </div>
          </div>
      );
    case 2:
      return (
          <div className="flex flex-col gap-4 p-6 bg-top rounded-lg shadow-lg">
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <p className="text-3xl center">회원가입</p>
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <p className="text-2xl center">Step 2</p>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                  type="string"
                  label="이름"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  labelPlacement="outside"
                  startContent={
                    <AvatarIcon
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
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
                    <MailIcon
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
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
                    <MonitorMobileIcon
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                  }
              />
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <Button color="secondary" fullWidth={true} onClick={prevStep}>
                이전 단계로
              </Button>
              <Button color="secondary" fullWidth={true} onClick={nextStep}>
                다음 단계로
              </Button>
            </div>
          </div>
      );
    case 3:
      return (
          <div className="flex flex-col gap-4 p-6 bg-top rounded-lg shadow-lg">
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <p className="text-3xl center">회원가입</p>
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <p className="text-2xl center">Step 3</p>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4" style={{  marginTop: '20px' }}>
              <CheckboxGroup
                  className="gap-10"
                  label="선호하는 장르"
                  orientation="horizontal"
                  value={selectedGenres}
                  onValueChange={setSelectedGenres}
              >
                <Checkbox value="action">액션</Checkbox>
                <Checkbox value="drama" style={{ marginLeft: '10px' }}>드라마</Checkbox>
                <Checkbox value="comedy" style={{ marginLeft: '10px' }}>코미디</Checkbox>
                <Checkbox value="romance" style={{ marginLeft: '10px' }}>로맨스</Checkbox>
                <Checkbox value="history" style={{ marginLeft: '10px' }}>사극</Checkbox>
              </CheckboxGroup>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Listbox
                  className="gap-5"
                  aria-label="Favorite Artist"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="multiple"
                  selectedKeys={selectedArtist}
                  onSelectionChange={(keys) => setSelectedArtist(keys as Set<string>)}
              >
                <ListboxItem key="start1" style={{ marginTop: '20px', marginBottom: '5px' }}>BTS</ListboxItem>
                <ListboxItem key="start2" style={{  marginTop: '10px', marginBottom: '5px' }}>BLACKPINK</ListboxItem>
                <ListboxItem key="start3" style={{  marginTop: '10px', marginBottom: '10px' }}>NEWJEANS</ListboxItem>
              </Listbox>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Spacer y={1}/>
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <Button color="secondary" fullWidth={true} onClick={prevStep} style={{  marginLeft: '100px' }}>
                이전 단계로
              </Button>
              <Button color="secondary" fullWidth={true} onClick={handleSubmit} style={{  marginRight: '100px' }}>
                회원가입
              </Button>
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <SunFilledIcon
                  className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
              <SunFilledIcon
                  className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
              <SunFilledIcon
                  className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
            </div>
          </div>
      );
    default:
      return null;
  }
}
