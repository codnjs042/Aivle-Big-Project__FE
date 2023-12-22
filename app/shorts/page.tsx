"use client"
import {useState} from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Link} from "@nextui-org/react";

export default function ShortsPage() {
	const shortsList = [
		{
			title: "오징어 게임",//"Squid Game",
			img: "/asset/images/shorts1.jpg",
			video: "/asset/images/contents1.avi",
		},
		{
			title: "기생충",//Parasite",
			img: "/asset/images/shorts2.jpg",
			video: "/asset/images/contents2.avi",
		},
		{
			title: "미스터션샤인",//"Mr. Sunshine",
			img: "/asset/images/shorts3.png",
			video: "/asset/images/contents3.avi",
		},
		{
			title: "더 글로리",//The Glory",
			img: "/asset/images/shorts4.jpg",
			video: "/asset/images/contents4.avi",
		},
		{
			title: "태양의 후예",//"Descendants of the Sun",
			img: "/asset/images/shorts5.jpeg",
			video: "/asset/images/contents5.avi",
		},
		{
			title: "도깨비",//"Goblin",
			img: "/asset/images/shorts6.png",
			video: "/asset/images/contents6.avi",
		},
		{
			title: "응답하라 1988",//"Answer me 1988",
			img: "/asset/images/shorts7.jpg",
			video: "/asset/images/contents7.avi",
		},
		{
			title: "사랑의 불시착",//Crash Landing On You",
			img: "/asset/images/shorts8.jpg",
			video: "/asset/images/contents8.avi",
		},
	
	];
	const [step, setStep] = useState(0);
	const numberStep = (step: number) => setStep(step);
	const resetStep = () => setStep(0);
	const increaseStep = (index: number) => numberStep(index + 1)

	switch(step){
		case 0:
			return (
				<div className="justify-between gap-10 grid grid-cols-4">
				<h2 className="text-2xl text-center font-bold mb-4 col-span-full">명대사 선택</h2>
				{shortsList.map((item, index) => (
					<div>
						<Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
							<CardBody className="overflow-visible p-0">
					  			<Image
								shadow="sm"
								radius="lg"
								alt={item.title}
								className="w-full object-cover"
								src={item.img}
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
