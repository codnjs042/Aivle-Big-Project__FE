"use client"


import React, { useContext, useState } from 'react';
import AuthContext from "@/context/AuthContext";
import { textToSpeech } from '@/api/textToSpeech'
import {
  Button,
  Card,
  CardBody,
  Image,
  Input,
  PaginationItemType,
  usePagination,
} from "@nextui-org/react";
import { ChevronIcon, HeartIcon, SearchIcon, } from "@/components/icons";
import { HeadphonesIcon } from "@nextui-org/shared-icons";
import cn from 'classnames';
import { SentenceInfo } from '../../public/data/sentence';
import Player from "@/components/layouts/player";

export default function LearnPage() {
  const auth = useContext(AuthContext);
  const [liked, setLiked] = useState(false);

  // 음성듣기용 오디오
  const [audio, setAudio] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  /* const handleTextToSpeech = async () => {
    const audioUrl = await textToSpeech(SentenceInfo[activePage - 1].text3);
    setAudio(audioUrl);
    if (audioUrl !== null) {
      const audioElement = new Audio(audioUrl);
      audioElement.play();
    } else {
      console.error('Audio URL is null');
    }
  }; */

  const handleTextToSpeech = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(SentenceInfo[activePage - 1].text3);
    synth.speak(utterance);
  }

  const { activePage, range, setPage, onNext, onPrevious } = usePagination({
    total: SentenceInfo.length,
    showControls: true,
    siblings: 5,
    boundaries: 5,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const firstMatchingPage = SentenceInfo.findIndex((sentence) =>
      Object.values(sentence).some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false; // 문자열이 아닌 경우 false 반환
      })
    );
  
    if (firstMatchingPage !== -1) {
      setPage(firstMatchingPage + 1);
    }
  };
  

  return (
    <div>
      <div className="flex items-center gap-2">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10 mb-3",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <Button
          variant="faded"
          className="mb-3"
          onPress={handleSearch}>
          검색
        </Button>
      </div>
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[1000px]"
        shadow="sm"
      >
        {/* 오늘의 단어 */}
        <CardBody style={{
          paddingTop: '50px',
          paddingBottom: '50px',
          paddingLeft: '50px',
          paddingRight: '50px'
        }}>
          <div
            className="grid grid-cols-6 md:grid-cols-3 gap-6 md:gap-20 items-center justify-center">
            {/* 페이지네이션까지 포함 */}
            <div className="flex flex-col col-span-6 md:col-span-8">
              {/* 사진, 문장, 하트 */}
              <div className="flex justify-between items-center">
                <div className="relative col-span-6 md:col-span-4 mr-10">
                  <Image
                    alt="Album cover"
                    className="object-cover"
                    height={200}
                    shadow="md"
                    src={SentenceInfo[activePage - 1].image}
                    width="200"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    isIconOnly color="secondary" variant="faded" aria-label="headphone"
                    onPress={handleTextToSpeech}
                    className="data-[hover]:bg-foreground/10 listen-button items-center"
                    radius="full"
                  >
                    <HeadphonesIcon className="text-2xl" />
                  </Button>
                  <h1 className="font-large text-purple-400 text-foreground/80 mt-5">{SentenceInfo[activePage - 1].text1}</h1>
                  <h1 className="text-large text-foreground/90 mt-5">{SentenceInfo[activePage - 1].text2}</h1>
                  <h1 className="text-large font-medium mt-5">{SentenceInfo[activePage - 1].text3}</h1>
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
                        >
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <Player answer={SentenceInfo[activePage - 1].text3} id={SentenceInfo[activePage - 1].id}/>
    </div>
  );
}
