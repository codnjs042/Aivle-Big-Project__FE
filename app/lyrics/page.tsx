"use client"

import React, {useState, useRef, useEffect} from "react";
import dynamic from 'next/dynamic';
import {Card, CardBody, CardHeader, CardFooter, Divider, Link, Image, Button, Slider} from "@nextui-org/react";
import {Logo, HeartIcon, PauseCircleIcon, NextIcon, PreviousIcon} from "@/components/icons";
import { useRouter, useSearchParams } from "next/navigation";
import {Artist, artistList} from "@/types/artist";
import lyricsList from '../artist/lyrics';
import cn from 'classnames';

export default function PracticePage() {
  const router = useRouter();
  const queryParams = useSearchParams();
  const artist = queryParams.get('artist');
  const lyrics = lyricsList.find(item => item.title === artist);
  const [liked, setLiked] = React.useState(false);
  const DynamicReactPlayer = dynamic(() => import('react-player'), { ssr: false });
  const [selectedArtist, setSelectedArtist] = useState<string>('');
  const [selectedPart, setSelectedPart] = useState(1);

  // 음성녹음용 오디오
  const [voice, setVoice] = useState<string | null>(null);
  const [voiceUrl, setVoiceUrl] = useState<string | null>(null);
  // 녹음 상태 및 녹음된 Blob을 저장할 상태
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  // 미디어 스트림 및 녹음기 참조
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  
  const [AnalysisVisible, setAnalysisVisible] = useState(false);

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
      mediaStreamRef.current?.getTracks().forEach((track: MediaStreamTrack) => track.stop());
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

    // 발음 분석 버튼 클릭 시 호출
  const handleAnalysis = () => {
      // 발음 분석 Card가 보이도록 상태 업데이트
      setAnalysisVisible(true);
  };

  const goToArtistPage = () => {
    router.push('/artist');
  };

  useEffect(() => {
    const artistEntry = artistList.find(entry => entry.name === artist);
    if (artistEntry) {
      setSelectedArtist(artistEntry.name);
    } else {
      setSelectedArtist('');
    }
  }, [artist]);


  switch(selectedPart){
    case 1:
      return (
        <div>
          <div className="mt-5 flex justify-center">
            <Button
              variant="light"
              color='default'
              onPress={goToArtistPage}
              disabled
            >
              홈
            </Button>
            <Button
              variant="light"
              color='secondary'
              onPress={() => setSelectedPart(1)}
              disabled
            >
              파트 1
            </Button>
            <Button
              variant="light"
              color='default'
              onPress={() => setSelectedPart(2)}
              className="ml-3"
            >
              파트 2
            </Button>
            <Button
              variant="light"
              color='default'
              onPress={() => setSelectedPart(3)}
              className="ml-3"
            >
              파트 3
            </Button>
          </div>
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[1000px]"
          shadow="sm"
        >
          <CardBody style={{paddingTop:'50px', paddingBottom:'50px', paddingLeft:'50px', paddingRight:'50px'}}>
              <div className="grid grid-cols-6 md:grid-cols-3 gap-6 md:gap-20 items-center justify-center">
                <div className="flex flex-col col-span-6 md:col-span-8">
                  {/* 사진, 문장, 하트 */}
                  <div className="flex justify-between items-center">
                    <div className="relative col-span-6 md:col-span-4 mr-10 ">
                    {lyrics?.part1 ? lyrics.part1[3] : undefined}
                    </div>
                    {/* 단어 문장 */}
                    <div className="flex flex-col gap-2">
                      <h1 className="font-large text-foreground/80 mt-5">{lyrics?.part1 ? lyrics.part1[1] : undefined}</h1>
                      <h1 className="text-large text-foreground/90 mt-5">{lyrics?.part1 ? lyrics.part1[2] : undefined}</h1>
                      <h1 className="text-large font-medium mt-5">{lyrics?.part1 ? lyrics.part1[0] : undefined}</h1>
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
      case 2:
        return (
          <div>
            <div className="mt-5 flex justify-center">
              <Button
                variant="light"
                color='default'
                onPress={goToArtistPage}
                disabled
              >
                홈
              </Button>
              <Button
                variant="light"
                color='default'
                onPress={() => setSelectedPart(1)}
              >
                파트 1
              </Button>
              <Button
                variant="light"
                color='secondary'
                onPress={() => setSelectedPart(2)}
                className="ml-3"
                disabled
              >
                파트 2
              </Button>
              <Button
                variant="light"
                color='default'
                onPress={() => setSelectedPart(3)}
                className="ml-3"
              >
                파트 3
              </Button>
            </div>
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[1000px]"
            shadow="sm"
          >
            <CardBody style={{paddingTop:'50px', paddingBottom:'50px', paddingLeft:'50px', paddingRight:'50px'}}>
                <div className="grid grid-cols-6 md:grid-cols-3 gap-6 md:gap-20 items-center justify-center">
                  <div className="flex flex-col col-span-6 md:col-span-8">
                    {/* 사진, 문장, 하트 */}
                    <div className="flex justify-between items-center">
                      <div className="relative col-span-6 md:col-span-4 mr-10 ">
                      {lyrics?.part2 ? lyrics.part2[3] : undefined}
                      </div>
                      {/* 단어 문장 */}
                      <div className="flex flex-col gap-2">
                        <h1 className="font-large text-foreground/80 mt-5">{lyrics?.part2 ? lyrics.part2[1] : undefined}</h1>
                        <h1 className="text-large text-foreground/90 mt-5">{lyrics?.part2 ? lyrics.part2[2] : undefined}</h1>
                        <h1 className="text-large font-medium mt-5">{lyrics?.part2 ? lyrics.part2[0] : undefined}</h1>
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
        case 3:
        return (
          <div>
            <div className="mt-5 flex justify-center">
              <Button
                variant="light"
                color='default'
                onPress={goToArtistPage}
                disabled
              >
                홈
              </Button>
              <Button
                variant="light"
                color='default'
                onPress={() => setSelectedPart(1)}
              >
                파트 1
              </Button>
              <Button
                variant="light"
                color='default'
                onPress={() => setSelectedPart(2)}
                className="ml-3"
              >
                파트 2
              </Button>
              <Button
                variant="light"
                color='secondary'
                onPress={() => setSelectedPart(3)}
                className="ml-3"
                disabled
              >
                파트 3
              </Button>
            </div>
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[1000px]"
            shadow="sm"
          >
            <CardBody style={{paddingTop:'50px', paddingBottom:'50px', paddingLeft:'50px', paddingRight:'50px'}}>
                <div className="grid grid-cols-6 md:grid-cols-3 gap-6 md:gap-20 items-center justify-center">
                  <div className="flex flex-col col-span-6 md:col-span-8">
                    {/* 사진, 문장, 하트 */}
                    <div className="flex justify-between items-center">
                      <div className="relative col-span-6 md:col-span-4 mr-10 ">
                      {lyrics?.part3 ? lyrics.part3[3] : undefined}
                      </div>
                      {/* 단어 문장 */}
                      <div className="flex flex-col gap-2">
                        <h1 className="font-large text-foreground/80 mt-5">{lyrics?.part3 ? lyrics.part3[1] : undefined}</h1>
                        <h1 className="text-large text-foreground/90 mt-5">{lyrics?.part3 ? lyrics.part3[2] : undefined}</h1>
                        <h1 className="text-large font-medium mt-5">{lyrics?.part3 ? lyrics.part3[0] : undefined}</h1>
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

}
