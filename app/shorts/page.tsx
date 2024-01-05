"use client"
import {useState} from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Link} from "@nextui-org/react";
import NextLink from "next/link";
import contentsList from "../../public/data/contents";

export default function ShortsPage() {
	return (
			<div className="justify-between gap-10 grid grid-cols-4">
				<h2 className="text-2xl text-center font-bold mb-4 col-span-full">마음에 드는 콘텐츠를 쇼츠로 찍어보세요 !</h2>
				{contentsList.map((item, index) => (
					<div className="my-2 ml-2" key={index}>
						<NextLink href={`/myshorts?content=${item.title}`}>
							<Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
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
						</NextLink>
					</div>
				))}	
			</div>
	);
}
