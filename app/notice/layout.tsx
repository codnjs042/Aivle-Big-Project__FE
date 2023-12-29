import React from "react";

export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col justify-center" >
			<div className="inline-block max-w-full text-start justify-center"
					 style={{minWidth: "800px"}}>
				{children}
			</div>
		</section>
	);
}
