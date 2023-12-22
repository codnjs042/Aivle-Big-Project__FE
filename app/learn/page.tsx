"use client";
import { title } from "@/components/primitives";
import React from "react";
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
export default function LearnPage() {
	let tabs = [
		{
			id: "한국어",
			label: "한국어",
			content: "안녕하세요[안녕하세요]"
		},
		{
			id: "영어발음",
			label: "영어발음",
			content: "Annyunghaseyo"
		},
		{
			id: "영어",
			label: "영어",
			content: "Hello"
		}
		];
		return (
			<div className="flex w-full flex-col">
		<Tabs aria-label="Dynamic tabs" items={tabs}>
			{(item) => (
			<Tab key={item.id} title={item.label}>
				<Card>
				<CardBody>
					{item.content}
				</CardBody>
				</Card>  
			</Tab>
			)}
		</Tabs>
		</div> 
	);
}
