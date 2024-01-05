"use client"

import { useState } from "react";
import { card, cardBody, cardHeader, subtitle, title } from "@/components/primitives";
import { Card, CardHeader, Image, Link, Textarea} from "@nextui-org/react";
import Footer from "@/components/layouts/footer";

export default function Home() {
  const [selectedCard, setSelectedCard] = useState(null);

  const content = [
		{
			category: "SHORTS",
			title: "숏폼서비스",
		  	img: "/asset/images/shorts/shorts.jpg",
			about: "연습한 가사와 명대사를 숏폼으로 제작하고 친구와 공유해보세요.",
		},
		{
			category: "GENRE",
			title: "다양한 장르",
		  	img: "/asset/images/contents/contents2.jpg",
			about: "로맨스, 사극, 판타지 등 다양한 테마별로 30,000개 이상의 K-CONTENTS 명대사를 연습해보세요.",
		},
		{
			category: "ARTIST",
			title: "다양한 아티스트",
		  	img: "/asset/images/idol/idol1.png",
			about: "좋아하는 가수의 가사를 연습하며 한국어를 배워보세요.",
		},
	  ];
    
    const handleCardClick = (index:any) => {
      setSelectedCard(selectedCard === index ? null : index);
      };

  return (
    <>
      {/* 그라데이션 적용 */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-purple-600 via-purple-800 to-purple-1000"
        style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
      />

      <div className="flex justify-between">
        <div className="inline-block max-w-lg text-center justify-start">
          <h1 className={title({ color: "violet" })} style={{ fontSize: "2.5rem", position: "relative", zIndex: 1 }}>K-POP</h1>
          <h1 className={title()} style={{ fontSize: "2.5rem", position: "relative", zIndex: 1 }}>과&nbsp;</h1>
          <h1 className={title({ color: "violet" })} style={{ fontSize: "2.5rem", position: "relative", zIndex: 1 }}>K-CONTENTS</h1>
          <h1 className={title()} style={{fontSize: "2.5rem", position: "relative", zIndex: 1}}>를&nbsp;</h1>
          <br/>
          <h1 className={title()} style={{fontSize: "2.5rem", position: "relative", zIndex: 1}}>따라하고&nbsp;</h1>
          <br/>
          <h1 className={title()} style={{fontSize: "2.5rem", position: "relative", zIndex: 1}}>나만의&nbsp;</h1>
          <h1 className={title({color: "violet"})} style={{fontSize: "2.5rem", position: "relative", zIndex: 1}}>SHORTS</h1>
          <h1 className={title()} style={{fontSize: "2.5rem", position: "relative", zIndex: 1}}>를&nbsp;</h1>
          <br/>
          <h1 className={title()} style={{fontSize: "2.5rem", position: "relative", zIndex: 1}}>제작해보세요.&nbsp;</h1>
          <h2 className={subtitle({class: "mt-4"})}style={{fontSize: "0.7rem"}}>
              로맨스, 사극, 판타지 등 다양한 테마별로 30,000개 이상의 K-CONTENTS 명대사를 연습해보세요.<br/>
              방탄소년단, 블랙핑크, 뉴진스 등 좋아하는 K-POP 가수의 노래 가사를 연습해보세요.<br/>
              회원 가입을 하고 나의 발음 분석 및 AI 레포트를 받아보세요.
          </h2>
        </div>

        <div className="inline-block">
          <Image
            isBlurred
            src="/asset/images/index.png"
            alt="Index Image"
            style={{ width: '440px', height: '300px', marginRight: '140px'}}
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-16 w-full">
        <Link isBlock showAnchorIcon href="/learn" color="foreground">
          <div className={card()} style={{ borderRadius: '20px', marginLeft: '10px', marginRight: '10px' }}>
            <h3 className={cardHeader()} style={{ fontWeight: "bold" }}>발음 교정 서비스</h3>
            <p className={cardBody()}>한국 일상 대화를 배우고 자주 틀리는 한국어 발음을 교정해보세요.</p>
          </div>
        </Link>
        <Link isBlock showAnchorIcon href="/genre" color="foreground">
          <div className={card()} style={{ borderRadius: '20px', marginLeft: '10px', marginRight: '10px' }}>
            <h3 className={cardHeader()} style={{ fontWeight: "bold" }}>명대사 연습</h3>
            <p className={cardBody()}>로맨스, 사극, 판타지 등 다양한 장르의 명대사와 좋아하는 가수의 가사를 연습하며 한국어를 배워보세요.</p>
          </div>
        </Link>
        <Link isBlock showAnchorIcon href="/shorts" color="foreground">
          <div className={card()} style={{ borderRadius: '20px', marginLeft: '10px', marginRight: '10px' }}>
            <h3 className={cardHeader()} style={{ fontWeight: "bold" }}>숏폼 생성</h3>
            <p className={cardBody()}>연습한 가사와 명대사를 숏폼으로 제작하고 친구와 공유해보세요.</p>
          </div>
        </Link>
      </div>

      <div className="max-w-[800px] gap-20 grid grid-cols-12 grid-rows-8 mt-20 px-20 justify-between mx-24">
        {content.map((item, index) => (
          <Card
            key={index}
            isPressable
            onPress={() => handleCardClick(index)}
            className={`col-span-12 sm:col-span-4 h-[300px] ${
              selectedCard === index ? "bg-black text-white" : ""
            }`}
          >
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">{item.category}</p>
              <h4 className="text-white text-large font-bold">{item.title}</h4>
			        {selectedCard === index && (
                <p className="text-center text-base text-purple-200 uppercase py-12 mx-6 tracking-tighter text-shadow-yellow-500">{item.about}</p>
              )}
            </CardHeader>
			      {selectedCard !== index && (
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src={item.img}
              />
            )}
          </Card>
        ))}
      </div>
      <Footer/>
    </>
  );
}
