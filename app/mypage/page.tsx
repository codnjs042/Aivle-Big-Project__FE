"use client";

import React, {useContext, useEffect, useMemo, useState} from "react";
import {CircularProgress, Card, CardBody, CardHeader, CardFooter, Chip, Image} from "@nextui-org/react";
import {useRouter} from 'next/navigation';
import AuthContext from "@/context/AuthContext";
export default function MyPage() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  return (
    <div className="flex flex-col md:flex-col justify-between gap-3">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="inline-block max-w-lg text-center justify-start">
          <Card className="py-4">
            <CardHeader className="pb-0 pt-0 px-2 flex-col items-center">
              <p className="text-tiny uppercase">안녕하세요</p>
              <h4 className="font-bold text-large">{auth.user?.nickname} 님</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2 items-center">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="asset/images/mypage.jpeg"
                width={270}
              />
            </CardBody>
          </Card>
        </div>
        <div className="flex flex-col mt-20 md:flex-col gap-3">
          <Chip
            variant="shadow"
            classNames={{
              base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
              content: "drop-shadow shadow-black text-white",
            }}
          >
            {auth.user?.selectedGenres} {/* 장르로 수정 */}
          </Chip>
          <Chip
            variant="shadow"
            classNames={{
              base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
              content: "drop-shadow shadow-black text-white",
            }}
          >
            {auth.user?.selectedArtist} {/* 아티스트로 수정 */}
          </Chip>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="inline-block max-w-lg text-center justify-start">
          <Card className="w-[200px] h-[200px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <CardBody className="justify-center items-center pb-0">
              <CircularProgress
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  indicator: "stroke-white",
                  track: "stroke-white/10",
                  value: "text-3xl font-semibold text-white",
                }}
                value={68}
                strokeWidth={4}
                showValueLabel={true}
              />
            </CardBody>
            <CardFooter className="justify-center items-center pt-0">
              <Chip
                classNames={{
                  base: "border-1 border-white/30",
                  content: "text-white/90 text-small font-semibold",
                }}
                variant="bordered"
              >
                발음 유창성
              </Chip>
            </CardFooter>
          </Card>
        </div>
        <div className="inline-block max-w-lg text-center justify-start">
          <Card className="w-[200px] h-[200px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <CardBody className="justify-center items-center pb-0">
              <CircularProgress
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  indicator: "stroke-white",
                  track: "stroke-white/10",
                  value: "text-3xl font-semibold text-white",
                }}
                value={88}
                strokeWidth={4}
                showValueLabel={true}
              />
            </CardBody>
            <CardFooter className="justify-center items-center pt-0">
              <Chip
                classNames={{
                  base: "border-1 border-white/30",
                  content: "text-white/90 text-small font-semibold",
                }}
                variant="bordered"
              >
                발음 숙련도
              </Chip>
            </CardFooter>
          </Card>
        </div>
        <div className="md:order-4 inline-block max-w-lg text-center justify-start">
          <Card className="w-[200px] h-[200px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <CardBody className="justify-center items-center pb-0">
              <CircularProgress
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  indicator: "stroke-white",
                  track: "stroke-white/10",
                  value: "text-3xl font-semibold text-white",
                }}
                value={70}
                strokeWidth={4}
                showValueLabel={true}
              />
            </CardBody>
            <CardFooter className="justify-center items-center pt-0">
              <Chip
                classNames={{
                  base: "border-1 border-white/30",
                  content: "text-white/90 text-small font-semibold",
                }}
                variant="bordered"
              >
                이해 가능도
              </Chip>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );

}



