import React from "react";

export default function MyPageLayout({children,}: {
  children: React.ReactNode;
}) {
  return (
      <section className="flex flex-col items-center justify-center">
        <div className="inline-block max-w-lg"
             style={{minWidth: "600px"}}>
          {children}
        </div>
      </section>
  );
}