"use client"
import { useRef, useState, useEffect } from "react";
import {Button} from "@nextui-org/react";
import {CameraIcon} from './CameraIcon';
import {title} from "@/components/primitives";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";

function useWebcamRecording() {
	const webcamRef = useRef(null);
	const [recording, setRecording] = useState(false);
	const [recordedChunks, setRecordedChunks] = useState([]);
	const [recordedBlob, setRecordedBlob] = useState(null);
	const [recorder, setRecorder] = useState(null);
  
	const startRecording = () => {
		if (recorder) {
			recorder.stopRecording(() => {
			  setRecordedBlob(recorder.getBlob());
			  setRecording(false);
			  setRecordedChunks([]);
			  recorder.clearRecordedData();
			});
		}
		
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			const newRecorder = RecordRTC(stream, {
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
  
	const handleDataAvailable = (event) => {
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
	  	recording,
	  	startRecording,
	  	stopRecording,
	  	downloadRecording,
	};
}

export default function MyshortsPage() {
	const [step, setStep] = useState(0);
	const NextStep = () => setStep(step=>step+1);
	const ResetStep = () => setStep(0);
	const { webcamRef, recording, startRecording, stopRecording, downloadRecording } = useWebcamRecording();
	  
	switch(step){
		case 0:
			return (
				<div>
					<h1 className={title()}>직접 쇼츠를 만들어 보세요!</h1>
					<div>
          				<Webcam
            				audio={false}
            				height={360}
            				ref={webcamRef}
            				screenshotFormat="image/jpeg"
            				width={720}
          				/>
					</div>
					<Button onClick={() => { NextStep(); startRecording(); }} color="primary" variant="light">촬영 시작</Button>
				</div>
			);
		case 1:
			return (
				<div>
					<h1 className={title()}></h1>
					<div>
          				<Webcam
            				audio={false}
            				height={360}
            				ref={webcamRef}
            				screenshotFormat="image/jpeg"
            				width={720}
          				/>
					</div>
					<Button onClick={() => { NextStep(); stopRecording();}} color="primary" variant="light">촬영 중지</Button>
				</div>
			);
		case 2:
			return (
				<div>
					<h1 className={title()}></h1>
					<div>
          				<Webcam
            				audio={false}
            				height={360}
            				ref={webcamRef}
            				screenshotFormat="image/jpeg"
            				width={720}
          				/>
					</div>
					<Button onClick={ResetStep} color="primary" variant="light">다시 촬영</Button>
					<Button onClick={downloadRecording} color="primary" variant="light">저장</Button>{/* 개인소장 - 마이페이지에 저장 및 다운로드 */}
					<Button onClick={ResetStep} color="primary" variant="light">업로드</Button>{/* 공유 - 숏츠시청페이지에 업로드 */}
				</div>
			);
	}
	
}
