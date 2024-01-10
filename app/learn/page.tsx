"use client"

import React, { useEffect, useContext, useState, useRef } from 'react';
import AuthContext from "@/context/AuthContext";
import { textToSpeech } from '@/api/textToSpeech'
import {Input, Card, CardBody, CardHeader, CardFooter, Divider, Link, Image, Button, Slider, Pagination, PaginationItemType, usePagination, Chip, CircularProgress, Accordion, AccordionItem, Select, Selection, SelectItem, } from "@nextui-org/react";
import {Logo, HeartIcon, PauseCircleIcon, NextIcon, PreviousIcon, RepeatOneIcon, ShuffleIcon, ChevronIcon, SearchIcon, } from "@/components/icons";
import {ChevronCircleTopLinearIcon, VolumeLowBoldIcon, VolumeHighBoldIcon, HeadphonesIcon} from "@nextui-org/shared-icons";
import cn from 'classnames';
import axios from 'axios';
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder';
import { SentenceInfo } from '../../public/data/sentence';
import {audioPost} from "@/api/study/post";


export default function LearnPage() {

  const auth = useContext(AuthContext);

  const [liked, setLiked] = useState(false);
  // 음성듣기용 오디오
  const [audio, setAudio] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  // 음성녹음용 오디오
  const [voice, setVoice] = useState<string | null>(null);
  const [voiceUrl, setVoiceUrl] = useState<string | null>(null);
  const sizes = ['sm'];
  // 녹음 상태 및 녹음된 Blob을 저장할 상태
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedFile, setRecordedFile] = useState<Blob | null>(null);
  // 미디어 스트림 및 녹음기 참조
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [AnalysisVisible, setAnalysisVisible] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [aiReportData, setAiReportData] = useState(null);

  //단어 음성 듣기
  const handleTextToSpeech = async () => {
    const audioUrl = await textToSpeech(SentenceInfo[activePage].text3);
    setAudio(audioUrl);
    if (audioUrl !== null) {
      const audioElement = new Audio(audioUrl);
      audioElement.play();
    } else {
      console.error('Audio URL is null');
      // 또는 다른 처리를 수행하거나 에러를 표시할 수 있습니다.
    }
  };

  const { activePage, range, setPage, onNext, onPrevious,} = usePagination({
    total: 12,
    showControls: true,
    siblings: 5,
    boundaries: 5,
  });

  // 발음 분석 버튼 클릭 시 호출
  const handleAnalysis = async () => {
    if (auth.login) {
      if (recording) {
        alert("녹음 중입니다.");
      } else if (recordedBlob) {
        stopRecordingAndSave();
      } else {
        alert("음성을 녹음해주세요.");
      }
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  // 페이지 변경 시 텍스트 업데이트
  const handlePageChange = (page: number) => {
    setPage(page);
    updatePageText(page);
  };

  // 페이지에 따라 문장리스트 호출
  const updatePageText = (page: number) => {  };

  // 음성 녹음 시작 함수
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      const chunks: BlobPart[] | undefined = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setRecordedBlob(blob);

        // const file = new File([blob], "filename.wav", { type: 'audio/wav' });
        // setRecordedFile(file);

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
      mediaStreamRef.current!.getTracks().forEach((track) => track.stop());
      setRecording(false);
    }
  };


  // 음성 녹음 종료 및 저장 함수
  const stopRecordingAndSave = async () => {
    stopRecording(); // 녹음 중지
    if (recordedBlob) {
      // 녹음된 Blob이 존재하면 WAV 파일로 저장
      const blob = new Blob([recordedBlob], { type: 'audio/wav' });

      const file = new File([blob], "recordfile.wav", { type: 'audio/wav' });
      setRecordedFile(file);

      try {
        // 서버에 POST 요청 보내기
        const response = await audioPost(auth.access, auth.setAccess, file, 1);
        console.log(response);
        setAnalysisVisible((prevVisible) => !prevVisible);
      } catch (error) {
        console.error('Error sending audio data to the server:', error);
        // 에러 처리
      }
    }
  };

  const downloadRecording = (url: string | null, filename: string) => {
    const anchor = document.createElement('a');
    if (url!=null)
      anchor.href = url;
    anchor.download = filename;
    anchor.click();
  };

  // 음성 녹음 듣기 함수
  const playRecording = () => {
    if (voiceUrl !== null) {
      setVoice(voiceUrl);
      const voice = new Audio(voiceUrl);
      voice.play();
    }
  };

  // LearnPage 컴포넌트 내에서 새로운 state 추가
const [searchQuery, setSearchQuery] = useState('');

// 검색어를 업데이트하는 핸들러
const handleSearchInputChange = (e:any) => {
  setSearchQuery(e.target.value);
};

// 검색 버튼을 눌렀을 때 처리하는 함수
const handleSearch = () => {
  // 페이지를 검색 결과 중 첫 번째 페이지로 설정
  const firstMatchingPage = SentenceInfo.findIndex((sentence) =>
    Object.values(sentence).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // 검색 결과에 해당하는 페이지가 있을 경우에만 페이지를 변경
  if (firstMatchingPage !== -1) {
    setPage(firstMatchingPage);
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
          //isIconOnly
          //variant="light"
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
              variant={recording ? undefined : "ghost"}
              onPress={recording ? stopRecordingAndSave : startRecording}
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

            <Button
              isIconOnly
              className="w-20 item-center ml-5"
              color="secondary"
              variant="ghost"
              onPress={() => downloadRecording(voiceUrl, 'recorded_audio.wav')}
            >
              다운로드
            </Button>
            <Button
                onClick={handleAnalysis}
                className="w-20 item-center ml-5"
                color="secondary"
                variant={AnalysisVisible ? undefined : "ghost"}>
                  발음 분석
          </Button>
          {voice && <div className="flex justify-center mt-5"><audio controls src={voice} /></div>}
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
        <div className="flex flex-row gap-10 mt-5 mb-5">
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
        <Divider/>
        <CardBody>
          <p>원래 발음 : {SentenceInfo[activePage].text3}</p>
        </CardBody>
        <CardBody>
          <p>나의 발음 : </p>
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