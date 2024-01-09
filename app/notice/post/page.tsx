"use client";

import React, {useContext, useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import AuthContext from "@/context/AuthContext";
import {Button, Textarea} from "@nextui-org/react";
import Link from "next/link";
import {EditIcon} from "@nextui-org/shared-icons";
import {postFetch} from "@/api/notice/post";
import NeedLogin from "@/components/layouts/needLogin";
import {postFix} from "@/api/notice/postFix";
import {postDelete} from "@/api/notice/postDelete";

export default function PostPage() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const query = useSearchParams().get('id');
  const [id, setId] = useState(query ? parseInt(query, 10) : 0);

  const [originTitle, setOriginTitle] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [originContent, setOriginContent] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [writer, setWriter] = useState<string>('');
  const [updateDate, setUpdateDate] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<{ [key: number]: string }[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [comment, setComment] = useState<{ [key: number]: string }>({});
  const [commentSetting, setCommentSetting] = useState<{ [key: number]: boolean }>({});

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await postFetch(auth.access, auth.setAccess, id);
        const data = await response.json();
        console.log(data);
        setOriginTitle(data.title);
        setTitle(data.title);
        setOriginContent(data.content);
        setContent(data.content);
        setIsAdmin(data.is_admin)
        setWriter(data.writer);
        setUpdateDate(data.formatted_updated_at);
        setCommentList(data.comments);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
    setLoading(false);
  }, [id]);

  const handlePostFix = async (id: number) => {
    setLoading(true);
    if (!title || !content) {
      setError(true);
    } else {
      setError(false);
      try {
        const response = await postFix(auth.access, auth.setAccess, id, {title, content});
        // if (response.ok) {
        //   router.replace("/notice")
        // }
        setOriginTitle(title);
        setOriginContent(content);
        setEditMode(!editMode);
      } catch (error) {
        alert("글 작성에 문제가 생겼습니다.")
      }
    }
    setLoading(false);
  };

  const handlePostDelete = async (id: number) => {
    setLoading(true);
    try {
      const response = await postDelete(auth.access, auth.setAccess, id);
      if (response.ok) {
        router.replace("/notice")
      }
    } catch (error) {
      alert("글 삭제에 문제가 생겼습니다.")
    }
    setLoading(false);
  };
  const handleCommentFix = (id: number) => async () => {
    setLoading(true);
    setLoading(false);
  };
  const handleCommentDelete = (id: number) => async () => {
    setLoading(true);
    setLoading(false);
  };

  if (!auth.login) {
    return (
        <NeedLogin/>
    );
  }

  return (
      <>
        <div
            className="flex flex-col items-center justify-center gap-4 text-3xl font-bold primary text-center py-10">
          <div className="primary flex w-3/4 justify-between pb-3 gap-5">
            <div className="flex">
              <Link href="/notice">
                <Button color="secondary" isLoading={loading}>목록으로</Button>
              </Link>
            </div>
            <div className="flex gap-5">
              {auth.user?.nickname === writer &&
                  <><Button color="warning" isLoading={loading} onClick={async () => {
                    if (editMode) {
                      if (confirm('게시글을 수정하시겠습니까?')) {
                        await handlePostFix(id);
                      }
                    } else {
                      setEditMode(!editMode);
                    }
                  }}
                  >
                    {editMode ? '수정완료' : '수정하기'}
                  </Button><Button color="danger" isLoading={loading} onClick={async () => {
                    if (editMode) {
                      setEditMode(false);
                      setTitle(originTitle);
                      setContent(originContent);
                    } else {
                      if (confirm('게시글을 삭제하시겠습니까?')) {
                        await handlePostDelete(id);
                      }
                    }
                  }
                  }>
                    {editMode ? '수정취소' : '삭제하기'}
                  </Button></>}
            </div>
          </div>
          <div className="primary flex w-3/4 justify-end text-sm">
            {updateDate}
          </div>
          <div className="primary flex w-3/4 justify-end text-sm">
            {isAdmin ? <><span style={{marginRight: '1em'}}>👑</span>{writer}</> : `${writer}`}
          </div>
          <Textarea
              className="w-3/4 placeholder-gray-300 rounded-md focus:outline-none focus:bg-white"
              label={isAdmin ? <><span style={{marginRight: '1em'}}>📢</span>제목</> : '제목'}
              labelPlacement="outside"
              maxRows={1}
              size="lg"
              value={editMode ? title : originTitle}
              onValueChange={(value) => setTitle(value)}
              isInvalid={editMode && error && !title}
              disabled={!editMode}
          />
          <Textarea
              className="w-3/4 placeholder-gray-300 rounded-md focus:outline-none focus:bg-white"
              label="내용"
              labelPlacement="outside"
              minRows={10}
              maxRows={10}
              size="lg"
              value={editMode ? content : originContent}
              onValueChange={(value) => setContent(value)}
              isInvalid={editMode && error && !content}
              disabled={!editMode}
          />
          <div className="flex flex-col w-3/4">
            {[
              {id: 1, author: 'hwcho123', text: 'This is a comment.', date: '2023-12-31'},
              {id: 2, author: 'User2', text: 'This is another comment.', date: '2024-1-3'},
            ].map((data) => (
                <div key={data.id} className="flex flex-w justify-between items-center gap-5 py-2">
                  <Textarea
                      label={`${data.author} (${data.date})`}
                      minRows={1}
                      maxRows={1}
                      size="lg"
                      value={
                        commentSetting[data.id] ? comment[data.id] : data.text
                      }
                      onValueChange={(value) => {
                        setComment({...comment, [data.id]: value});
                      }}
                      endContent={
                        auth.login && auth.user?.nickname === data.author
                            ? (
                                <EditIcon
                                    className="text-2xl"
                                    onClick={() => {
                                      setComment({...comment, [data.id]: data.text});
                                      setCommentSetting({
                                        ...commentSetting,
                                        [data.id]: !commentSetting[data.id]
                                      });
                                    }}
                                />
                            )
                            : null
                      }
                      readOnly={!commentSetting[data.id]}
                  />
                  {commentSetting[data.id] && (
                      <div className="flex gap-5">
                        <Button color="warning" isLoading={loading}
                                onClick={handleCommentFix(data.id)}>
                          수정
                        </Button>
                        <Button color="danger" isLoading={loading}
                                onClick={handleCommentDelete(data.id)}>
                          삭제
                        </Button>
                      </div>
                  )}
                </div>
            ))}
          </div>
        </div>
      </>
  );

}