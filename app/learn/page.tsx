"use client"

import React, { useState, useRef } from 'react';
import { textToSpeech } from '@/api/textToSpeech'
import {Input, Card, CardBody, CardHeader, CardFooter, Divider, Link, Image, Button, Slider, Pagination, PaginationItemType, usePagination} from "@nextui-org/react";
import {Logo, HeartIcon, PauseCircleIcon, NextIcon, PreviousIcon, RepeatOneIcon, ShuffleIcon, ChevronIcon, SearchIcon, } from "@/components/icons";
import {ChevronCircleTopLinearIcon, VolumeLowBoldIcon, VolumeHighBoldIcon, HeadphonesIcon} from "@nextui-org/shared-icons";
import cn from 'classnames';
import axios from 'axios';
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder';
import { SentenceInfo } from './sentence';

export default function LearnPage() {
  const [liked, setLiked] = useState(false);
  const [currentPageVoice, setCurrentPageVoice] = useState('안녕하세요');
  // 음성듣기용 오디오
  const [audio, setAudio] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState(null);
  // 음성녹음용 오디오
  const [voice, setVoice] = useState<string | null>(null);
  const [voiceUrl, setVoiceUrl] = useState(null);
  const sizes = ['sm']; 
  // 녹음 상태 및 녹음된 Blob을 저장할 상태
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  // 미디어 스트림 및 녹음기 참조
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const [AnalysisVisible, setAnalysisVisible] = useState(false);


  //단어 음성 듣기
  const handleTextToSpeech = async () => {
    const audioUrl = await textToSpeech(SentenceInfo[activePage].text3);
    setAudio(audioUrl);
    const audioElement = new Audio(audioUrl);
    audioElement.play();
  };



  const { activePage, range, setPage, onNext, onPrevious,} = usePagination({
    total: 12,
    showControls: true,
    siblings: 5,
    boundaries: 5,
  });

  // 발음 분석 버튼 클릭 시 호출
  const handleAnalysis = () => {
    // 발음 분석 Card가 보이도록 상태 업데이트
    setAnalysisVisible(true);
  };
  
  // 페이지 변경 시 텍스트 업데이트
  const handlePageChange = (page) => {
    setPage(page);
    updatePageText(page);
  };

  // 페이지에 따라 문장리스트 호출
  const updatePageText = (page) => {  };

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
        setVoiceUrl(url);
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
  // 음성 녹음 듣기 함수
  const playRecording = () => {
    if (voiceUrl) {
      setVoice(voiceUrl);
      const voice = new Audio(voiceUrl);
      // voice.play();
    }
  };

  return (
    <div>
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
                    src={SentenceInfo[activePage].image}
                    width="250"
                  />
                </div>
                {/* 단어 문장 */}
                <div className="flex flex-col gap-2">
                <Button
                  isIconOnly color="secondary" variant="faded" aria-label="headphone"
                  onPress={handleTextToSpeech}
                  className="data-[hover]:bg-foreground/10 listen-button items-center"
                  radius="full"
                  // variant="light"
                  >
                  <HeadphonesIcon className="text-2xl"/>
                </Button>
                  <h1 className="font-large text-purple-400 text-foreground/80 mt-5">{SentenceInfo[activePage].text1}</h1>
                  <h1 className="text-large text-foreground/90 mt-5">{SentenceInfo[activePage].text2}</h1>
                  <h1 className="text-large font-medium mt-5">{SentenceInfo[activePage].text3}</h1>
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
     <div className="flex flex-col">
        <div className="text-3xl font-bold primary text-center py-5">
            <Button
              isIconOnly
              className="w-20 item-center ml-5"
              color="secondary" 
              variant="ghost"
              onPress={recording ? stopRecording : startRecording}
              >
              {recording ? "녹음정지" : "녹음시작"}
            </Button>
            <Button
              isIconOnly
              className="w-20 item-center ml-5"
              color="secondary" 
              variant="ghost"
              onPress={playRecording}
              >
              음성듣기
            </Button>
            {voice && <audio controls src={voice} />}
            <Button 
                onClick={handleAnalysis}
                className="w-20 item-center ml-5"
                color="secondary" 
                variant="ghost">발음 분석
          </Button> 
        </div>
      </div>
      </Card>
      <Card
        isBlurred
        className={cn("border-none bg-background/60 dark:bg-default-100/50 max-w-[1000px] mt-10", {
          hidden: !AnalysisVisible, // 숨겨진 상태
        })}
        shadow="sm"
      >
        <CardHeader className="flex gap-3">
          <Logo />
          <div className="flex flex-col">
            <p className="text-md font-bold">AI 레포트</p>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody>
          <p>원래 발음 : 안녕하세요</p>
        </CardBody>
        <CardBody>
          <p>나의 발음 : 안녕하세요</p>
        </CardBody>
        <Divider/>
        <CardFooter>
          <Link
            color="secondary"
            showAnchorIcon
            href="/mypage"
          >
            더 자세한 AI 레포트 
          </Link>
        </CardFooter>
      </Card>
      </div>
  );
}