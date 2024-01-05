"use client";

import React, { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import NextLink from "next/link";
import ReactPlayer from "react-player";

export default function ShortsvideoPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [videos, setVideos] = useState<Array<{ id: number; url: string }>>([]);
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    event.preventDefault(); // 기본 동작 방지
  
    const selectedFile = event.target.files[0];
    const videoId = Date.now();
    const videoBlobUrl = URL.createObjectURL(selectedFile);
    setVideos((prevVideos) => [...prevVideos, { id: videoId, url: videoBlobUrl }]);
  };

  const handleDeleteClick = () => {
    const remainingVideos = videos.filter((video) => !selectedVideos.includes(video.id));
    setSelectedVideos([]);
    setVideos(remainingVideos);
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
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {videos.map((video) => (
          <div key={video.id} className="mb-3">
            <input
              type="checkbox"
              checked={selectedVideos.includes(video.id)}
              onChange={() => {
                if (selectedVideos.includes(video.id)) {
                  setSelectedVideos((prevSelected) => prevSelected.filter((id) => id !== video.id));
                } else {
                  setSelectedVideos((prevSelected) => [...prevSelected, video.id]);
                }
              }}
            />
            <ReactPlayer url={video.url} width="300px" height="200px" controls />
          </div>
        ))}
        <Button
          isIconOnly
          className="w-20 item-center mt-3 ml-3"
          color="secondary"
          variant="ghost"
          onClick={handleDeleteClick}
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