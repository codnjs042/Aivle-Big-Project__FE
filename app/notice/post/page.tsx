"use client";

import React, {useContext, useState} from "react";
import {useSearchParams} from "next/navigation";
import AuthContext from "@/context/AuthContext";
import {Button} from "@nextui-org/react";

export default function PostPage(mode: number = 0) {
  const auth = useContext(AuthContext);
  const query = useSearchParams().get('id');
  const [id, setId] = useState(query ? parseInt(query, 10) : 0);

  switch (mode) {
    case 1:
      return (
          <div className="text-3xl font-bold primary text-center">
            <p>쓰기모드</p>
          </div>
      );
    case 2:
      return (
          <div className="text-3xl font-bold primary text-center">
            <p>수정모드</p>
          </div>
      );
    default:
      return (
          <>
            <Button>
              <a href={`/notice/post?id=${id + 1}`}>다음글</a>
            </Button>
            <div className="text-3xl font-bold primary text-center">
              <p>읽기모드</p>
            </div>
          </>
      );
  }
}