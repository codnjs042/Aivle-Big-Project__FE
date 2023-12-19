export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "서비스 소개",
			href: "/",
		},
    {
      label: "한국어 학습",
      href: "/learn",
    },
    {
      label: "K-콘텐츠",
      href: "/culture",
    },
    {
      label: "쇼츠",
      href: "/shorts",
    },
	],

};
