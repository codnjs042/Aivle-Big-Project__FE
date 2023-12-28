"use client";

import React, {useContext, useEffect, useMemo, useState} from "react";
import {Button, Checkbox, Divider, Input} from '@nextui-org/react';
import {EyeFilledIcon, EyeSlashFilledIcon, MailIcon} from "@nextui-org/shared-icons";
import {Link} from "@nextui-org/link";
import {useRouter} from 'next/navigation';
import {loginFetch} from "@/api/user/login";
import Cookies from 'js-cookie';
import ReCAPTCHA from "react-google-recaptcha";
import AuthContext from "@/context/AuthContext";
import {useTheme} from "next-themes";
export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const [rememberMe, setRememberMe] = useState(false);
  const [loginLoadingState, setLoginLoadingState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [captcha, setCaptcha] = useState<string>("");
  const [captchaKey, setCaptchaKey] = useState(Date.now());
  const {theme, setTheme } = useTheme();

  const [step, setStep] = useState(false);
  const auth = useContext(AuthContext);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const changeStep = () => setStep(step => !step);

  const validateEmail = useMemo(() => {
    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    if (email === "") return false;
    return !validateEmail(email);
  }, [email]);

  const checkReCaptcha = (value: string | null) => {
    if (value === null) return;
    setCaptcha(value);
  };

  const validateLogin = useMemo(() => {
    return !!email && !validateEmail && !!password && !!captcha;
  }, [email, validateEmail, password, captcha]);

  useEffect(() => {
    const emailCookie = Cookies.get('email');
    console.log('email cookie loaded:', Cookies.get('email'));
    if (emailCookie) {
      setEmail(emailCookie);
      setRememberMe(true);
    }
  }, []);
  const handleSubmit = async () => {
    setLoginLoadingState(true);
    setCaptchaKey(Date.now());
    //const token = await executeRecaptcha("login");
    rememberMe ? Cookies.set('email', email) : Cookies.remove('email');
    console.log('remember?', rememberMe, 'email value', email, 'email cookie:', Cookies.get('email'));
    const response = await loginFetch({email, password, captcha});
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log("token 발급: ", data.access);
      auth.setAccess(data.access);
      console.log("refresh 쿠키설정됨: ", data.refresh);
      auth.setLogin(true);
      router.replace('/');
    } else if (response.status === 400) {
      setErrorMessage('입력하지 않은 내용이 있습니다.');
    } else if (response.status === 401) {
      setErrorMessage('이메일 또는 비밀번호가 일치하지 않습니다.');
    } else if (response.status === 403) {
      setErrorMessage("캡차 인증을 다시 진행하세요.");
    }
    setLoginLoadingState(false);
  };

  switch (step) {
    case false:
      return (
          <div className="flex flex-col gap-4 p-6 bg-top rounded-lg shadow-lg">
            <div
                className="flex w-full justify-center">
              <p className="text-2xl">Welcome !</p>
            </div>
            <div className="flex w-full">
              <Input
                  isClearable
                  type="email"
                  label="Email"
                  labelPlacement="outside"
                  isInvalid={validateEmail}
                  color={validateEmail ? "danger" : "default"}
                  errorMessage={validateEmail && "올바른 이메일을 입력해주세요."}
                  startContent={
                    <MailIcon
                        className="text-2xl"/>
                  }
                  value={email}
                  onValueChange={setEmail}
                  onClear={() => setEmail('')}
              />
            </div>
            <div className="flex w-full">
              <Input
                  isClearable
                  label="Password"
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
                  value={password}
                  onValueChange={e => setPassword(e)}
                  onClear={() => setPassword('')}
              />

            </div>
            <div className="flex w-full gap-5 justify-between">
              <Checkbox defaultSelected color="secondary" checked={rememberMe}
                        onValueChange={setRememberMe}>아이디 기억하기</Checkbox>
              <Link color="secondary" onClick={changeStep}>비밀번호를 잊으셨나요?</Link>
            </div>

            <div className="flex w-full justify-center py-5">
              <ReCAPTCHA
                  sitekey="6Lc5sTspAAAAACJ_kKW6-60V9JOEg7gPMP9g-nC4"
                  onChange={checkReCaptcha}
                  theme={theme === "light" ? "light" : "dark"}
                  key={`${theme}${captchaKey}`}
              />
            </div>
            <Button color="secondary" onClick={handleSubmit}
                    isLoading={loginLoadingState} isDisabled={!validateLogin}>
              로그인
            </Button>
            <div
                className="flex w-full justify-center items-center">
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
          </div>
      );
    case true:
      return (
          <div className="flex flex-col gap-4 p-6 bg-top rounded-lg shadow-lg">
            <div>
              <h1 className="text-2xl">비밀번호 찾기</h1>
              <Divider className="mt-10"/>
              <div className="flex items-center mb-6 md:mb-0 gap-6 my-6">
                <span className="w-1/4 text-md text-default-500 text-right mr-1">이메일</span>
                <Input
                    type="email"
                    labelPlacement="outside"
                    endContent={<MailIcon
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>}
                    onValueChange={(e) => setEmail(e)}
                />
              </div>
              <div className="w-full flex items-center mb-6 md:mb-0 gap-6 my-6">
                <Button className="w-full font-thin" color="secondary" onClick={() => {
                  // 서버에 비밀번호 재설정 요청을 보냅니다.
                  fetch('/api/reset-password', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email: email}),
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
                  이메일 발송
                </Button>
              </div>
              <p className="my-4 mb-8 text-sm text-gray-300">가입 시 등록한 이메일 주소로 비밀번호 재설정 링크를
                보내드립니다.</p>
              <Button onClick={changeStep} color="secondary" variant="ghost"
                      className="mt-4 font-normal">확인</Button>
            </div>
          </div>
      );
  }
}