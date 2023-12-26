"use client"

import React from "react";
import ReactPlayer from 'react-player';
import {Card, CardBody, Image, Button, Slider} from "@nextui-org/react";
import {HeartIcon, PauseCircleIcon, NextIcon, PreviousIcon} from "@/components/icons";

export default function PracticePage() {
  const [liked, setLiked] = React.useState(false);

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[1000px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-20 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
          <ReactPlayer
            url="asset/videos/contents2.mp4" // 실제 경로로 변경
            width="100%"
            height="200px"
            controls={true}
            onError={(e) => console.error('Video error', e)}
          />
          </div> 
          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <p className="text-small text-foreground/80 mt-5">Son, you have a plan</p>
				        <h3 className="font-semibold text-foreground/90 mt-5">adeura, neon gyehoegi da issguna</h3>
                <h1 className="text-large font-medium mt-5">아들아, 넌 계획이 다 있구나</h1>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
            </div>

            <div className="flex flex-col mt-20 gap-1">
              <Slider
                aria-label="Record progress"
                classNames={{
                  track: "bg-default-500/30",
                  thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                }}
                color="foreground"
                defaultValue={33}
                size="sm"
              />
              <div className="flex justify-between">
                <p className="text-small">0:04</p>
                <p className="text-small text-foreground/50">0:10</p>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <PreviousIcon />
              </Button>
              <Button
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <PauseCircleIcon size={54} />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <NextIcon />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
