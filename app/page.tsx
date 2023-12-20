import {card, cardBody, cardHeader, subtitle, title} from "@/components/primitives";
import {Image, Link} from "@nextui-org/react";
import Footer from "@/components/layouts/footer";

export default function Home() {
  return (
      <>
        {/* 그라데이션 적용 */}
        <div
            className="absolute inset-0 bg-gradient-to-b from-purple-600 via-purple-800 to-purple-1000"
            style={{clipPath: 'polygon(100% 0, 0 100%, 100% 100%)'}}/>

        <section className="flex flex-grow flex-col items-start justify-center">
          <div className="inline-block max-w-lg text-center justify-center">
            <h1 className={title({color: "violet"})}
                style={{fontSize: "2.5rem", position: "relative", zIndex: 1}}>K-POP</h1>
            <h1 className={title()}
                style={{fontSize: "2.5rem", position: "relative", zIndex: 1}}>과&nbsp;</h1>
            <h1 className={title({color: "violet"})}
                style={{fontSize: "2.5rem", position: "relative", zIndex: 1}}>K-CONTENTS</h1>
            <h1 className={title()}
                style={{fontSize: "2.5rem", position: "relative", zIndex: 1}}>를&nbsp;</h1>
            <br/>
            <h1 className={title()}
                style={{fontSize: "2.5rem", position: "relative", zIndex: 1}}>따라하고&nbsp;</h1>
            <br/>
            <h1 className={title()}
                style={{fontSize: "2.5rem", position: "relative", zIndex: 1}}>나만의&nbsp;</h1>
            <h1 className={title({color: "violet"})}
                style={{fontSize: "2.5rem", position: "relative", zIndex: 1}}>SHORTS</h1>
            <h1 className={title()}
                style={{fontSize: "2.5rem", position: "relative", zIndex: 1}}>를&nbsp;</h1>
            <br/>
            <h1 className={title()}
                style={{fontSize: "2.5rem", position: "relative", zIndex: 1}}>제작해보세요.&nbsp;</h1>
            <h2 className={subtitle({class: "mt-4"})}
                style={{fontSize: "0.7rem"}}>
              로맨스, 사극, 판타지 등 다양한 테마별로 30,000개 이상의 K-CONTENTS 명대사를 연습해보세요.<br/>
              방탄소년단, 블랙핑크, 뉴진스 등 좋아하는 K-POP 가수의 노래 가사를 연습해보세요.
            </h2>
          </div>
          <div style={{position: "absolute", right: 250, top: 30}}>
            <Image
                isZoomed
                isBlurred
                width={500}
                src="/asset/images/contents.png"
                alt="Index Image"
                style={{width: "500px", height: "350px", marginTop: "10px"}}/>
          </div>
          {/* 수정중 */}
          {/* <div className="max-w-[900px] gap-20 grid grid-cols-12 grid-rows-3 px-8 mt-12">
          <Card className="col-span-12 sm:col-span-4 h-[250px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-center">
              <h4 className="text-white font-medium text-large">발음 교정 서비스</h4>
              <p className="text-tiny text-white/60 uppercase font-bold">한국 일상 대화를 배우고 자주 틀리는 한국어 발음을 교정해보세요.</p>
            </CardHeader>
            
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="/images/card-example-4.jpeg"
            />
          </Card>
          <Card className="col-span-12 sm:col-span-4 h-[250px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-center">
              <h4 className="text-white font-medium text-large">명대사 연습</h4>
              <p className="text-tiny text-white/60 uppercase font-bold">로맨스, 사극, 판타지 등 다양한 장르의 명대사와 좋아하는 가수의 가사를 연습하며 한국어를
                        배워보세요.</p>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="/images/card-example-3.jpeg"
            />
          </Card>
          <Card className="col-span-12 sm:col-span-4 h-[250px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-center">
              <h4 className="text-white font-medium text-large">숏폼 생성</h4>
              <p className="text-tiny text-white/60 uppercase font-bold">연습한 가사와 명대사를 숏폼으로 제작하고 친구와 공유해보세요.</p>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="\asset\images\shorts.png"
            />
          </Card>
          </div> */}

          <div className="flex justify-between mt-12 w-full">
            <Link isBlock showAnchorIcon href="/learn" color="foreground">
              <div className={card()}
                   style={{borderRadius: '20px', marginLeft: '10px', marginRight: '10px'}}>
                <h3 className={cardHeader()} style={{fontWeight: "bold"}}>발음 교정 서비스</h3>
                <p className={cardBody()}>한국 일상 대화를 배우고 자주 틀리는 한국어 발음을 교정해보세요.</p>
              </div>
            </Link>
            <Link isBlock showAnchorIcon href="/culture" color="foreground">
              <div className={card()}
                   style={{borderRadius: '20px', marginLeft: '10px', marginRight: '10px'}}>
                <h3 className={cardHeader()} style={{fontWeight: "bold"}}>명대사 연습</h3>
                <p className={cardBody()}>로맨스, 사극, 판타지 등 다양한 장르의 명대사와 좋아하는 가수의 가사를 연습하며 한국어를
                  배워보세요.</p>
              </div>
            </Link>
            <Link isBlock showAnchorIcon href="/shorts" color="foreground">
              <div className={card()}
                   style={{borderRadius: '20px', marginLeft: '10px', marginRight: '10px'}}>
                <h3 className={cardHeader()} style={{fontWeight: "bold"}}>숏폼 생성</h3>
                <p className={cardBody()}>연습한 가사와 명대사를 숏폼으로 제작하고 친구와 공유해보세요.</p>
              </div>
            </Link>
          </div>
        </section>
        <Footer/>
      </>
  );
}

