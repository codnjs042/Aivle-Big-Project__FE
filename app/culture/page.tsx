"use client";

import { title } from "@/components/primitives";
import {Card, CardHeader, CardBody, CardFooter, Image, Link} from "@nextui-org/react";
import {usePagination, PaginationItemType} from "@nextui-org/react";

export default function CulturePage() {
	const list = [
		{
			title: "NEWJEANS",
			img: "/asset/images/idol1.png",
		},
		{
			title: "BTS",
			img: "/asset/images/idol2.png",
		},
		{
			title: "NCT DREAM",
			img: "/asset/images/idol3.png",
		},
		{
			title: "BLACKPINK",
			img: "/asset/images/idol4.png",
		},
		{
			title: "AESPA",
			img: "/asset/images/idol5.png",
		},
		{
			title: "IVE",
			img: "/asset/images/idol6.png",
		},
		{
			title: "NCT127",
			img: "/asset/images/idol7.png",
		},
		{
			title: "SEVENTEEN",
			img: "/asset/images/idol8.png",
		},
	
	  ];


	return (
		<div className="flex justify-between gap-2 grid grid-cols-2 sm:grid-cols-4">
		{list.map((item, index) => (
		  <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
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
		
	);
}