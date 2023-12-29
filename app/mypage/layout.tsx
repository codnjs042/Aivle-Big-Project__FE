import React from "react";

export default function MyPageLayout({children,}: {
  children: React.ReactNode;
}) {
  return (
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg"
             style={{width: "400px"}}>
          {children}
        </div>
      </section>
  );
}