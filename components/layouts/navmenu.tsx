"use client";

import NextLink from "next/link";
import {usePathname, useRouter} from 'next/navigation'
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {ChevronDownIcon} from "@/components/icons";

export default function NavMenu() {
  const pathname = usePathname()

  const isMenuSelected = (menuPath: string) => {
    return pathname === menuPath;
  };

  return (
      <div className="flex gap-4 justify-start mt-1 ml-2">
        <Dropdown backdrop="blur">
          <DropdownTrigger>
          <Button
              className={`h-6 pr-2 text-small ${isMenuSelected("/about") || isMenuSelected("/notice") ? "text-purple-500" : ""}`}
              endContent={<ChevronDownIcon className="text-default-500" />}
              radius="full"
              size="sm"
              variant="light"
            >
              서비스 소개
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Static Actions">
            <DropdownItem key="intro">
              <NextLink href="/about" className="flex">
                서비스 소개
              </NextLink>
            </DropdownItem>
          <DropdownItem key="notice">
            <NextLink href="/notice"
              className="flex">
                공지사항
            </NextLink>
          </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* 발음 교정 서비스 Dropdown */}
        <Dropdown backdrop="blur">
          <DropdownTrigger>
          <Button
              className={`h-6 pr-2 text-small ${isMenuSelected("/learn") ? "text-purple-500" : ""}`}
              endContent={<ChevronDownIcon className="text-default-500" />}
              radius="full"
              size="sm"
              variant="light"
            >
              발음 교정 서비스
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Pronunciation Correction Actions">
            <DropdownItem key="practice">
              <NextLink href="/learn" className="flex">
                발음 연습
              </NextLink>
            </DropdownItem>
            <DropdownItem key="test">
              <NextLink href="/learn" className="flex">
                발음 평가
              </NextLink>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown backdrop="blur">
          <DropdownTrigger>
          <Button
              className={`h-6 pr-2 text-small ${isMenuSelected("/genre") || isMenuSelected("/artist") || isMenuSelected("/practice") || isMenuSelected("/lyrics") ? "text-purple-500" : ""}`}
              endContent={<ChevronDownIcon className="text-default-500" />}
              radius="full"
              size="sm"
              variant="light"
            >
              K-CULTURE
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Culture Actions">
            <DropdownItem key="artist">
              <NextLink href="/artist"
                className="flex">
                K-POP
              </NextLink>
            </DropdownItem>
            <DropdownItem key="contents">
              <NextLink href="/genre"
                className="flex">
                  K-CONTENTS
              </NextLink>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown backdrop="blur">
          <DropdownTrigger>
          <Button
              className={`h-6 pr-2 text-small ${isMenuSelected("/shorts") || isMenuSelected("/myshorts") || isMenuSelected("/shortsvideo") ? "text-purple-500" : ""}`}
              endContent={<ChevronDownIcon className="text-default-500" />}
              radius="full"
              size="sm"
              variant="light"
            >
              SHORTS
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Shorts Actions">
            <DropdownItem key="watch">
              <NextLink href="/shortsvideo"
                className="flex">
                쇼츠 게시판
              </NextLink>
              </DropdownItem>
            <DropdownItem key="generate">
              <NextLink href="/shorts"
                className="flex">
                쇼츠 제작
              </NextLink>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
  );
}