"use client"

import {siteConfig} from "@/config/site";
import {NavbarItem} from "@nextui-org/navbar";
import NextLink from "next/link";
import clsx from "clsx";
import { link as linkStyles } from "@nextui-org/theme";
import { usePathname } from 'next/navigation'

export default function NavMenu() {
  const pathname = usePathname()
  return (
      <ul className="hidden lg:flex gap-4 justify-start ml-2">
        {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                  className={clsx(
                      linkStyles({color: "foreground"}),
                      pathname === item.href ? "font-bold text-secondary-400" : "",
                      "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
        ))}
      </ul>
  );
}