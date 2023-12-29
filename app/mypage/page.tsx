"use client";

import React, {useContext, useEffect, useMemo, useState} from "react";
import {useRouter} from 'next/navigation';
import AuthContext from "@/context/AuthContext";
export default function MyPage() {
  const router = useRouter();
  const auth = useContext(AuthContext);

}