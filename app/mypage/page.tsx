"use client";

import React, {useContext} from "react";
import {Chip, CircularProgress, Accordion, AccordionItem, Select, Selection, SelectItem, Input, Card, CardBody, CardHeader, CardFooter, Divider, Link, Image, Button, Slider, Pagination, PaginationItemType, usePagination} from "@nextui-org/react";
import {useRouter} from 'next/navigation';
import AuthContext from "@/context/AuthContext";
import {artistList, getArtistsFromValue} from "@/types/artist";
import {genreList, getGenresFromValue} from "@/types/genre";

export default function MyPage() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  return (
      <div className="flex flex-col gap-10">
        <div className="text-3xl font-bold primary text-center py-5">
          <p>마이 리포트</p>
        </div>
        <div className="flex flex-row gap-10">
          <Card className="p-5">
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
          <div className="flex flex-wrap gap-y-5">
            <Input
                isReadOnly
                type="email"
                label="Email"
                variant="bordered"
                value={auth.user?.email}
                className="max-w-xs"
            />
            <Input
                isReadOnly
                type="string"
                label="Nickname"
                variant="bordered"
                value={auth.user?.nickname}
                className="max-w-xs"
            />
            <div
                className="flex w-full">
              <Select
                  label="좋아하는 장르"
                  variant="bordered"
                  placeholder="무응답"
                  selectedKeys={
                    getGenresFromValue(auth.user?.selectedGenres ?? 0).map(({name}) => name)
                  }
                  isDisabled
              >
                {genreList.map((item) => (
                    <SelectItem key={item.name} value={item.value}>
                      {item.name}
                    </SelectItem>
                ))}
              </Select>
            </div>
            <div
                className="flex w-full">
              <Select
                  label="좋아하는 가수"
                  variant="bordered"
                  placeholder="무응답"
                  selectedKeys={
                    getArtistsFromValue(auth.user?.selectedArtist ?? 0).map(({name}) => name)
                  }
                  isDisabled
              >
                {artistList.map((item) => (
                    <SelectItem key={item.name} value={item.value}>
                      {item.name}
                    </SelectItem>
                ))}
              </Select>
            </div>
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
                  value={20}
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
                  value={72}
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
              죄송합니다
            </AccordionItem>
          </Accordion>

        </div>
      </div>
  );
}



