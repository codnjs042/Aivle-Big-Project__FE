"use client"

import React, { useState, useRef } from 'react';
import { textToSpeech } from '@/api/textToSpeech'
import {Input, Card, CardBody, Image, Button, Slider, Pagination, PaginationItemType, usePagination} from "@nextui-org/react";
import {HeartIcon, PauseCircleIcon, NextIcon, PreviousIcon, RepeatOneIcon, ShuffleIcon, ChevronIcon, SearchIcon, } from "@/components/icons";
import cn from 'classnames';
import axios from 'axios';

export default function LearnPage() {
  const [audio, setAudio] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentPageVoice, setCurrentPageVoice] = useState('안녕하세요');
  const sizes = ['sm']; 

  // 녹음 상태 및 녹음된 Blob을 저장할 상태
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  // 미디어 스트림 및 녹음기 참조
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  //문장 리스트
  const SentenceInfo = {
    "1": {
      text1: "Hello",
      text2: "Annyunghaseyo",
      text3: "안녕하세요",
      image: "asset/images/idol1.png",
    },
    "2": {
      text1: "Thank you",
      text2: "gamsahapnida",
      text3: "감사합니다",
      image: "asset/images/idol2.png",
    },
    "3": {
      text1: "I'm sorry",
      text2: "joesonghapnida",
      text3: "죄송합니다",
      image: "asset/images/idol3.png",
    },
    "4": {
      text1: "Nice to meet you",
      text2: "bangapseupnida",
      text3: "반갑습니다",
      image: "asset/images/idol4.png",
    },
    "5": {
      text1: "Goodbye",
      text2: "annyeonghigyeseyo",
      text3: "안녕히계세요",
      image: "asset/images/idol5.png",
    },
    "6": {
      text1: "I'm hungry",
      text2: "baegopeupnida ",
      text3: "배고픕니다",
      image: "asset/images/idol6.png",
    },
  };

  const { activePage, range, setPage, onNext, onPrevious,} = usePagination({
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

  // 페이지에 따라 문장리스트 호출
  const updatePageText = (page) => {
    if (page === 1) {
    }
  };

  // 음성 녹음 시작 함수
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setRecordedBlob(blob);

        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      recorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  // 음성 녹음 종료 함수
  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      setRecording(false);
    }
  };
  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  //단어 음성 듣기
  const handleTextToSpeech = async () => {
    const audioUrl = await textToSpeech(currentPageVoice);
    setAudio(audioUrl);
  };


  return (
    <div>
      <Button
        onPress={handleTextToSpeech}
        className="data-[hover]:bg-foreground/10 listen-button"
        radius="full"
        variant="light"
      >
        음성 듣기
      </Button>
      {audio && <audio controls src={audio} />}
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
            {/* 페이지네이션까지 포함 */}
            <div className="flex flex-col col-span-6 md:col-span-8">
              {/* 사진, 문장, 하트 */}
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
                {/* 단어 문장 */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-large text-foreground/80 mt-5">Hello</h1>
                  <h1 className="font-large text-foreground/90 mt-5">Annyunghaseyo</h1>
                  <h1 className="text-large font-medium mt-5">안녕하세요</h1>
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
              <p>Active page: {activePage}</p>
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
      {/* 음성 녹음 */}
      <CardBody style={{paddingLeft:'100px', paddingRight:'100px'}}>
          <div className="flex flex-col col-span-6 md:col-span-8">
            <Button
                className="w-10 item-center"
                radius="full"
                variant="light"
                onPress={recording ? stopRecording : startRecording}
              >
            {recording ? "녹음정지" : "녹음시작"}
              </Button>
            <div className="flex flex-col mt-10 gap-1">
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
              {/* <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onPress={() => handlePageChange(activePage - 1)}
              >
                <PreviousIcon />
              </Button> */}
              <Button
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onPress={playRecording}
              >
                <PauseCircleIcon size={54}/>
              </Button>
              {/* <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onPress={() => handlePageChange(activePage + 1)}
              >
                <NextIcon />
              </Button> */}
            </div>        
          </div>
        </CardBody>
      </Card>
    </div>
  );
}


