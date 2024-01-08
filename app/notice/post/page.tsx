"use client";

import React, {useContext, useState} from "react";
import {useSearchParams} from "next/navigation";
import AuthContext from "@/context/AuthContext";
import {Button, Textarea} from "@nextui-org/react";
import Link from "next/link";
import {EditIcon} from "@nextui-org/shared-icons";

export default function PostPage() {
  const auth = useContext(AuthContext);
  const query = useSearchParams().get('id');
  const [id, setId] = useState(query ? parseInt(query, 10) : 0);
  const [comment, setComment] = useState<{ [key: number]: string }>({});
  const [commentSetting, setCommentSetting] = useState<{ [key: number]: boolean }>({});

  return (
      <>
        <div
            className="flex flex-col items-center justify-center gap-4 text-3xl font-bold primary text-center py-10">
          <Textarea
              className="w-3/4 placeholder-gray-300 rounded-md focus:outline-none focus:bg-white"
              label="제목"
              labelPlacement="outside"
              maxRows={1}
              size="lg"
          />
          <Textarea
              className="w-3/4 placeholder-gray-300 rounded-md focus:outline-none focus:bg-white"
              label="내용"
              labelPlacement="outside"
              minRows={10}
              maxRows={10}
              size="lg"
          />
          <div className="flex flex-col w-3/4">
            {[
              {id: 1, author: 'hwcho123', text: 'This is a comment.'},
              {id: 2, author: 'User2', text: 'This is another comment.'},
              // ...
            ].map((comment) => (
                <div className="flex flex-w justify-between items-center gap-5 py-5">
                  <Textarea
                      key={comment.id}
                      label={comment.author}
                      minRows={1}
                      maxRows={1}
                      size="lg"
                      defaultValue={comment.text}
                      endContent={
                        auth.login && auth.user?.nickname === comment.author
                            ? (
                                <EditIcon
                                    className="text-2xl"
                                    onClick={() => {
                                      setComment({
                                        ...comment,
                                        [comment.id]: comment.text
                                      });
                                      setCommentSetting({
                                        ...commentSetting,
                                        [comment.id]: !commentSetting[comment.id]
                                      });
                                    }}
                                />
                            )
                            : null
                      }
                      readOnly={!commentSetting[comment.id]}
                  />
                  {commentSetting[comment.id] && (
                      <div className="flex gap-5">
                        <Button color="warning">
                          수정
                        </Button>
                        <Button color="danger">
                          삭제
                        </Button>
                      </div>
                  )}
                </div>
            ))}
          </div>
          <div className="flex w-full justify-around">
            <Link href="/notice">
              <Button color="secondary">이전 글</Button>
            </Link>
            <Link href="/notice">
              <Button color="secondary">목록으로</Button>
            </Link>
            <Link href="/notice">
              <Button color="secondary">다음 글</Button>
            </Link>
          </div>
        </div>
      </>
  );

}