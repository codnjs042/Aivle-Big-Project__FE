"use client"

import React, {useContext, useRef, useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import useSWR from "swr";
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
  Spacer,
  Tooltip
} from "@nextui-org/react";
import {Logo} from "@/components/icons";
import AuthContext from "@/context/AuthContext";
import NeedLogin from "@/components/layouts/needLogin";
import {audioPost} from "@/api/study/post";
import {postFetch} from "@/api/study/result";

interface ResultType {
  sentence: string;
  PronunProfEval: number;
  FluencyEval: string;
  ComprehendEval: string;
}

export default function Player(props: { answer: string, id: number; }) {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const {answer, id} = props;

  const [voiceUrl, setVoiceUrl] = useState<string | null>(null);

  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [AnalysisVisible, setAnalysisVisible] = useState(false);

  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const [pf, setPf] = useState<number>(0);
  const [fl, setFl] = useState<number>(0);
  const [ch, setCh] = useState<number>(0);

  const chunksRef = useRef<BlobPart[]>([]);

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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (auth.login) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
        fileInputRef.current.click();
      }
    }else{
      alert("로그인이 필요한 서비스 입니다.");
    }
  };
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const file = new File([selectedFile], selectedFile.name, {type: selectedFile.type});
      try {
        const res = await audioPost(auth.access, auth.setAccess, file, id);
        setAnalysisResult(res);
        setAnalysisVisible(true);
      } catch (error) {
        console.error("Error occurred while fetching analysis result:", error);
      }
    }

    const fetchResult = async () => {
      try {
        const response = await postFetch(auth.access, auth.setAccess, id);
        const data = await response.json();
        const last = data.data.length - 1;
        setPf(data.data[last].PronunProfEval*20);
        setFl(data.data[last].FluencyEval*20);
        setCh(data.data[last].ComprehendEval*20);
        console.log(data)
      } catch (e) {
        console.error(e);
      }
    };
    fetchResult();
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
              {recording ? "녹음종료" : "발음연습"}
            </Button>
            

            {(voiceUrl && !recording) ? <audio className="w-80" controls src={voiceUrl}/> :
                <div className="w-80 text-2xl text-secondary-800"> {recording? "천천히 발음해보세요." : ""} </div>}
            <Tooltip placement={!recording?"left":"right"} content={!recording?"음성 녹음 파일을 업로드해주세요.":"녹음 중에는 발음 분석을 실시할 수 없습니다."} isDisabled={!recording&&recordedBlob !== null}>
            <Button
                onClick={handleUploadClick}
                className="w-20 py-5"
                color="success"
                variant={(!recording && recordedBlob) ? "solid" : "bordered"}
            >
              발음 분석
            </Button>
            </Tooltip>
            <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
          </div>
        </Card>
        { AnalysisVisible && (
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
                    value={fl}
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
                    value={pf}
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
                    value={ch}
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
{/*           <Divider/>
          <CardBody>
          <p>원래 발음: {answer}</p>
          </CardBody>
          <CardBody>
          <p>나의 발음: </p>
          </CardBody>
          <Divider/> */}
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
        )}
      </div>
  );
}