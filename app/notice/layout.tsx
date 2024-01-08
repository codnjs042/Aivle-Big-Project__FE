import React from "react";

export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col justify-center" >
			<div className="w-full" style={{minWidth: "800px"}}>
				{children}
			</div>
		</section>
	);
}
