"use client";
import {contents} from "./contents";
import {artist} from "./artist";
import React, {useCallback, useMemo, useState} from "react";
import {Button, Checkbox, Input, Progress, Select, SelectItem, Spacer,} from "@nextui-org/react";
import {AvatarIcon, EditIcon, LockFilledIcon,} from "@nextui-org/shared-icons";
import PrivacyPolicy from "@/components/modals/privacyPolicy";
import TermOfUse from "@/components/modals/termOfUse";
import {emailFetch} from "@/api/user/email";

export default function SignupPage() {
  const [step, setStep] = useState(1);

  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [email, setEmail] = useState("");
  const [emailDuplication, setEmailDuplication] = useState(false);
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [nickname, setNickname] = useState("");

  const [selectedGenres, setSelectedGenres] = useState(new Set([]));
  const [selectedArtist, setSelectedArtist] = useState(new Set([]));

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const checkAgree = useMemo(() => { // step 1 유효성 검사
    return agreePrivacy && agreeTerms;
  }, [agreePrivacy, agreeTerms]);


  const validateEmail = useCallback((value: string) => {
    if (!value) return false;
    return !value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  }, []);

  const checkEmail = useMemo(() => validateEmail(email), [email]);
  const checkEmailDuplication = async () => {
    console.log("이메일 중복검사 시작");
    if (!email) {
      setEmailError("메일을 입력해주세요.");
      return;
    }
    if (validateEmail(email)) return;
    const response = await emailFetch(email);
    if (response.ok) {
      console.log("이메일 사용가능");
      setEmailDuplication(true);
      return;
    }
    if (response.status === 409) {
      console.log("이미 존재하는 이메일입니다.");
      setEmailDuplication(false);
      setEmailError("이미 가입된 이메일입니다.");
      return;
    }
  }

  const validatePassword = (value: string) => {
    if (!value) return false;
    return value.length < 8;
  }

  const checkInfo = useMemo(() => { // step 2 유효성 검사

    const validateRePassword = (value: string) => value === password;
    return validateEmail(email) && validatePassword(password) && validateRePassword(rePassword);
  }, [email, password, rePassword]);


  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Signup form submitted:", {
      email,
      nickname,
      password,
      selectedArtist,
      selectedGenres,
    });
  };


  switch (step) {
    case 1:
      return (
          <div className="flex flex-col gap-4 p-6 bg-top rounded-lg shadow-lg">
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <p className="text-3xl center">회원가입</p>
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center py-5">
              <Progress size="lg" aria-label="Loading..." value={33} className="max-w-md"/>
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-between">
              <PrivacyPolicy/>
              <Checkbox color="secondary" isSelected={agreePrivacy} onValueChange={setAgreePrivacy}>
                개인정보 처리방침에 동의합니다.
              </Checkbox>
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-between">
              <TermOfUse/>
              <Checkbox color="secondary" isSelected={agreeTerms} onValueChange={setAgreeTerms}>
                서비스 이용약관에 동의합니다.
              </Checkbox>
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <Button color="secondary" variant={(checkAgree) ? "solid" : "flat"}
                      fullWidth={true} onClick={nextStep} disabled={!checkAgree}>
                {(checkAgree) ? "다음 단계로" : "모든 항목에 동의해주세요"}
              </Button>
            </div>
          </div>
      );
    case 2:

      return (
          <div className="flex flex-col gap-4 p-6 bg-top rounded-lg shadow-lg"
               style={{width: '400px'}}>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <p className="text-3xl center">회원가입</p>
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center py-5">
              <Progress size="lg" aria-label="Loading..." value={67} className="max-w-md"/>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                  isClearable
                  isRequired={true}
                  type="email"
                  label="이메일"
                  isInvalid={checkEmail}
                  color={checkEmail ? "danger" : "default"}
                  errorMessage={
                    checkEmail ? "올바른 이메일을 입력해주세요." : emailError
                  }
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  labelPlacement="outside"
                  startContent={
                    <EditIcon
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                  }
                  isDisabled={emailDuplication}
                  onClear={() => setEmail('')}
              />
              <div className="flex flex-col justify-center h-unit-20">
                <Button color="secondary" variant="solid"
                        onClick={() => emailDuplication ? setEmailDuplication(false) : checkEmailDuplication()}>
                  {emailDuplication ? '초기화' : '중복확인'}
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                  isClearable
                  isRequired={true}
                  type="password"
                  label="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  labelPlacement="outside"
                  startContent={
                    <LockFilledIcon
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                  }
                  onClear={() => setPassword('')}
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                  isClearable
                  isRequired={true}
                  type="password"
                  label="비밀번호 재확인"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  labelPlacement="outside"
                  startContent={
                    <LockFilledIcon
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                  }
                  onClear={() => setRePassword('')}
              />
            </div>

            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <Button color="secondary"
                      fullWidth={true} onClick={prevStep}>
                이전 단계로
              </Button>
              <Button color="secondary" variant={(true) ? "solid" : "flat"}
                      fullWidth={true} onClick={nextStep}
                      disabled={false}>
                {(true) ? "다음 단계로" : "모든 내용을 입력해주세요"}

              </Button>
            </div>
          </div>
      );
    case 3:
      return (
          <div className="flex flex-col gap-4 p-6 bg-top rounded-lg shadow-lg"
               style={{width: '400px'}}>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <p className="text-3xl center">회원가입</p>
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center py-5">
              <Progress size="lg" aria-label="Loading..." value={100} className="max-w-md"/>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                  isClearable
                  isRequired={true}
                  type="string"
                  label="닉네임"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  labelPlacement="outside"
                  startContent={
                    <AvatarIcon
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                  }
                  onClear={() => setNickname('')}
              />
            </div>
            <div className="flex w-full max-w-xs flex-col gap-2">
              <Select
                  label="좋아하는 장르"
                  variant="bordered"
                  placeholder="장르를 선택하세요."
                  selectedKeys={selectedGenres}
                  className="max-w-xs"
                  selectionMode="multiple"
                  //onSelectionChange={setSelectedGenres}
              >
                {contents.map((content) => (
                    <SelectItem key={content.value} value={content.value}>
                      {content.label}
                    </SelectItem>
                ))}
              </Select>
              <p className="text-small text-default-500">선택: {Array.from(selectedGenres).join(', ')}</p>
            </div>

            <Select
                label="좋아하는 가수"
                variant="bordered"
                placeholder="가수를 선택하세요."
                selectedKeys={selectedArtist}
                className="max-w-xs"
                selectionMode="multiple"
                //onSelectionChange={setSelectedArtist}
            >
              {artist.map((star) => (
                  <SelectItem key={star.value} value={star.value}>
                    {star.label}
                  </SelectItem>
              ))}
            </Select>
            <p className="text-small text-default-500">선택: {Array.from(selectedArtist).join(', ')}</p>


            {/* <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <CheckboxGroup
                  className="gap-10"
                  label="선호하는 장르"
                  orientation="horizontal"
                  value={selectedGenres}
                  onValueChange={setSelectedGenres}
              >
                <Checkbox value="action">액션</Checkbox>
                <Checkbox value="drama">드라마</Checkbox>
                <Checkbox value="comedy">코미디</Checkbox>
                <Checkbox value="romance">로맨스</Checkbox>
                <Checkbox value="history">사극</Checkbox>
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
            </div> */}
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Spacer y={1}/>
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <Button color="secondary" fullWidth={true} onClick={prevStep}>
                이전 단계로
              </Button>
              <Button color="secondary" fullWidth={true} onClick={handleSubmit}>
                회원가입
              </Button>
            </div>
          </div>
      );
    default:
      return null;
  }
}
