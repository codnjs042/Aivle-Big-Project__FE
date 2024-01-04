"use client";

import React from "react";
import ReactPlayer from 'react-player';
import {Card, CardBody, Image, Button, Slider} from "@nextui-org/react";
import {HeartIcon, PauseCircleIcon, NextIcon, PreviousIcon} from "@/components/icons";
import { useRouter, useSearchParams } from "next/navigation";
import NextLink from "next/link";

export default function ShortsvideoPage() {

  return (
    <div>
      <div>
        <p>숏츠게시판</p>
      </div>
      <div>
        <NextLink href="/shorts">
          <Button color="secondary"> 개인 숏츠 제작하기</Button>
        </NextLink>
      </div>
    </div>
  );
}