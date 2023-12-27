"use client";
import React, {useCallback, useMemo, useState} from "react";
import {Button, Checkbox, Input, Progress, Select, SelectItem,} from "@nextui-org/react";
import {AvatarIcon, EyeFilledIcon, EyeSlashFilledIcon, MailIcon,} from "@nextui-org/shared-icons";
import PrivacyPolicy from "@/components/modals/privacyPolicy";
import TermOfUse from "@/components/modals/termOfUse";
import {emailFetch} from "@/api/user/email";
import {Artist, artistList} from "@/types/artist";
import {Genre, genreList} from "@/types/genre";
import {useRouter} from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
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

  const [selectedGenres, setSelectedGenres] = useState<Set<Genre>>(new Set([]));
  const [selectedArtist, setSelectedArtist] = useState<Set<Artist>>(new Set([]));

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
    alert("회원가입이 완료되었습니다.");
    router.replace('/login');
  };

  const validateNickname = useCallback((value: string) => {
    if (!value) return false;
    return value.length > 30;
  }, []);

  const checkNickname = useMemo(() => validateNickname(nickname), [nickname]);

  switch (step) {
    case 1:
      return (
          <>
            <div className="text-center">
              <p className="text-2xl center">회원가입</p>
              <Progress isStriped size="lg" label="Step 1" radius="lg" value={33}
                        style={{paddingBottom: '10px'}}/>
            </div>
            <div className="flex w-full justify-between">
              <PrivacyPolicy/>
              <Checkbox color="secondary" isSelected={agreePrivacy} onValueChange={setAgreePrivacy}>
                개인정보 처리방침에 동의합니다.
              </Checkbox>
            </div>
            <div className="flex w-full justify-between">
              <TermOfUse/>
              <Checkbox color="secondary" isSelected={agreeTerms} onValueChange={setAgreeTerms}>
                서비스 이용약관에 동의합니다.
              </Checkbox>
            </div>
            <div className="flex w-full py-5">
              <Button color="secondary" variant={(checkAgree) ? "solid" : "flat"}
                      fullWidth={true} onClick={nextStep} disabled={!checkAgree}>
                {(checkAgree) ? "다음 단계로" : "모든 항목에 동의해주세요"}
              </Button>
            </div>
          </>
      );
    case 2:
      return (
          <>
            <div className="text-center">
              <p className="text-2xl center">회원가입</p>
              <Progress isStriped size="lg" label="Step 2" radius="lg" value={67}
                        style={{paddingBottom: '10px'}}/>
            </div>
            <div className="flex w-full gap-5">
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
                  onValueChange={(e) => {
                    setEmail(e);
                    setEmailError('');
                  }}
                  labelPlacement="outside"
                  startContent={
                    <MailIcon className="text-2xl"/>
                  }
                  isDisabled={emailDuplication}
                  onClear={() => setEmail('')}
              />
              <div
                  className={checkEmail || emailError ? "flex flex-col justify-center" : "flex flex-col justify-end"}>
                <Button color="secondary" variant={emailDuplication ? "bordered" : "solid"}
                        onClick={() => emailDuplication ? setEmailDuplication(false) : checkEmailDuplication()}>
                  {emailDuplication ? '초기화' : '중복확인'}
                </Button>
              </div>
            </div>
            <div className="flex w-full">
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
                  onValueChange={(e) => setPassword(e)}
                  labelPlacement="outside"
                  startContent={
                    <button className="focus:outline-none" type="button"
                            onClick={togglePasswordVisibility}>
                      {passwordVisible ? (
                          <EyeSlashFilledIcon className="text-2xl"/>) : (
                          <EyeFilledIcon className="text-2xl"/>)}
                    </button>
                  }
                  type={passwordVisible ? "text" : "password"}
                  onClear={() => setPassword('')}
              />
            </div>
            <div className="flex w-full">
              <Input
                  isClearable
                  isRequired={true}
                  label="비밀번호 재확인"
                  value={rePassword}
                  placeholder="비밀번호와 동일하게 입력해주세요."
                  isInvalid={checkRePassword}
                  color={checkRePassword ? "danger" : "default"}
                  errorMessage={
                    checkRePassword ? "비밀번호가 일치하지 않습니다." : ""
                  }
                  onValueChange={(e) => setRePassword(e)}
                  labelPlacement="outside"
                  startContent={
                    <button className="focus:outline-none" type="button"
                            onClick={toggleRePasswordVisibility}>
                      {rePasswordVisible ? (
                          <EyeSlashFilledIcon className="text-2xl"/>) : (
                          <EyeFilledIcon className="text-2xl"/>)}
                    </button>
                  }
                  type={rePasswordVisible ? "text" : "password"}
                  onClear={() => setRePassword('')}
              />
            </div>
            <div className="flex w-full py-5 gap-10">
              <Button color="secondary"
                      fullWidth={true} onClick={prevStep}>
                이전 단계로
              </Button>
              <Button color="secondary" variant={(checkInfo) ? "solid" : "flat"}
                      fullWidth={true} onClick={nextStep} disabled={!checkInfo}>
                {(checkInfo) ? "다음 단계로" : "모든 항목을 완료해주세요."}
              </Button>
            </div>
          </>
      );
    case 3:
      return (
          <>
            <div className="text-center">
              <p className="text-2xl center">회원가입</p>
              <Progress isStriped size="lg" label="Step 3" value={100}/>
            </div>
            <div className="flex w-full">
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
                  onValueChange={(e) => setNickname(e)}
                  labelPlacement="outside"
                  startContent={
                    <AvatarIcon className="text-2xl"/>
                  }
                  onClear={() => setNickname('')}
              />
            </div>
            <div
                className="flex w-full">
              <Select
                  label="좋아하는 장르"
                  variant="bordered"
                  placeholder="무응답"
                  selectedKeys={selectedGenres}
                  labelPlacement="outside"
                  selectionMode="multiple"
                  onSelectionChange={(keys) => setSelectedGenres(new Set(keys) as Set<Genre>)}
              >
                {genreList.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                ))}
              </Select>
            </div>
            <div
                className="flex w-full">
              <Select
                  label="좋아하는 가수"
                  variant="bordered"
                  placeholder="무응답"
                  selectedKeys={selectedArtist}
                  labelPlacement="outside"
                  selectionMode="multiple"
                  onSelectionChange={(keys) => setSelectedArtist(new Set(keys) as Set<Artist>)}
              >
                {artistList.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                ))}
              </Select>
            </div>
            <div
                className="flex w-full py-5 gap-10">
              <Button color="secondary" fullWidth={true} onClick={prevStep}>
                이전 단계로
              </Button>
              <Button color="secondary" fullWidth={true} onClick={handleSubmit}>
                회원가입
              </Button>
            </div>
          </>
      );
    default:
      return null;
  }
}
