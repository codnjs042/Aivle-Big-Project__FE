"use client";

import NextLink from "next/link";
import {usePathname, useRouter} from 'next/navigation'
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {info} from "@/api/user/info";
import Cookies from "js-cookie";
import {refresh} from "@/api/user/refresh";

export default function NavMenu() {
  const pathname = usePathname()

  return (
      <div className="flex gap-4 justify-start ml-2">
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button variant="bordered">
              서비스 소개
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Static Actions">
            <DropdownItem key="intro"><NextLink href="/about" className="flex">서비스
              소개</NextLink></DropdownItem>
            <DropdownItem key="notice"><NextLink href="/notice"
                                                 className="flex">공지사항</NextLink></DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* 발음 교정 서비스 Dropdown */}
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button variant="ghost">
              발음 교정 서비스
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Pronunciation Correction Actions">
            <DropdownItem key="practice"><NextLink href="/learn" className="flex">발음
              연습</NextLink></DropdownItem>
            <DropdownItem key="test"><NextLink href="/learn" className="flex">발음
              평가</NextLink></DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button variant="bordered">
              K-CULTURE
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Culture Actions">
            <DropdownItem key="artist"><NextLink href="/artist"
                                                 className="flex">K-POP</NextLink></DropdownItem>
            <DropdownItem key="contents"><NextLink href="/genre"
                                                   className="flex">K-CONTENTS</NextLink></DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button variant="bordered">
              SHORTS
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Shorts Actions">
            <DropdownItem key="watch"><NextLink href="/shorts"
                                                className="flex">쇼츠 게시판</NextLink></DropdownItem>
            <DropdownItem key="generate"><NextLink href="/myshorts"
                                                   className="flex">쇼츠 제작</NextLink></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
  );
}

// return (
//   <ul className="hidden lg:flex gap-4 justify-start ml-2">
//     {siteConfig.navItems.map((item) => (
//         <NavbarItem key={item.href}>
//           <NextLink
//               className={clsx(
//                   linkStyles({color: "foreground"}),
//                   pathname === item.href ? "font-bold text-secondary-400" : "",
//                   "data-[active=true]:text-primary data-[active=true]:font-medium"
//               )}
//               color="foreground"
//               href={item.href}
//           >
//             {item.label}
//           </NextLink>
//         </NavbarItem>
//     ))}
//   </ul>
// );