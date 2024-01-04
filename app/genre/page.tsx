"use client"

import React from "react";
import NextLink from "next/link";
import {Card, CardHeader, CardBody, CardFooter, Image, Link, Tabs, Tab, Chip} from "@nextui-org/react";
import contentsList from '../../public/data/contents';

export default function CulturePage() {
  const [selected, setSelected] = React.useState("all");
      return (
        <div className="justify-between">
          <h2 className="text-2xl text-center font-bold mb-4 col-span-full">컨텐츠 선택</h2>
          <div className="flex w-full flex-col my-5">
      <Tabs 
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(String(key))}
        color="primary" 
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-purple-500",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-purple-500"
        }}
      >
        <Tab
          key="all"
          title={
            <div className="flex items-center space-x-2">
              
              <span>모든 콘텐츠</span>
              <Chip size="sm" variant="faded">8</Chip>
              
            </div>
          }
        >
          <div className="justify-between gap-10 grid grid-cols-4">
          {contentsList.map((item, index) => (
            <NextLink href={`/practice?content=${item.title}`} key={index}>
                <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      alt={item.title}
                      className="w-full h-60 object-contain"
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
        </Tab>
        <Tab
          key="recommend"
          title={
            <div className="flex items-center space-x-2">
              <span>추천 콘텐츠</span>
              <Chip size="sm" variant="faded">?</Chip>
            </div>
          }
        >
        </Tab>
      </Tabs>
    </div>
    
        </div>
      );
}
