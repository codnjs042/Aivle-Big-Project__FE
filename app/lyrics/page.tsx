"use client"

import React, {useContext, useEffect, useRef, useState} from "react";
import AuthContext from "@/context/AuthContext";
import dynamic from 'next/dynamic';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Link
} from "@nextui-org/react";
import {HeartIcon, Logo} from "@/components/icons";
import {useRouter, useSearchParams} from "next/navigation";
import {artistList} from "@/types/artist";
import lyricsList from '../../public/data/lyrics';
import cn from 'classnames';
import Player from "@/components/layouts/player";

export default function PracticePage() {
  const router = useRouter();
  const queryParams = useSearchParams();
  const artist = queryParams.get('artist');
  const lyrics = lyricsList.find(item => item.title === artist);
  const [liked, setLiked] = React.useState(false);
  const DynamicReactPlayer = dynamic(() => import('react-player'), {ssr: false});
  const [selectedArtist, setSelectedArtist] = useState<string>('');
  const [selectedPart, setSelectedPart] = useState(1);

  const goToArtistPage = () => {
    router.push('/artist');
  };

  useEffect(() => {
    const artistEntry = artistList.find(entry => entry.name === artist);
    if (artistEntry) {
      setSelectedArtist(artistEntry.name);
    } else {
      setSelectedArtist('');
    }
  }, [artist]);


  const renderPart = (partNumber: any) => {
    type Lyrics = /*unresolved*/ any
    const partData = (lyrics as Lyrics)[`part${partNumber}`];

    return (
        <div key={partNumber}>
          <Card
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50 max-w-[1500px]"
              shadow="sm"
          >
            <CardBody style={{
              paddingTop: '50px',
              paddingBottom: '50px',
              paddingLeft: '50px',
              paddingRight: '50px'
            }}>
              <div
                  className="grid grid-cols-6 md:grid-cols-3 gap-6 md:gap-20 items-center justify-center">
                <div className="flex flex-col col-span-6 md:col-span-8">
                  {/* 사진, 문장, 하트 */}
                  <div className="flex justify-between items-center">
                    <div className="relative col-span-6 md:col-span-4 mr-10 ">
                      {partData && partData[3] ? (
                          <iframe
                              width="560"
                              height="315"
                              src={partData[3]}
                              title="YouTube video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          ></iframe>
                      ) : undefined}
                    </div>
                    {/* 단어 문장 */}
                    <div className="flex flex-col gap-2">
                      <h1 className="font-large text-foreground/80 mt-5">{partData ? partData[1] : undefined}</h1>
                      <h1 className="text-large text-foreground/90 mt-5">{partData ? partData[2] : undefined}</h1>
                      <h1 className="text-large font-medium mt-5">{partData ? partData[0] : undefined}</h1>
                    </div>
                    <Button
                        isIconOnly
                        className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 ml-2"
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
                </div>
              </div>
            </CardBody>
          </Card>
         <Player answer={partData ? partData[partNumber] : undefined} />
        </div>
    );
  };

  return (
      <div>
        <div className="mt-5 flex justify-center">
          <Button
              variant="light"
              color="default"
              onPress={goToArtistPage}
              disabled
          >
            홈
          </Button>
          {Array.from({length: 3}, (_, i) => i + 1).map((partNumber) => (
              <Button
                  key={partNumber}
                  variant="light"
                  color={selectedPart === partNumber ? "secondary" : "default"}
                  onPress={() => setSelectedPart(partNumber)}
                  className="ml-3"
              >
                파트 {partNumber}
              </Button>
          ))}
        </div>

        {renderPart(selectedPart)}
      </div>
  );
}