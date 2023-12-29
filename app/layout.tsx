import "@/styles/globals.css";
import {Metadata, Viewport} from "next";
import {siteConfig} from "@/config/site";
import {fontSans} from "@/config/fonts";
import {Providers} from "./providers";
import {Navigator} from "@/components/layouts/navigator";
import clsx from "clsx";
import {SpeedInsights} from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    {media: "(prefers-color-scheme: light)", color: "white"},
    {media: "(prefers-color-scheme: dark)", color: "black"},
  ],
};

export default function RootLayout({children,}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="ko" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification"
              content="YDJY9wJjgHXHBWClOKak7K70HmqjBoMJHLPZ7YLr1cw"/>
        <title>바름</title>
      </head>
      <body
          className={clsx(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
          )}
      >
      <Providers themeProps={{attribute: "class", defaultTheme: "dark"}}>
        <div className="relative flex flex-col h-screen">
          <Navigator/>
          <main
              className="container mx-auto max-w-7xl pt-10 px-6 flex-grow flex-shrink overflow-y-auto">
            {children}
          </main>
        </div>
      </Providers>
      <SpeedInsights/>
      </body>
      </html>
  );
}
