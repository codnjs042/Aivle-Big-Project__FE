"use client";

import React, { useRef } from "react";
import { Button } from "@nextui-org/react";
import NextLink from "next/link";

export default function ShortsvideoPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleUploadClick = () => {
    // 파일 업로드 input 엘리먼트 클릭
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event:any) => {
    // 선택한 파일 정보 확인
    const selectedFile = event.target.files[0];
    console.log("Selected File:", selectedFile);

    // 여기서 서버로 파일을 업로드하는 로직을 추가해야 합니다.
    // fetch 또는 axios를 사용하여 서버로 파일 전송
  };

  return (
    <div>
      <div>
        <p className="font-bold text-3xl">쇼츠게시판</p>
      </div>
      <div className="text-3xl font-bold primary text-end py-5">
        <Button
          isIconOnly
          className="w-20 item-center mt-3"
          color="secondary"
          variant="ghost"
          onClick={handleUploadClick}
        >
          업로드
        </Button>
        {/* 숨겨진 파일 업로드 input 엘리먼트 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
            
            <Button
              isIconOnly
              className="w-20 item-center mt-3 ml-3"
              color="secondary" 
              variant="ghost"
              >
              삭제
            </Button>
            <NextLink href="/shorts">
            <Button
              
              className="w-30 item-center mt-3 ml-3"
              color="secondary" 
              variant="ghost"
              >
              쇼츠 제작
            </Button>
            </NextLink>
        </div>
    </div>
  );
}