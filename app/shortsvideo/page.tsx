"use client";

import React from "react";
import ReactPlayer from 'react-player';
import {Card, CardBody, Image, Button, Slider} from "@nextui-org/react";
import {HeartIcon, PauseCircleIcon, NextIcon, PreviousIcon} from "@/components/icons";
import { useRouter, useSearchParams } from "next/navigation";
import NextLink from "next/link";
import Link from "@nextui-org/react";

export default function ShortsvideoPage() {

  return (
    <div>
      <div>
        <p className="font-bold text-3xl">쇼츠게시판</p>
        </div>
        <div className="text-3xl font-bold primary text-end py-5">
        <button>
            
            <Button
              isIconOnly
              className="w-20 item-center mt-3"
              color="secondary" 
              variant="ghost"
              >
              업로드
            </Button>
            
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
          </button>
        </div>
    </div>
  );
}