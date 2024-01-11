"use client"

import React, {useContext, useRef, useState} from "react";
import AuthContext from "@/context/AuthContext";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Link,
  Spacer
} from "@nextui-org/react";
import {audioPost} from "@/api/study/post";
import {Logo} from "@/components/icons";

export default function Player(props: { answer: string; }) {
  const auth = useContext(AuthContext);

  const [voiceUrl, setVoiceUrl] = useState<string | null>(null);

  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [AnalysisVisible, setAnalysisVisible] = useState(false);

  const chunksRef = useRef<BlobPart[]>([]);
  const handleAnalysis = async () => {
    if (auth.login && !recording) {
      if (recordedBlob) {
        const file = new File([recordedBlob], "h4.wav", {type: 'audio/wav'});
        const response = await audioPost(auth.access, auth.setAccess, file, 4);
        setAnalysisVisible(true);
      } else {
        alert("음성 녹음을 먼저 완료해주세요.");
      }
    } else {
      alert("로그인이 필요한 서비스 입니다.");
    }
  };

  const handleStartRecord = async () => {
    try {
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({audio: true});
      mediaRecorderRef.current = new MediaRecorder(mediaStreamRef.current, {mimeType: 'audio/webm'});

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size) chunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstart = () => {
        setRecording(true);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, {type: 'audio/wav'});
        const url = URL.createObjectURL(blob);
        chunksRef.current = [];
        setRecordedBlob(blob);
        setVoiceUrl(url);
        setRecording(false);
      };

      mediaRecorderRef.current.start();

    } catch (error) {
      console.error(error);
    }
  };

  const handleStopRecord = async () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      mediaStreamRef.current!.getTracks().forEach((track) => track.stop());
    }
  };

  return (
      <div>
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[1000px] mt-10"
            shadow="sm"
        >
          <div className="flex flex-w justify-center items-center gap-10 h-20">
            <Button
                isIconOnly
                className="w-20 py-5"
                color={recording ? "danger" : "secondary"}
                variant={recording ? "shadow" : "solid"}
                onClick={recording ? handleStopRecord : handleStartRecord}
            >
              {recording ? "녹음정지" : "녹음시작"}
            </Button>
            {(voiceUrl && !recording) ? <audio className="w-80" controls src={voiceUrl}/> :
                <div className="w-80 text-2xl text-secondary-800"> {recording? "천천히 발음해보세요." : ""} </div>}
            <Button
                onClick={handleAnalysis}
                className="w-20 py-5"
                color="success"
                variant={(!recording && recordedBlob) ? "solid" : "bordered"}
                disabled={!(!recording && recordedBlob)}
            >
              발음 분석
            </Button>
          </div>
        </Card>
        <Card
            isBlurred
            className={`border-none bg-background/60 dark:bg-default-100/50 max-w-[1000px] mt-10 ${!AnalysisVisible ? 'hidden' : ''}`}
            shadow="sm"
        >
          <CardHeader className="flex gap-3">
            <Logo/>
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
                    value={0}
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
                    value={75.8}
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
                    value={79.6}
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
          <p>원래 발음: 저는 영국에서 왔어요</p>
          </CardBody>
          <CardBody>
          <p>나의 발음: 저는 영<span style={{ color: 'red' }}>구게</span>서 <span style={{ color: 'red' }}>와써</span>요</p>
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