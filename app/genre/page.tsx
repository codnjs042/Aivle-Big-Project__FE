"use client"
import NextLink from "next/link";
import {Card, CardHeader, CardBody, CardFooter, Image, Link} from "@nextui-org/react";

export default function CulturePage() {
	const contentsList = [
		{
			title: "오징어게임",
			img: "/asset/images/contents1.jpg",
			path: "/practice"
		},
		{
			title: "기생충",
			img: "/asset/images/contents2.jpg",
			path: "/practice"
		},
		{
			title: "미스터션샤인",
			img: "/asset/images/contents3.jpg",
			path: "/practice"
		},
		{
			title: "더글로리",
			img: "/asset/images/contents4.jpg",
		},
		{
			title: "태양의 후예",
			img: "/asset/images/contents5.jpg",
			path: "/practice"
		},
		{
			title: "도깨비",
			img: "/asset/images/contents6.jpg",
			path: "/practice"
		},
		{
			title: "응답하라 1988",
			img: "/asset/images/contents7.jpg",
			path: "/practice"
		},
		{
			title: "사랑의 불시착",
			img: "/asset/images/contents8.jpg",
			path: "/practice"
		},
	
	  ];

	  return (
		<div className="justify-between gap-10 grid grid-cols-4">
		  <h2 className="text-2xl text-center font-bold mb-4 col-span-full">컨텐츠 선택</h2>
		  {contentsList.map((item, index) => (
			<NextLink href="/practice">
				<Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
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
			</NextLink>
		  ))}
		</div>
	  );
}