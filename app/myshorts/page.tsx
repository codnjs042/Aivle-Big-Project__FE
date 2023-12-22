"use client"
import React from "react";
import {useState} from "react";
import {Button} from "@nextui-org/react";
import {CameraIcon} from './CameraIcon';
import { title } from "@/components/primitives";

export default function MyshortsPage() {
	const [step, setStep] = useState(0);
	const PreStep = () => setStep(step=>step-1);
	const NextStep = () => setStep(step=>step+1);
	const ResetStep = () => setStep(0);
	switch(step){
		case 0:
			return (
				<div>
					<h1 className={title()}>직접 쇼츠를 만들어 보세요!</h1>
					<div color="white"></div>
					<Button onClick={NextStep} color="primary" variant="light">촬영 시작</Button>
				</div>
			);
		case 1:
			return (
				<div>
					<h1 className={title()}></h1>
					<div color="white"></div>
					<Button onClick={NextStep} color="primary" variant="light">촬영 중지</Button>
				</div>
			);
		case 2:
			return (
				<div>
					<h1 className={title()}></h1>
					<div color="white"></div>
					<Button onClick={ResetStep} color="primary" variant="light">다시 촬영</Button>
					<Button onClick={ResetStep} color="primary" variant="light">저장</Button>
					<Button onClick={ResetStep} color="primary" variant="light">업로드</Button>
				</div>
			);
	
	}
	
}
