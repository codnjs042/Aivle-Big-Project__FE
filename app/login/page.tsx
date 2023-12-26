"use client";

import {useContext, useEffect, useState} from "react";
import {Button, Checkbox, Divider, Input, Spacer} from '@nextui-org/react';
import {EditIcon, LockFilledIcon, MailIcon, SunFilledIcon} from "@nextui-org/shared-icons";
import {Link} from "@nextui-org/link";
import {useRouter} from 'next/navigation';
import {loginFetch} from "@/api/user/login";
import Cookies from 'js-cookie';
import { useReCaptcha } from "next-recaptcha-v3";
import ReCAPTCHA from "react-google-recaptcha";
import AuthContext from "@/context/AuthContext";
import {backendConfig} from "@/api/apiconfig";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginLodingState, setLoginLoadingState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState(false);
  const auth = useContext(AuthContext);
  const nextStep = () => setStep(step => !step);
  const { executeRecaptcha } = useReCaptcha();

  const checkReCaptcha = (value: string | null) => {
    console.log("reCAPTCHA value:", value);
  };

  useEffect(() => {
    const emailCookie = Cookies.get('email');
    if (emailCookie) {
      setEmail(emailCookie);
    }
  }, []);
  const handleSubmit = async () => {
    setLoginLoadingState(true);
    const token = await executeRecaptcha("login");
    rememberMe ? Cookies.set('email', email) : Cookies.remove('email');
    const response = await loginFetch({email, password});
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      auth.setToken(data.token);
      router.replace('/');
    } else if (response.status === 400) {
      setErrorMessage('입력하지 않은 내용이 있습니다.');
    } else if (response.status === 401) {
      setErrorMessage('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
    setLoginLoadingState(false);
  };

  switch (step) {
    case false:
      return (
          <div className="flex flex-col gap-4 p-6 bg-top rounded-lg shadow-lg">
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <p className="text-3xl center">Welcome !</p>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                  isClearable
                  type="email"
                  label="Email"
                  labelPlacement="outside"
                  startContent={
                    <EditIcon
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                  }
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onClear={() => console.log("input cleared")}
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                  isClearable
                  type="password"
                  label="Password"
                  labelPlacement="outside"
                  startContent={
                    <LockFilledIcon
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                  }
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onClear={() => console.log("input cleared")}
              />

            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Divider className="my-4"/>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Checkbox defaultSelected color="secondary">아이디 기억하기</Checkbox>
              <Link color="secondary" onClick={nextStep}>비밀번호를 잊으셨나요?</Link>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Spacer y={1}/>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <ReCAPTCHA
                  sitekey="6Lc5sTspAAAAACJ_kKW6-60V9JOEg7gPMP9g-nC4"
                  onChange={checkReCaptcha}
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Spacer y={1}/>
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
              <Button color="secondary" fullWidth={true} onClick={handleSubmit}
                      isLoading={loginLodingState}>
                로그인
              </Button>
            </div>
            <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center"
                style={{height: '50px'}}>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
    case true:
      return (
          <div className="flex flex-col gap-4 p-6 bg-top rounded-lg shadow-lg">
            <div>
              <h1 className="text-2xl text-center font-bold mb-4 col-span-full">비밀번호 찾기</h1>
              <Divider className="mt-10"/>
              <div className="flex items-center mb-6 md:mb-0 gap-6 my-6">
                <span className="w-1/4 text-md text-default-500 text-right mr-1">이메일</span>
                <Input
                    type="email"
                    labelPlacement="outside"
                    endContent={<MailIcon
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>}
                    onChange={(e) => setEmail(e.target.value)}
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
              <Button onClick={nextStep} color="secondary" variant="ghost"
                      className="mt-4 font-normal">확인</Button>
            </div>
          </div>
      );
  }
}
//
//         <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//           <Input
//               isClearable
//               type="password"
//               label="Password"
//               labelPlacement="outside"
//               startContent={
//                 <LockFilledIcon
//                     className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
//               }
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               onClear={() => console.log("input cleared")}
//           />
//
//         </div>
//         <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//           <Divider className="my-4"/>
//         </div>
//         <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//           <Checkbox defaultSelected color="secondary" isSelected={rememberMe}
//                     onValueChange={setRememberMe}>아이디 기억하기</Checkbox>
//           <Link color="secondary">비밀번호를 잊으셨나요?</Link>
//         </div>
//         <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//           <Spacer y={1}/>
//         </div>
//         <div
//             className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
//           <Button color="secondary" fullWidth={true} onClick={handleSubmit}
//                   isLoading={loginLodingState}>
//             로그인
//           </Button>
//         </div>
//         <div
//             className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center"
//             style={{height: '50px'}}>
//           {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//         </div>
//         <div
//             className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
//           <SunFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
//           <SunFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
//           <SunFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
//         </div>
//       </div>
//   );
// }

// "use client";

// import { ReactNode, useState } from "react";
// import { Input, Button, Spacer } from '@nextui-org/react';
// import { MailIcon } from "@nextui-org/shared-icons";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [step, setStep] = useState(false);

//   const nextStep = () => setStep(step => !step);

//   return (
//     <div className="flex flex-col gap-4 p-6 bg-top rounded-lg shadow-lg">
//       <div>
//         <p>비밀번호를 잊었다면, 이메일을 입력해 주세요.</p>
//         <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//           <Input
//             type="email"
//             label="이메일"
//             labelPlacement="outside"
//             startContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//           <Button color="secondary" onClick={() => {
//             // 서버에 비밀번호 재설정 요청을 보냅니다.
//             fetch('/api/reset-password', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ email: username }),
//             })
//               .then(response => response.json())
//               .then(data => {
//                 console.log("서버 응답:", data);
//                 // 서버 응답을 기반으로 사용자에게 메시지를 표시하거나 다음 단계로 이동하는 등의 로직 추가
//               })
//               .catch(error => {
//                 console.error("서버 요청 에러:", error);
//                 // 에러 핸들링 로직 추가
//               });
//           }}>
//             비밀번호 재설정 링크 받기
//           </Button>
//         </div>
//         <button onClick={nextStep}>창닫기</button>
//       </div>
//     </div>
//   );
// }