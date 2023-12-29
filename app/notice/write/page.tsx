"use client";

import React, {useContext, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import AuthContext from "@/context/AuthContext";
import Tiptap from "@/components/layouts/tiptap";

interface PostType {
  title: string;
  content: string;
}

export default function WritePage() {
  const auth = useContext(AuthContext);


  return (
      <Tiptap />
  );
}