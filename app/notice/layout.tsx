import React from "react";

export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10" >
			<div className="inline-block max-w-full text-start justify-center" style={{ width: '2000px' }}>
				{children}
			</div>
		</section>
	);
}