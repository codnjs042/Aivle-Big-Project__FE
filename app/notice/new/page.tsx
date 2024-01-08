"use client";

import React, {useContext, useEffect, useState} from "react";
import AuthContext from "@/context/AuthContext";
import NeedLogin from "@/components/layouts/needLogin";
import {Button, Textarea} from "@nextui-org/react";
import Link from "next/link";
import {newPost} from "@/api/notice/newPost";
import {useRouter} from "next/navigation";

export default function NewPostPage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [submitLoadingState, setSubmitLoadingState] = useState(false);

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [error, setError] = React.useState(false);

  async function handleSubmit() {
    setSubmitLoadingState(true);
    if (!title || !content) {
      setError(true);
    } else {
      setError(false);
      try {
        const response = await newPost(auth.access, auth.setAccess, { title, content });
        if (response.ok) {
          router.replace("/notice")
        }
      } catch (error) {
        alert("글 작성에 문제가 생겼습니다.")
      }
    }
    setSubmitLoadingState(false);
  }

  if (!auth.login) {
    return (
        <NeedLogin/>
    );
  }

  return (
      <>
        <div className="flex flex-col items-center justify-center gap-4 text-3xl font-bold primary text-center py-10">
          <p>새 문의</p>
          <Textarea
              className="w-3/4 placeholder-gray-300 rounded-md focus:outline-none focus:bg-white"
              label="제목"
              labelPlacement="outside"
              isRequired={true}
              maxRows={1}
              size="lg"
              placeholder="제목을 작성하세요"
              isInvalid={error && !title}
              onValueChange={setTitle}
          />
          <Textarea
              className="w-3/4 placeholder-gray-300 rounded-md focus:outline-none focus:bg-white"
              label="내용"
              labelPlacement="outside"
              placeholder="내용을 작성하세요"
              minRows={10}
              maxRows={10}
              isRequired={true}
              size="lg"
              isInvalid={error && !content}
              onValueChange={setContent}
          />
          <div className="flex gap-10">
            <Button color="secondary" isLoading={submitLoadingState} onClick={handleSubmit}>작성</Button>
            <Link href="/notice">
              <Button color="secondary" isLoading={submitLoadingState}>취소</Button>
            </Link>
          </div>
        </div>
      </>
  );

}