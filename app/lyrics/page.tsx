"use client"

import React, { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import {Card, CardBody, Image, Button, Slider} from "@nextui-org/react";
import {HeartIcon, PauseCircleIcon, NextIcon, PreviousIcon} from "@/components/icons";
import { useRouter, useSearchParams } from "next/navigation";
import {Artist, artistList} from "@/types/artist";

export default function PracticePage() {
  const router = useRouter();
  const queryParams = useSearchParams();
  const artist = queryParams.get('artist');
  const [liked, setLiked] = React.useState(false);
  const DynamicReactPlayer = dynamic(() => import('react-player'), { ssr: false });
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

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

  useEffect(() => {

    if (artist !== null && artistList.includes(artist as Artist)) {
      setSelectedArtist(artist as Artist);
    } else {
      setSelectedArtist(null);
    }
  }, [artist]);

  const artistInfo = {
    "NEWJEANS": {
      text1: "My past days are a dream I forget when I open my eyes Hype boy I only want you",
      text2: "nae jinannaldeureun nun tteumyeon ijneun kkum Hype boy neoman wonhae",
      text3: "내 지난날들은 눈 뜨면 잊는 꿈 Hype boy 너만 원해",
      image: "asset/images/idol1.png",
    },
    "BTS": {
      text1: "My blood, sweat, tears, my last dance",
      text2: "nae pi ttam nunmul nae majimak chumeul",
      text3: "내 피 땀 눈물 내 마지막 춤을",
      image: "asset/images/idol2.png",
    },
    "NCT DREAM": {
      text1: "I just said I love you",
      text2: "danji neol saranghae ireohge malhaessji",
      text3: "단지 널 사랑해 이렇게 말했지",
      image: "asset/images/idol3.png",
    },
    "BLACKPINK": {
      text1: "Baby, hug me like I'm going to explode Stop thinking about it What's so difficult",
      text2: "baby, nal teojil geoscheoreom anajwo geuman saenggakhae mwoga geuri eoryeowo ",
      text3: "Baby, 날 터질 것처럼 안아줘 그만 생각해 뭐가 그리 어려워",
      image: "asset/images/idol4.png",
    },
    "AESPA": {
      text1: "I can't handle the hopelessness, I can't break my faith",
      text2: "gamdanghal su eopsneun jeolmangdo nae mideumeul kkaeji moshae",
      text3: "감당할 수 없는 절망도 내 믿음을 깨지 못해",
      image: "asset/images/idol5.png",
    },
    "IVE": {
      text1: "My beautiful black eyes fall deeper, hold your breath, love give",
      text2: "areumdaun kkaman nunbit deo ppajyeo gipi sum chamgo love dive ",
      text3: "아름다운 까만 눈빛 더 빠져 깊이 숨 참고 love dive",
      image: "asset/images/idol6.png",
    },
    "NCT 127": {
      text1: "I poke forward, left and right, new thang Wherever we go, festival",
      text2: "nan apeuro jjilleo jwau, new thang uriga eodil gadeun chukje",
      text3: "난 앞으로 찔러 좌우, new thang 우리가 어딜 가든 축제",
      image: "asset/images/idol7.png",
    },
    "SEVENTEEN": {
      text1: "jamkkan sonyeoya jeoldae neon dareun saramege nokjima naega jiltu najanha ",
      text2: "nae pi ttam nunmul nae majimak chumeul",
      text3: "잠깐 소녀야 절대 넌 다른 사람에게 녹지마 내가 질투 나잖아",
      image: "asset/images/idol8.png",

    },
  };

  return (
    <div>
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
                <Image
                  alt="Album cover"
                  className="object-cover"
                  height={200}
                  shadow="md"
                  src={selectedArtist ? artistInfo[selectedArtist]?.image || undefined : undefined}
                  width="250"
                />
                </div>
                {/* 단어 문장 */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-large text-foreground/80 mt-5">{selectedArtist && artistInfo[selectedArtist]?.text1}</h1>
                  <h1 className="font-large text-foreground/90 mt-5">{selectedArtist && artistInfo[selectedArtist]?.text2}</h1>
                  <h1 className="text-large font-medium mt-5">{selectedArtist && artistInfo[selectedArtist]?.text3}</h1>
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
