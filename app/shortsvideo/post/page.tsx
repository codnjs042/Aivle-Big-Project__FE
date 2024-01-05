"use client";

import React, {useContext, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import AuthContext from "@/context/AuthContext";

export default function PostPage() {
  const auth = useContext(AuthContext);
  const query = useSearchParams().get('id');
  const [id, setId] = useState(query ? parseInt(query, 10) : 0);
  const data =

  useEffect(() => {
  }, [id]);

  return (
    <div>
      헬
    </div>
  );
}