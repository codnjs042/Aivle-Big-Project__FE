"use client"
import {useState} from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Link} from "@nextui-org/react";
import contentsList from "../genre/contents";

export default function ShortsPage() {
	const [step, setStep] = useState(0);
	const numberStep = (step: number) => setStep(step);
	const resetStep = () => setStep(0);
	const increaseStep = (index: number) => numberStep(index + 1)

	switch(step){
		case 0:
			return (
				<div className="justify-between gap-10 grid grid-cols-4">
				<h2 className="text-2xl text-center font-bold mb-4 col-span-full">명대사 선택</h2>
				{contentsList.map((item, index) => (
					<div>
						<Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
							<CardBody className="overflow-visible p-0">
					  			<Image
								shadow="sm"
								radius="lg"
								alt={item.title}
								className="w-full object-cover"
								src={item.scene}
					  		/>
							</CardBody>
							<CardFooter className="text-small justify-center">
					  			<b>{item.title}</b>
							</CardFooter>
						</Card>
					</div>
				))}
			</div>
			);
	}
}
