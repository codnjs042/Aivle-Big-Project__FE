"use client"

import React from "react";
import {Input, Card, CardBody, Image, Button, Slider, Pagination, PaginationItemType, usePagination} from "@nextui-org/react";
import {HeartIcon, PauseCircleIcon, NextIcon, PreviousIcon, RepeatOneIcon, ShuffleIcon, ChevronIcon, SearchIcon} from "@/components/icons";
import cn from 'classnames';

// 상단에 다음과 같이 useState를 추가합니다.
import { useState } from 'react';

export default function LearnPage() {
  const [liked, setLiked] = useState(false);
  const [currentPageText, setCurrentPageText] = useState('안녕하세요'); // 초기 텍스트 설정

  const sizes = ['sm'];

  const {
    activePage,
    range,
    setPage,
    onNext,
    onPrevious,
  } = usePagination({
    total: 6,
    showControls: true,
    siblings: 10,
    boundaries: 10,
  });

  // 페이지 변경 시 텍스트 업데이트
  const handlePageChange = (page) => {
    setPage(page);
    updatePageText(page);
  };

  // 페이지에 따라 텍스트 업데이트
  const updatePageText = (page) => {
    if (page === 1) {
      setCurrentPageText('');
    } else if (page === 2) {
      setCurrentPageText('');
    }
  };

  return (
    <div >
      <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[1000px]"
      shadow="sm"
    >
      {/* 오늘의 단어 */}
      <CardBody style={{paddingTop:'50px', paddingBottom:'50px', paddingLeft:'50px', paddingRight:'50px'}}>
        <div className="grid grid-cols-6 md:grid-cols-3 gap-6 md:gap-20 items-center justify-center">

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-center">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt="Album cover"
                  className="object-cover"
                  height={200}
                  shadow="md"
                  src="asset/images/shorts.png"
                  width="100%"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-small text-foreground/80 mt-5">Hello</h3>
				        <h1 className="font-semibold text-foreground/90 mt-5">Annyunghaseyo</h1>
                <h1 className="text-large font-medium mt-5">안녕하세요.</h1>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
            </div>
            {/* 페이지네이션 */}

            <div>
          <ul className="flex gap-2 mt-10 items-center justify-center">
            {range.map((page) => {
              if (page === PaginationItemType.NEXT) {
                return (
                  <li key={page} aria-label="next page" className="w-4 h-4">
                    <button
                      className="w-full h-full bg-default-200 rounded-full"
                      onClick={onNext}
                    >
                      <ChevronIcon className="rotate-180" />
                    </button>
                  </li>
                );
              }

              if (page === PaginationItemType.PREV) {
                return (
                  <li key={page} aria-label="previous page" className="w-4 h-4">
                    <button
                      className="w-full h-full bg-default-200 rounded-full"
                      onClick={onPrevious}
                    >
                      <ChevronIcon />
                    </button>
                  </li>
                );
              }

              if (page === PaginationItemType.DOTS) {
                return (
                  <li key={page} className="w-4 h-4">
                    ...
                  </li>
                );
              }

              return (
                <li
                  key={page}
                  aria-label={`page ${page}`}
                  className="w-4 h-4"
                >
                  <button
                    className={cn(
                      'w-full h-full bg-default-300 rounded-full',
                      activePage === page && 'bg-secondary'
                    )}
                    onClick={() => handlePageChange(page)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        
        
        </div>
        </div>

        
    </CardBody>
    </Card>
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[1000px] mt-10"
      shadow="sm"
    >
      {/* 오늘의 단어 */}
      <CardBody style={{paddingLeft:'100px', paddingRight:'100px'}}>
        <div className="grid grid-cols-6 md:grid-cols-3 gap-6 md:gap-20 items-center justify-center">

          <div className="flex flex-col col-span-6 md:col-span-8">
          <div className="flex flex-col mt-20 gap-1">
            <Slider
              aria-label="Record progress"
              classNames={{
                track: 'bg-default-500/30',
                thumb: 'w-2 h-2 after:w-2 after:h-2 after:bg-foreground',
              }}
              color="foreground"
              defaultValue={33}
              size="sm"
            />
            <div className="flex justify-between">
              <p className="text-small">0:04</p>
              <p className="text-small text-foreground/50">0:10</p>
            </div>
          </div>

          <div className="flex w-full items-center justify-center">
            <Button
              isIconOnly
              className="data-[hover]:bg-foreground/10"
              radius="full"
              variant="light"
              onPress={() => handlePageChange(activePage - 1)}
            >
              <PreviousIcon />
            </Button>
            <Button
              isIconOnly
              className="w-auto h-auto data-[hover]:bg-foreground/10"
              radius="full"
              variant="light"
            >
              <PauseCircleIcon size={54} />
            </Button>
            <Button
              isIconOnly
              className="data-[hover]:bg-foreground/10"
              radius="full"
              variant="light"
              onPress={() => handlePageChange(activePage + 1)}
            >
              <NextIcon />
            </Button>
          </div>
        
        {/* 슬라이더 */}

          
        </div>
        </div>

        
      </CardBody>
    </Card>
    </div>
  );
}


