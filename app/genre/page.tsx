"use client"
import NextLink from "next/link";
import {Card, CardHeader, CardBody, CardFooter, Image, Link} from "@nextui-org/react";
import contentsList from './contents';

export default function CulturePage() {
      return (
        <div className="justify-between gap-10 grid grid-cols-4">
          <h2 className="text-2xl text-center font-bold mb-4 col-span-full">컨텐츠 선택</h2>
          {contentsList.map((item, index) => (
            <NextLink href={`/practice?content=${item.title}`} key={index}>
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
