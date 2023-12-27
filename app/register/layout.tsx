import React from "react";

export default function RegisterLayout({children,}: {
  children: React.ReactNode;
}) {
  return (
      <section className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-4 p-10 rounded-lg shadow-lg overflow-auto"
        style={{width: "480px"}}>
          {children}
        </div>
      </section>
  );
}