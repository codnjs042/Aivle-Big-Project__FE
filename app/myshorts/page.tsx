"use client"

import { useState, useRef,useEffect } from "react";
import { Button } from "@nextui-org/react";
import Webcam from "react-webcam";
import { useReactMediaRecorder } from "react-media-recorder";
import RecordRTC from "recordrtc";

function useWebcamRecording() {
  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Array<Blob>>([]);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

<<<<<<< HEAD
			newRecorder.startRecording();
			setRecorder(newRecorder);
			setRecording(true);
			setRecordedChunks([]);
		});
	};
  
	const stopRecording = () => {
	  	if (recorder && recording) {
			recorder.stopRecording(() => {
		  		setRecordedBlob(recorder.getBlob());
		  		setRecording(false);
			});
	  	}
	};
  
	const handleDataAvailable = (event: { data: Blob; }) => {
		if (event.data.size > 0) {
		  	setRecordedChunks((prev) => [...prev, event.data]);
		}
	};
  
	const downloadRecording = () => {
		if (recordedBlob) {
		  	const url = URL.createObjectURL(recordedBlob);
		  	const a = document.createElement("a");
		  	document.body.appendChild(a);
		  	a.style = "display: none";
		  	a.href = url;
		  	a.download = "recorded-video.webm";
		  	a.click();
		  	window.URL.revokeObjectURL(url);
		  	setRecordedChunks([]);
		}
	};
	useEffect(() => {
		if (recording && webcamRef.current && recorder) {
		  	const mediaRecorder = new MediaRecorder(webcamRef.current.stream, {
				mimeType: "video/webm",
			});
	  
		  	mediaRecorder.ondataavailable = handleDataAvailable;
		  	mediaRecorder.onstop = () => {
				mediaRecorder.stop();
		  	};
	  
		  	mediaRecorder.start();
	  
		  	return () => {
				mediaRecorder.stop();
		  	};
		}
	}, [recording, recorder]);
  
	return {
	  	webcamRef,
		videoConstraints,
	  	recording,
	  	startRecording,
	  	stopRecording,
	  	downloadRecording,
	};
=======
  const startRecording = () => {
    if (recorder !== null) {
      recorder.stopRecording(() => {
        setRecordedBlob(recorder.getBlob());
        setRecording(false);
        setRecordedChunks([]);
        recorder.clearRecordedData();
      });
    }
    navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
      const newRecorder = new RecordRTC(stream, {
        type: "video",
      });

      newRecorder.ondataavailable = handleDataAvailable;
      newRecorder.onstop = () => {
        newRecorder.stop();
      };

      newRecorder.startRecording();
      setRecorder(newRecorder);
      setRecording(true);
      setRecordedChunks([]);
    });
  };

  const stopRecording = () => {
    if (recorder && recording) {
      recorder.stopRecording(() => {
        setRecordedBlob(recorder.getBlob());
        setRecording(false);
      });
    }
  };

  const handleDataAvailable = (event: { data: Blob; }) => {
    if (event.data.size > 0) {
      setRecordedChunks((prev) => [...prev, event.data]);
    }
  };

  const downloadRecording = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "recorded-video.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  };
  useEffect(() => {
    if (recording && webcamRef.current && recorder) {
      const mediaRecorder = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });

      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.onstop = () => {
        mediaRecorder.stop();
      };

      mediaRecorder.start();

      return () => {
        mediaRecorder.stop();
      };
    }
  }, [recording, recorder]);

  return {
    webcamRef,
    videoConstraints,
    recording,
    startRecording,
    stopRecording,
    downloadRecording,
  };
>>>>>>> 02729b4 (a)
}

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
  } = useReactMediaRecorder({video: true, audio: true});

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