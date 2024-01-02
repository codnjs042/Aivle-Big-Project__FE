"use client";
import { title } from "@/components/primitives";
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";

export default function AboutPage() {

	const list = [
		{
		  title: "최정안",
		  img: "/asset/images/member/member1.jpeg",
		  price: "FE",
		},
		{
		  title: "조현우",
		  img: "/asset/images/member/member2.jpg",
		  price: "AI",
		},
		{
		  title: "김민정",
		  img: "/asset/images/member/member3.jpg",
		  price: "AI",
		},
		{
		  title: "조소은",
		  img: "/asset/images/member/member4.jpg",
		  price: "BE",
		},
		{
		  title: "신승규",
		  img: "/asset/images/member/member5.jpg",
		  price: "BE",
		},
		{
		  title: "김채원",
		  img: "/asset/images/member/member6.jpg",
		  price: "FE",
		},
	  ];

	return (
		<div>
			<div className="max-w-[1000px] gap-10 grid grid-cols-12 grid-rows-8">
				<div className="col-span-12 text-center">
				<h1 className="text-3xl font-bold">서비스 소개</h1>
				</div>
				<div className="col-span-12 text-center mb-8">
					<Card>
					<CardBody>
						<p>저희 서비스는 입모양 및 발음 분석을 통해 외국인에게 발음 교정을 제공하며 원활한 의사소통을 돕는 서비스입니다.</p>
					</CardBody>
					<CardBody>
						<p>K-POP 가사와 K-CONTENTS 명대사를 통해 흥미롭게 한국인의 일상 대화를 배워보세요.</p>
					</CardBody>
					</Card>
				</div>

				<Card className="col-span-12 sm:col-span-4 h-[300px]">
					<CardHeader className="absolute z-10 top-1 flex-col !items-start">
						<p className="text-tiny text-white/60 uppercase font-bold">Shorts</p>
						<h4 className="text-white font-medium text-large">숏폼 서비스</h4>
						<p className="text-tiny text-white/60 uppercase font-bold">연습한 가사와 명대사를 숏폼으로 제작하고 친구와 공유해보세요.</p>
					</CardHeader>
					<Image
						removeWrapper
						alt="Card background"
						className="z-0 w-full h-full object-cover"
						src="/asset/images/shorts/shorts.jpg"
					/>
					</Card>
					<Card className="col-span-12 sm:col-span-4 h-[300px]">
					<CardHeader className="absolute z-10 top-1 flex-col !items-start">
						<p className="text-tiny text-white/60 uppercase font-bold">Genre</p>
						<h4 className="text-white font-medium text-large">다양한 장르</h4>
						<p className="text-tiny text-white/60 uppercase font-bold">로맨스, 사극, 판타지 등 다양한 테마별로 30,000개 이상의 K-CONTENTS 명대사를 연습해보세요.</p>
					</CardHeader>
					<Image
						removeWrapper
						alt="Card background"
						className="z-0 w-full h-full object-cover"
						src="/asset/images/contents/contents2.jpg"
					/>
				</Card>
				<Card className="col-span-12 sm:col-span-4 h-[300px]">
					<CardHeader className="absolute z-10 top-1 flex-col !items-start">
						<p className="text-tiny text-white/60 uppercase font-bold">Artist</p>
						<h4 className="text-white font-medium text-large">다양한 아티스트</h4>
						<p className="text-tiny text-white/60 uppercase font-bold">좋아하는 가수의 가사를 연습하며 한국어를 배워보세요.</p>
					</CardHeader>
					<Image
						removeWrapper
						alt="Card background"
						className="z-0 w-full h-full object-cover"
						src="/asset/images/idol/idol1.png"
					/>
				</Card>
			</div>
			<div className="max-w-[1000px] gap-10 grid grid-cols-12 grid-rows-8 mt-20">
				<div className="col-span-12 text-center">
					<h1 className="text-2xl font-bold">개발자 소개</h1>
				</div>
				{list.map((item, index) => (
				<Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}
					className="col-span-12 sm:col-span-4 h-[250px]">
					<CardBody className="overflow-visible p-0">
								<Image
								shadow="sm"
								radius="lg"
								width="100%"
								alt={item.title}
								className="w-full object-cover h-[200px]"
								src={item.img}
								/>
							</CardBody>
							<CardFooter className="text-small justify-between">
								<b>{item.title}</b>
								<p className="text-default-500">{item.price}</p>
							</CardFooter>
					</Card>
				))}
			</div>
			</div>
			
	);
}
