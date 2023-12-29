"use client";

import React, {useContext, useEffect, useMemo, useState} from "react";
import {CircularProgress, Card, CardBody, CardFooter, Chip} from "@nextui-org/react";
import {useRouter} from 'next/navigation';
import AuthContext from "@/context/AuthContext";
export default function MyPage() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  return (
    <div className="max-w-[1000px] mx-auto grid gap-20 grid-cols-12 grid-rows-8">
      <div className="col-span-4">
        <Card className="w-[240px] h-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
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
      <div className="col-span-4">
        <Card className="w-[240px] h-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
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
      <div className="col-span-4">
        <Card className="w-[240px] h-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
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
  );

}



