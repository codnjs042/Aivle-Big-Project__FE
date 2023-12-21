export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "study korean with k-contents",
	description: "study korean with k-contents",
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
      label: "K-culture",
      href: "/culture/artist",
    },
    {
      label: "shorts",
      href: "/shorts",
    },
	],

};
