"use client";

import React, {useContext} from "react";
import AuthContext from "@/context/AuthContext";

export default function NewPostPage() {
  const auth = useContext(AuthContext);
  if (!auth.login) {
    return (
        <div className="text-3xl font-bold primary text-center">
          <p>로그인이 필요합니다.</p>
        </div>
    );
  }


  return (
      <div className="text-3xl font-bold primary text-center">
        <p>쓰기모드</p>
      </div>
  );

}