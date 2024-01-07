"use client"

import React, { useContext, useState, useRef, useEffect, useCallback } from "react";
import AuthContext from "@/context/AuthContext";
import { Button, Link } from "@nextui-org/react";
import Webcam from "react-webcam";
import { useReactMediaRecorder } from "react-media-recorder";
import RecordRTC from "recordrtc";
import { useRouter, useSearchParams } from "next/navigation";
import contentsList from '../../public/data/contents';
import CulturePage from '../genre/page';

const VideoRecorder = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const queryParams = useSearchParams();
  const contentTitle = queryParams.get('content');
  const content = contentsList.find(item => item.title === contentTitle);
  const [liked, setLiked] = React.useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedPart, setSelectedPart] = useState(1);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const videoChunks = useRef<Blob[]>([]);

  const getMediaPermission = useCallback(async () => {
    try {
      const audioConstraints = { audio: true };
      const videoConstraints = {
        audio: false,
        video: true,
      };

      const audioStream = await navigator.mediaDevices.getUserMedia(audioConstraints);
      const videoStream = await navigator.mediaDevices.getUserMedia(videoConstraints);

      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }

      // MediaRecorder 초기화
      const combinedStream = new MediaStream([
        ...videoStream.getVideoTracks(),
        ...audioStream.getAudioTracks(),
      ]);

      if (!mediaRecorder.current) {
        const recorder = new MediaRecorder(combinedStream, {
          mimeType: 'video/webm',
        });

        recorder.ondataavailable = (e) => {
          if (typeof e.data === 'undefined') return;
          if (e.data.size === 0) return;
          videoChunks.current.push(e.data);
        };

        mediaRecorder.current = recorder;
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const downloadVideo = () => {
    const videoBlob = new Blob(videoChunks.current, { type: 'video/webm' });
    const videoUrl = URL.createObjectURL(videoBlob);
    const link = document.createElement('a');
    link.download = `My video.webm`;
    link.href = videoUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [isRecording, setIsRecording] = useState(false);
  const [showReRecordButtons, setShowReRecordButtons] = useState(false);

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 한 번만 호출
    getMediaPermission();
  }, [getMediaPermission]);

  const startRecording = () => {
    videoChunks.current = []; // 녹화 데이터 초기화
    setIsRecording(true);
    setShowReRecordButtons(false);

    // getMediaPermission 함수를 호출하여 웹캠 권한을 확인
    getMediaPermission();

    // 녹화 시작
    mediaRecorder.current?.start();
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }
    setShowReRecordButtons(true);
    setIsRecording(false);
  };

  const displayRecordedVideo = () => {
    const videoBlob = new Blob(videoChunks.current, { type: 'video/webm' });
    const videoUrl = URL.createObjectURL(videoBlob);

    // 녹화된 비디오 표시
    if (videoRef.current) {
      videoRef.current.src = videoUrl;
    }
  };

  const handleUpload = async (e:any) => {
    if (auth.login) {
    } else {
      e.preventDefault();
      alert("로그인이 필요합니다.");
    }
  };

  const handleDownload = () => {
    const videoBlob = new Blob(videoChunks.current, { type: 'video/webm' });
    const videoUrl = URL.createObjectURL(videoBlob);
  
    // 다운로드 트리거
    const link = document.createElement('a');
    link.download = `My video.webm`;
    link.href = videoUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderPart = (partNumber: any) => {
    type practice = /*unresolved*/ any
    const partData = (content as practice)[`part${partNumber}`];
  
    return (
      <div key={partNumber}>
        {isRecording || videoChunks.current.length > 0 ? (
          <>
            <video ref={videoRef} autoPlay />
            {isRecording && (
              <Button
                className="mt-5"
                onClick={stopRecording}
                color="secondary"
                variant="ghost"
              >
                쇼츠 종료
              </Button>
            )}
          </>
        ) : (
          <>
            {showReRecordButtons ? (
              <div className="flex flex-row ml-20 gap-2 mt-5">
                <Button
                  onClick={startRecording}
                  color="secondary"
                  variant="ghost"
                >
                  재촬영
                </Button>
                <Link href="/shortsvideo">
                  <Button
                    onClick={handleUpload}
                    color="secondary"
                    variant="ghost"
                  >
                    업로드
                  </Button>
                </Link>
                <Button
                  onClick={handleDownload}
                  color="secondary"
                  variant="ghost"
                >
                  다운로드
                </Button>
                <Link href="/shorts">
                  <Button
                    color="secondary"
                    variant="ghost"
                  >
                    종료
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {/* Display the iframe for the part's video only on the initial screen */}
                {!isRecording && !showReRecordButtons && (
                  partData && partData[3] && (
                  <iframe
                    width="560"
                    height="315"
                    src={partData[3]}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  ></iframe>
                ))}
                <Button
                  className="mt-5"
                  onClick={startRecording}
                  color="secondary"
                  variant="ghost"
                >
                  쇼츠 시작
                </Button>
              </>
            )}
          </>
        )}
      </div>
    );
  };
  

  return (
    <div>
      <p className="mb-5">10초 이내로 제작해주세요 ! </p>
      {[1, 2, 3].map(partNumber => (
        <Button
          key={partNumber}
          onClick={() => {
            setSelectedPart(partNumber);
            setShowReRecordButtons(false);
            setIsRecording(false);
          }}
          variant="light"
          color={selectedPart === partNumber ? "secondary" : "default"}
          className="mx-2 my-4"
        >
          파트 {partNumber}
        </Button>
      ))}

      {renderPart(selectedPart)}
    </div>
  );
};

export default VideoRecorder;