import React from "react";

export default function CultureLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-start justify-start gap-4 py-8 md:py-10">
			<div className="flex inline-block max-w-lg text-center justify-center">
				{children}
			</div>
		</section>
		
	);
}
