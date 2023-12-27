"use client"

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import {Card, CardBody, Image, Button, Slider} from "@nextui-org/react";
import {HeartIcon, PauseCircleIcon, NextIcon, PreviousIcon} from "@/components/icons";
import { useRouter, useSearchParams } from "next/navigation";
import {Artist, artistList} from "@/types/artist";

export default function PracticePage() {
  const router = useRouter();
  const queryParams = useSearchParams();
  const artist = queryParams.get('artist');
  const [liked, setLiked] = React.useState(false);
  const DynamicReactPlayer = dynamic(() => import('react-player'), { ssr: false });
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  useEffect(() => {

    if (artist !== null && artistList.includes(artist as Artist)) {
      setSelectedArtist(artist as Artist);
    } else {
      setSelectedArtist(null);
    }
  }, [artist]);

  const artistInfo = {
    "NEWJEANS": {
      text1: "My past days are a dream I forget when I open my eyes Hype boy I only want you",
      text2: "nae jinannaldeureun nun tteumyeon ijneun kkum Hype boy neoman wonhae",
      text3: "내 지난날들은 눈 뜨면 잊는 꿈 Hype boy 너만 원해",
      image: "asset/images/idol1.png",
    },
    "BTS": {
      text1: "My blood, sweat, tears, my last dance",
      text2: "nae pi ttam nunmul nae majimak chumeul",
      text3: "내 피 땀 눈물 내 마지막 춤을",
      image: "asset/images/idol2.png",
    },
    "NCT DREAM": {
      text1: "I just said I love you",
      text2: "danji neol saranghae ireohge malhaessji",
      text3: "단지 널 사랑해 이렇게 말했지",
      image: "asset/images/idol3.png",
    },
    "BLACKPINK": {
      text1: "Baby, hug me like I'm going to explode Stop thinking about it What's so difficult",
      text2: "baby, nal teojil geoscheoreom anajwo geuman saenggakhae mwoga geuri eoryeowo ",
      text3: "Baby, 날 터질 것처럼 안아줘 그만 생각해 뭐가 그리 어려워",
      image: "asset/images/idol4.png",
    },
    "AESPA": {
      text1: "I can't handle the hopelessness, I can't break my faith",
      text2: "gamdanghal su eopsneun jeolmangdo nae mideumeul kkaeji moshae",
      text3: "감당할 수 없는 절망도 내 믿음을 깨지 못해",
      image: "asset/images/idol5.png",
    },
    "IVE": {
      text1: "My beautiful black eyes fall deeper, hold your breath, love give",
      text2: "areumdaun kkaman nunbit deo ppajyeo gipi sum chamgo love dive ",
      text3: "아름다운 까만 눈빛 더 빠져 깊이 숨 참고 love dive",
      image: "asset/images/idol6.png",
    },
    "NCT 127": {
      text1: "I poke forward, left and right, new thang Wherever we go, festival",
      text2: "nan apeuro jjilleo jwau, new thang uriga eodil gadeun chukje",
      text3: "난 앞으로 찔러 좌우, new thang 우리가 어딜 가든 축제",
      image: "asset/images/idol7.png",
    },
    "SEVENTEEN": {
      text1: "jamkkan sonyeoya jeoldae neon dareun saramege nokjima naega jiltu najanha ",
      text2: "nae pi ttam nunmul nae majimak chumeul",
      text3: "잠깐 소녀야 절대 넌 다른 사람에게 녹지마 내가 질투 나잖아",
      image: "asset/images/idol8.png",

    },
  };

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[1000px]"
      shadow="sm"
    >
      <CardBody style={{ marginLeft:'50px'}}>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-20 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
          <Image
                  alt="Album cover"
                  className="object-cover"
                  height={200}
                  shadow="md"
                  src={selectedArtist ? artistInfo[selectedArtist]?.image || undefined : undefined}
                  width="100%"
                />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-7">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <p className="text-small text-foreground/80 mt-5">{selectedArtist && artistInfo[selectedArtist]?.text1}</p>
				        <h3 className="font-semibold text-foreground/90 mt-5">{selectedArtist && artistInfo[selectedArtist]?.text2}</h3>
                <h1 className="text-large font-medium mt-5">{selectedArtist && artistInfo[selectedArtist]?.text3}</h1>
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
