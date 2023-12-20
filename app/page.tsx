import {subtitle, title} from "@/components/primitives";

export default function Home() {
	return (
			<section className="flex flex-col items-start justify-center">
			<div className="relative overflow-hidden w-full h-60">
			<img
				src="/contents.jpg"
				alt="Your Alt Text"
				className="absolute w-full h-full object-cover"
			/>
			<div className="absolute top-1/2 transform -translate-y-1/2 text-white text-center z-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title({ color: "violet" })}
				style={{ fontSize: "2.5rem" }}>K-POP</h1>
				<h1 className={title()}
				style={{ fontSize: "2.5rem" }}>과&nbsp;</h1>
				<h1 className={title({ color: "violet" })}
				style={{ fontSize: "2.5rem" }}>K-CONTENTS</h1>
				<h1 className={title()}
				style={{ fontSize: "2.5rem" }}>를&nbsp;</h1>
				<br />
				<h1 className={title()}
				style={{ fontSize: "2.5rem" }}>따라하고&nbsp;</h1>
				<br />
				<h1 className={title()}
				style={{ fontSize: "2.5rem" }}>나만의&nbsp;</h1>
				<h1 className={title({ color: "violet" })}
				style={{ fontSize: "2.5rem" }}>SHORTS</h1>
				<h1 className={title()}
				style={{ fontSize: "2.5rem" }}>를&nbsp;</h1>
				<br />
				<h1 className={title()}
				style={{ fontSize: "2.5rem" }}>제작해보세요.&nbsp;</h1>
				<h2 className={subtitle({ class: "mt-4" })}
				style={{ fontSize: "0.7rem" }}>
				로맨스, 사극, 판타지 등 다양한 테마별로 30,000개 이상의 K-콘텐츠 명대사를 연습해보세요.<br />
				방탄소년단, 블랙핑크, 뉴진스 등 좋아하는 가수의 노래 가사를 연습해보세요.
				</h2>
			</div>
			</div>
		</div>
		

			<div className="flex justify-between mt-12 w-full">
			<div className="text-center p-4">
				<h3 style={{ fontWeight: "bold" }}>발음 교정 서비스</h3>
				<p>한국 일상 대화를 배우고 자주 틀리는 한국어 발음을 교정해보세요.</p>
			</div>
			<div className="text-center p-4">
				<h3 style={{ fontWeight: "bold" }}>명대사 연습</h3>
				<p>로맨스, 사극, 판타지 등 다양한 장르의 명대사와 좋아하는 가수의 가사를 연습하며 한국어를 배워보세요.</p>
			</div>
			<div className="text-center p-4">
				<h3 style={{ fontWeight: "bold" }}>숏폼 생성</h3>
				<p>연습한 가사와 명대사를 숏폼으로 제작하고 친구와 공유해보세요.</p>
			</div>
			</div>
		</section>
	);
}
