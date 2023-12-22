"use client";
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { title } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div>
    <h1 className="text-xl text-center" style={{ fontWeight: "bold" }}>NOTICE</h1>

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
  );
}