"use client"

import {Card, CardHeader, CardBody, CardFooter, Image, Link} from "@nextui-org/react";

export default function ShortsPage() {
	const shortsList = [
		{
			title: "오징어 게임",//"Squid Game",
			img: "/asset/images/shorts1.jpg",
		},
		{
			title: "기생충",//Parasite",
			img: "/asset/images/shorts2.jpg",
		},
		{
			title: "미스터션샤인",//"Mr. Sunshine",
			img: "/asset/images/shorts3.png",
		},
		{
			title: "더 글로리",//The Glory",
			img: "/asset/images/shorts4.jpg",
		},
		{
			title: "태양의 후예",//"Descendants of the Sun",
			img: "/asset/images/shorts5.jpeg",
		},
		{
			title: "도깨비",//"Goblin",
			img: "/asset/images/shorts6.png",
		},
		{
			title: "응답하라 1988",//"Answer me 1988",
			img: "/asset/images/shorts7.jpg",
		},
		{
			title: "사랑의 불시착",//Crash Landing On You",
			img: "/asset/images/shorts8.jpg",
		},
	
	  ];

	return (
		<div className="justify-between gap-10 grid grid-cols-4">
		<h2 className="text-2xl text-center font-bold mb-4 col-span-full">명대사 선택</h2>
		{shortsList.map((item, index) => (
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
		))}
	  </div>
	);
}
