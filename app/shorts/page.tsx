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
				<h2 className="text-2xl text-center font-bold mb-4 col-span-full">쇼츠 게시판</h2>
				
				{contentsList.map((item, index) => (
					<div className="my-2 ml-2">
						<Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
							<CardBody className="p-0">
								<Image
								shadow="sm"
								radius="lg"
								alt={item.title}
								className="object-cover h-24"
								style={{width:'180px'}}
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
