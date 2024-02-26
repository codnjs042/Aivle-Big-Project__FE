"use client";

import React, {useContext, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import AuthContext from "@/context/AuthContext";
import NeedLogin from "@/components/layouts/needLogin";
import {postFetch} from "@/api/shortsvideo/post";
import {viewpostFetch} from "@/api/shortsvideo/viewpost";
export default function PostPage() {
  const auth = useContext(AuthContext);
  const query = useSearchParams().get('id');
  const [id, setId] = useState(query ? parseInt(query, 10) : 0);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [videoPath, setVideoPath] = useState<string>('');

  const data =

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await postFetch(auth.access, auth.setAccess, id);
        const data = await response.json();
        const response2 = await viewpostFetch(auth.access, auth.setAccess, data.file_path);
        const videoUrl = URL.createObjectURL(await response2!.blob());
        setVideoPath(videoUrl);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
    setLoading(false);
  }, [id]);

  if (!auth.login) {
    return (
        <NeedLogin/>
    );
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {videoPath && ( // 동영상 데이터가 있을 경우에만 출력
            <video controls>
              <source src={videoPath} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
    </div>
  );
}