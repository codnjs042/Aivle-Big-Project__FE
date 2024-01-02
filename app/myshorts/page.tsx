"use client"

import { useState } from "react";
import { Button } from "@nextui-org/react";
import Webcam from "react-webcam";
import { useReactMediaRecorder } from "react-media-recorder";

export default function MyshortsPage() {
  const [step, setStep] = useState(0);
  const NextStep = () => setStep((step) => step + 1);
  const ResetStep = () => setStep(0);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ video: true, audio: true });

  switch (step) {
    case 0:
      return (
        <div className="space-y-4">
          <p className="text-2xl">직접 쇼츠를 만들어 보세요!</p>
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <Button
            onClick={() => {
              NextStep();
              startRecording();
            }}
            color="secondary"
            variant="ghost"
          >
            촬영 시작
          </Button>
        </div>
      );
    case 1:
      return (
        <div className="space-y-4">
          <p className="text-2xl">촬영중..</p>
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <Button
            onClick={() => {
              NextStep();
              stopRecording();
            }}
            color="secondary"
            variant="ghost"
          >
            촬영 중지
          </Button>
        </div>
      );
    case 2:
      return (
        <div className="space-y-4">
          <p className="text-2xl">촬영 완료!</p>
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <div className="space-x-4">
            <Button onClick={ResetStep} color="secondary" variant="ghost">
              다시 촬영
            </Button>
            {status === "stopped" && (
              <Button
                onClick={() => {
                  // Download the recorded video using the blob URL
                  const a = document.createElement("a");
                  a.href = mediaBlobUrl!;
                  a.download = "recorded-video.webm";
                  a.click();
                }}
                color="secondary"
                variant="ghost"
              >
                저장
              </Button>
            )}
            <Button onClick={ResetStep} color="secondary" variant="ghost">
              업로드
            </Button>
          </div>
        </div>
      );
  }
}