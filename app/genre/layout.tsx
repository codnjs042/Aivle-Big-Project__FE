import React from "react";

export default function GenreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="max-w-4xl">
        {children}
      </div>
    </section>
  );
}

