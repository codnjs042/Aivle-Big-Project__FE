"use client";
import {contents} from "./contents";
import {artist} from "./artist";
import React, {useCallback, useMemo, useState} from "react";
import {Button, Checkbox, Input, Progress, Select, SelectItem, Spacer,} from "@nextui-org/react";
import {
  AvatarIcon,
  EditIcon,
  EyeFilledIcon,
  EyeSlashFilledIcon,
} from "@nextui-org/shared-icons";
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
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [rePassword, setRePassword] = useState("");
  const [rePasswordVisible, setRePasswordVisible] = React.useState(false);

  const [nickname, setNickname] = useState("");

  const [selectedGenres, setSelectedGenres] = useState(new Set([]));
  const [selectedArtist, setSelectedArtist] = useState(new Set([]));

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const checkAgree = useMemo(() => { // step 1 유효성 검사
    return agreePrivacy && agreeTerms;
  }, [agreePrivacy, agreeTerms]);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleRePasswordVisibility = () => setRePasswordVisible(!rePasswordVisible);

  const validateEmail = useCallback((value: string) => {
    if (!value) return false;
    return !value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  }, []);

  const checkEmail = useMemo(() => validateEmail(email), [email]);
  const checkEmailDuplication = async () => {
    console.log("이메일 중복검사 시작");
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
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

  const validatePassword = useCallback((value: string) => {
    if (!value) return false;
    if (value.length < 8) {
      setPasswordError("8자리 이상 입력해주세요.")
      return true;
    }
    if (!value.match(/[0-9]/g)) {
      setPasswordError("숫자를 포함해주세요.")
      return true;
    }
    if (!value.match(/[a-zA-Z]/g)) {
      setPasswordError("영문을 포함해주세요.")
      return true;
    }
    if (!value.match(/[~!@#$%^&*()_+|<>?:{}]/g)) {
      setPasswordError("특수문자를 포함해주세요.")
      return true;
    }
    return false;
  }, []);

  const checkPassword = useMemo(() => validatePassword(password), [password]);

  const validateRePassword = useCallback((value: string, value2: string) => {
    if (!value) return false;
    return value !== value2;
  }, []);

  const checkRePassword = useMemo(() => validateRePassword(rePassword, password), [password, rePassword]);

  const checkInfo = useMemo(() => { // step 2 유효성 검사
    return !checkEmail && emailDuplication && !checkPassword && !checkRePassword && email && password && rePassword;
  }, [email, emailDuplication, password, rePassword]);
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

  const validateNickname= useCallback((value: string) => {
    if (!value) return false;
    return value.length > 30;
  }, []);

  const checkNickname = useMemo(() => validateNickname(nickname), [nickname]);

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
              <Progress isStriped size="lg" label="Step 1" value={33} className="max-w-md"/>
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
              <Progress isStriped size="lg" label="Step 2" value={67} className="max-w-md"/>
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
                  placeholder="이메일을 입력해주세요."
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
                <Button color="secondary" variant={emailDuplication ? "bordered" : "solid"}
                        onClick={() => emailDuplication ? setEmailDuplication(false) : checkEmailDuplication()}>
                  {emailDuplication ? '초기화' : '중복확인'}
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                  isClearable
                  isRequired={true}
                  label="비밀번호"
                  value={password}
                  placeholder="영문, 숫자, 특수문자를 포함하여 8자리 이상"
                  isInvalid={checkPassword}
                  color={checkPassword ? "danger" : "default"}
                  errorMessage={
                    checkPassword ? passwordError : ""
                  }
                  onChange={(e) => setPassword(e.target.value)}
                  labelPlacement="outside"
                  startContent={
                    <button className="focus:outline-none" type="button" onClick={togglePasswordVisibility}>
                      {passwordVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={passwordVisible ? "text" : "password"}
                  onClear={() => setPassword('')}
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                  isClearable
                  isRequired={true}
                  label="비밀번호 재확인"
                  value={rePassword}
                  isInvalid={checkRePassword}
                  color={checkRePassword ? "danger" : "default"}
                  errorMessage={
                    checkRePassword ? "비밀번호가 일치하지 않습니다." : ""
                  }
                  onChange={(e) => setRePassword(e.target.value)}
                  labelPlacement="outside"
                  startContent={
                    <button className="focus:outline-none" type="button" onClick={toggleRePasswordVisibility}>
                      {rePasswordVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={rePasswordVisible ? "text" : "password"}
                  onClear={() => setRePassword('')}
              />
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <Button color="secondary"
                      fullWidth={true} onClick={prevStep}>
                이전 단계로
              </Button>
              <Button color="secondary" variant={(checkInfo) ? "solid" : "flat"}
                      fullWidth={true} onClick={nextStep} disabled={!checkInfo}>
                {(checkInfo) ? "다음 단계로" : "모든 항목을 완료해주세요."}
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
              <Progress isStriped size="lg" label="Step 3" value={100} className="max-w-md"/>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                  isClearable
                  isRequired={true}
                  type="string"
                  label="닉네임"
                  value={nickname}
                  isInvalid={checkNickname}
                  color={checkNickname ? "danger" : "default"}
                  errorMessage={
                    checkNickname ? "닉네임이 너무 깁니다." : ""
                  }
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
