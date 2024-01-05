"use client";
import { title } from "@/components/primitives";
import React, { useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";

export default function AboutPage() {
	const [selectedCard, setSelectedCard] = useState(null);

	const content = [
		{
			category: "SHORTS",
			title: "숏폼서비스",
		  	img: "/asset/images/shorts/shorts.jpg",
			about: "연습한 가사와 명대사를 숏폼으로 제작하고 친구와 공유해보세요.",
		},
		{
			category: "GENRE",
			title: "다양한 장르",
		  	img: "/asset/images/contents/contents2.jpg",
			about: "로맨스, 사극, 판타지 등 다양한 테마별로 30,000개 이상의 K-CONTENTS 명대사를 연습해보세요.",
		},
		{
			category: "ARTIST",
			title: "다양한 아티스트",
		  	img: "/asset/images/idol/idol1.png",
			about: "좋아하는 가수의 가사를 연습하며 한국어를 배워보세요.",
		},
	  ];

	const list = [
		{
		  title: "최정안",
		  img: "/asset/images/member/member1.jpg",
		  price: "FE",
		},
		{
		  title: "조현우",
		  img: "/asset/images/member/member2.jpg",
		  price: "AI",
		},
		{
			title: "신승규",
			img: "/asset/images/member/member5.jpg",
			price: "BE",
		},
		{
			title: "김채원",
			img: "/asset/images/member/member6.png",
			price: "FE",
		},
		{
		  title: "김민정",
		  img: "/asset/images/member/member3.png",
		  price: "AI",
		},
		{
		  title: "조소은",
		  img: "/asset/images/member/member4.png",
		  price: "BE",
		},
	  ];

	  const handleCardClick = (index:any) => {
		setSelectedCard(selectedCard === index ? null : index);
	  };

	return (
		<div>
			<div className="max-w-[1000px] gap-10 grid grid-cols-12 grid-rows-8">
				<div className="col-span-12 text-center">
				<h1 className="text-3xl font-bold">서비스 소개</h1>
				</div>
				<div className="col-span-12 text-center mb-8">
					<Card>
					<CardBody className="text-center gap-2">
					<p>안녕하세요. 바름을 찾아주셔서 감사합니다.</p>
					</CardBody>
					<CardBody className="text-center gap-2">
						<p>바름은 AI 발음 분석을 통해 외국인에게 정확한 발음 교정 및 AI 레포트를 제공하여 </p>
						<p> 자연스럽고 원활한 의사소통을 돕는 서비스입니다.</p>
					</CardBody>
					<CardBody className="text-center">
						<p>K-POP 가사와 K-CONTENTS 명대사를 통해 쉽고 즐겁게 한국인의 일상 대화를 배울 수 있습니다.</p>
					</CardBody>
					<CardBody className="text-center">
						<p>회원가입을 하시면 AI 레포트, 발음 분석 등 더 많은 기능을 즐겨실 수 있습니다.</p>
					</CardBody>
					</Card>
				</div>
				{content.map((item, index) => (
          			<Card
        	    		key={index}
            			isPressable
            			onPress={() => handleCardClick(index)}
            			className={`col-span-12 sm:col-span-4 h-[300px] ${
            				selectedCard === index ? "bg-black text-white" : ""
            			}`}
					>
            			<CardHeader className="absolute z-10 top-1 flex-col !items-start">
              				<p className="text-tiny text-white/60 uppercase font-bold">{item.category}</p>
              				<h4 className="text-white text-large font-bold">{item.title}</h4>
			  				{selectedCard === index && (
                				<p className="text-center text-base text-purple-200 uppercase py-12 mx-6 tracking-tighter text-shadow-yellow-500">{item.about}</p>
              				)}
            			</CardHeader>
						{selectedCard !== index && (
							<Image
              					removeWrapper
              					alt="Card background"
              					className="z-0 w-full h-full object-cover"
              					src={item.img}
            				/>
						)}
          			</Card>
        		))}
			</div>
			<div className="max-w-[1000px] gap-10 grid grid-cols-12 grid-rows-8 mt-20">
				<div className="col-span-12 text-center">
					<h1 className="text-2xl font-bold">개발자 소개</h1>
				</div>
				{list.map((item, index) => (
					<Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")} className="col-span-12 sm:col-span-4 h-[250px]">
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
