"use client";

import React, {useContext} from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Image,
  Input,
  Accordion,
  AccordionItem,
  
} from "@nextui-org/react";
import {useRouter} from 'next/navigation';
import AuthContext from "@/context/AuthContext";

export default function MyPage() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  return (
      <div className="flex flex-col gap-20">
        <div className="flex flex-row gap-2">
          <Card className="p-10">
            <CardHeader className="pb-0 pt-0 justify-center">
              <p className="font-bold text-2xl text-center">{auth.user?.nickname} 님</p>
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
          <div className="flex flex-col gap-2">
            <Input
                isReadOnly
                type="string"
                label="Nickname"
                variant="bordered"
                value={auth.user?.nickname}
                className="max-w-xs"
            />
            <Input
                isReadOnly
                type="email"
                label="Email"
                variant="bordered"
                value={auth.user?.email}
                className="max-w-xs"
            />


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
        <div className="flex flex-row gap-10">
          <Card
              className="w-[200px] h-[200px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <CardBody className="justify-center items-center pb-0 ">
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
          <Card
              className="w-[200px] h-[200px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
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
          <Card
              className="w-[200px] h-[200px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
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
                이해 가능도
              </Chip>
            </CardFooter>
          </Card>
        </div>
        <div className="flex flex-col gap-2">
        <Accordion selectionMode="multiple">
          <AccordionItem key="1" aria-label="즐겨찾는 문장" title="즐겨찾는 문장">
            안녕하세요
          </AccordionItem>
          <AccordionItem key="2" aria-label="자주 틀리는 문장" title="자주 틀리는 문장">
            안,감,최
          </AccordionItem>
        </Accordion>

        </div>
      </div>
  );

}



