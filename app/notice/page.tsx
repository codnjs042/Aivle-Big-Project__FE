"use client";
import React from "react";
import {usePagination, PaginationItemType} from "@nextui-org/react";
import {ChevronIcon} from "@/components/icons";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { title } from "@/components/primitives";
import cn from 'classnames';

export default function AboutPage() {
  const {activePage, range, setPage, onNext, onPrevious} = usePagination({
    total: 6,
    showControls: true,
    siblings: 10,
    boundaries: 10,
  });
  return (

    <div className="flex flex-col gap-2">

    {activePage === 1 && (
        <div>
          <h1 className="text-xl text-center" style={{ fontWeight: "bold" }}>
            NOTICE
          </h1>
          <Table removeWrapper aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>No</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>Date</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>1</TableCell>
              <TableCell>안녕하세요</TableCell>
              <TableCell>user</TableCell>
              <TableCell>2023-12-14</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>2</TableCell>
              <TableCell>공지사항입니다.</TableCell>
              <TableCell>user</TableCell>
              <TableCell>2023-12-15</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>3</TableCell>
              <TableCell>Hello</TableCell>
              <TableCell>user</TableCell>
              <TableCell>2023-12-16</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>4</TableCell>
              <TableCell>Notice</TableCell>
              <TableCell>user</TableCell>
              <TableCell>2023-12-17</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </div>
      )}

      {/* <p>Active page: {activePage}</p>
      <ul className="flex gap-2 items-center">
        {range.map((page) => {
          if (page === PaginationItemType.NEXT) {
            return (
              <li key={page} aria-label="next page" className="w-4 h-4">
                <button
                  className="w-full h-full bg-default-200 rounded-full"
                  onClick={onNext}
                >
                  <ChevronIcon className="rotate-180" />
                </button>
              </li>
            );
          }
          
          if (page === PaginationItemType.PREV) {
            return (
              <li key={page} aria-label="previous page" className="w-4 h-4">
                <button
                  className="w-full h-full bg-default-200 rounded-full"
                  onClick={onPrevious}
                >
                  <ChevronIcon />
                </button>
              </li>
            );
          }

          if (page === PaginationItemType.DOTS) {
            return (
              <li key={page} className="w-4 h-4">
                ...
              </li>
            );
          }

          return (
            <li key={page} aria-label={`page ${page}`} className="w-4 h-4">
              <button
                className={cn(
                  "w-full h-full bg-default-300 rounded-full",
                  activePage === page && "bg-secondary"
                )}
                onClick={() => setPage(page)}
              />
            </li>
          );
        })}
      </ul> */}

    </div>

  );
}