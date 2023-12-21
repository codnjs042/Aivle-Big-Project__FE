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
		// <div className="max-w-[900px] gap-20 grid grid-cols-12 grid-rows-3 px-8 mt-12">
        //   <Card className="col-span-12 sm:col-span-4 h-[250px]">
        //     <CardHeader className="absolute z-10 top-1 flex-col !items-center">
        //       <h4 className="text-white font-medium text-large">발음 교정 서비스</h4>
        //       <p className="text-tiny text-white/60 uppercase font-bold">한국 일상 대화를 배우고 자주 틀리는 한국어 발음을 교정해보세요.</p>
        //     </CardHeader>
            
        //     <Image
        //       removeWrapper
        //       alt="Card background"
        //       className="z-0 w-full h-full object-cover"
        //       src="/images/card-example-4.jpeg"
        //     />
        //   </Card>
        //   <Card className="col-span-12 sm:col-span-4 h-[250px]">
        //     <CardHeader className="absolute z-10 top-1 flex-col !items-center">
        //       <h4 className="text-white font-medium text-large">명대사 연습</h4>
        //       <p className="text-tiny text-white/60 uppercase font-bold">로맨스, 사극, 판타지 등 다양한 장르의 명대사와 좋아하는 가수의 가사를 연습하며 한국어를
        //                 배워보세요.</p>
        //     </CardHeader>
        //     <Image
        //       removeWrapper
        //       alt="Card background"
        //       className="z-0 w-full h-full object-cover"
        //       src="/images/card-example-3.jpeg"
        //     />
        //   </Card>
        //   <Card className="col-span-12 sm:col-span-4 h-[250px]">
        //     <CardHeader className="absolute z-10 top-1 flex-col !items-center">
        //       <h4 className="text-white font-medium text-large">숏폼 생성</h4>
        //       <p className="text-tiny text-white/60 uppercase font-bold">연습한 가사와 명대사를 숏폼으로 제작하고 친구와 공유해보세요.</p>
        //     </CardHeader>
        //     <Image
        //       removeWrapper
        //       alt="Card background"
        //       className="z-0 w-full h-full object-cover"
        //       src="\asset\images\shorts.png"
        //     />
        //   </Card>
        //   </div>

		<div className="flex justify-between gap-2 grid grid-cols-2 sm:grid-cols-4">
		{list.map((item, index) => (
		  <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
			<CardBody className="overflow-visible p-0">
			  <Image
				shadow="sm"
				radius="lg"
				width="100%"
				alt={item.title}
				className="w-full object-cover h-[150px]"
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