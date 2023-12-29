"use client"
import NextLink from "next/link";
import {Card, CardHeader, CardBody, CardFooter, Image, Link} from "@nextui-org/react";

export default function CulturePage() {
	const artistList = [
		{
			title: "NEWJEANS",
			img: "/asset/images/idol/idol1.png",
		},
		{
			title: "BTS",
			img: "/asset/images/idol/idol2.png",
		},
		{
			title: "NCT DREAM",
			img: "/asset/images/idol/idol3.png",
		},
		{
			title: "BLACKPINK",
			img: "/asset/images/idol/idol4.png",
		},
		{
			title: "AESPA",
			img: "/asset/images/idol/idol5.png",
		},
		{
			title: "IVE",
			img: "/asset/images/idol/idol6.png",
		},
		{
			title: "NCT 127",
			img: "/asset/images/idol/idol7.png",
		},
		{
			title: "SEVENTEEN",
			img: "/asset/images/idol/idol8.png",
		},
	
	  ];

	return (
		<div className="justify-between gap-10 grid grid-cols-4">
		<h2 className="text-2xl text-center font-bold mb-4 col-span-full">아티스트 선택</h2>
		{artistList.map((item, index) => (
			<NextLink href={`/lyrics?artist=${item.title}`} key={index}>
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