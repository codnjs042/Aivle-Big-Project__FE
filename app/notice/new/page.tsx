"use client";

import React, {useContext, useEffect} from "react";
import AuthContext from "@/context/AuthContext";
import NeedLogin from "@/components/layouts/needLogin";
import {Button, Textarea} from "@nextui-org/react";
import Link from "next/link";

export default function NewPostPage() {
  const auth = useContext(AuthContext);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [error, setError] = React.useState(false);

  useEffect(() => {

  }, []);
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
              className="w-2/3 placeholder-gray-300 rounded-md focus:outline-none focus:bg-white"
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
              className="w-2/3 placeholder-gray-300 rounded-md focus:outline-none focus:bg-white"
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
            <Button color="secondary">작성</Button>
            <Link href="/notice">
              <Button color="secondary">취소</Button>
            </Link>
          </div>
        </div>
      </>
  );

}