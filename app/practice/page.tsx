"use client";

import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import {Card, CardBody, Image, Button, Slider} from "@nextui-org/react";
import {HeartIcon, PauseCircleIcon, NextIcon, PreviousIcon} from "@/components/icons";
import { useRouter, useSearchParams } from "next/navigation";
import contentsList from '../genre/contents';
import CulturePage from '../genre/page';

export default function PracticePage() {
  const router = useRouter();
  const queryParams = useSearchParams();
  const contentTitle = queryParams.get('content');
  const content = contentsList.find(item => item.title === contentTitle);
  const [liked, setLiked] = React.useState(false);
  
  // 음성녹음용 오디오
  const [voice, setVoice] = useState<string | null>(null);
  const [voiceUrl, setVoiceUrl] = useState(null);
  // 녹음 상태 및 녹음된 Blob을 저장할 상태
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  // 미디어 스트림 및 녹음기 참조
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

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

  if (!content) {
    return null;
  }
  return (
    <div>
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[1000px]"
      shadow="sm"
    >
      <CardBody style={{ marginLeft:'50px'}}>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-20 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
          <ReactPlayer
            url={content.video}
            width="100%"
            height="200px"
            controls={true}
            onError={(e) => console.error('Video error', e)}
          />
          </div> 
          <div className="flex flex-col col-span-6 md:col-span-7">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h1 className="text-large text-foreground/80 mt-5">{content.english}</h1>
				        <h1 className="font-large text-foreground/90 mt-5">{content.pronun}</h1>
                <h1 className="text-large font-medium mt-5">{content.contents}</h1>
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

            <div className="flex flex-col mt-20 gap-1">
              <Slider
                aria-label="Record progress"
                classNames={{
                  track: "bg-default-500/30",
                  thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
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
              >
                <NextIcon />
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
      <CardBody style={{paddingLeft:'100px', paddingRight:'100px'}}>
          <div className="flex flex-col col-span-6 md:col-span-8 item-center">
              <Button
                className="w-20 item-center mt-3"
                color="secondary"
                variant="ghost"
                onPress={recording ? stopRecording : startRecording}
              >
                {recording ? "녹음정지" : "녹음시작"}
              </Button>
              <Button
                isIconOnly
                className="w-20 item-center mt-3"
                color="secondary" 
                variant="ghost"
                onPress={playRecording}
              >
                음성듣기
              </Button>
              {voice && <audio controls src={voice} />}
              <Button 
                onClick={() => { }}
                className="w-20 item-center mt-3"
                color="secondary" 
                variant="ghost">발음 분석
              </Button>  
          </div>
        </CardBody>
      </Card>
    </div>
  );
}