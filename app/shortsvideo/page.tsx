"use client";

import {useContext, useEffect, useMemo, useState, useRef} from "react";
import {
  Button,
  getKeyValue, Link,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import useSWR from 'swr';
import {backendConfig} from "@/api/apiconfig";
import AuthContext from "@/context/AuthContext";
import {postListFetch} from "@/api/shortsvideo/postList";
import NeedLogin from "@/components/layouts/needLogin";
import ReactPlayer from "react-player";

interface VideoType {
  id: number;
  title: string;
  file_path: string;
}

export default function ShortsvideoPage() {
  const [page, setPage] = useState(1);
  const auth = useContext(AuthContext);
  const [mounted, setMounted] = useState<boolean>(false);

  const wrapper = (url: string) => postListFetch(auth.access, auth.setAccess).then((res) => res.json());

  const {data, isLoading} = useSWR(`${backendConfig.serverUrl}/api/shorts/?page=${page}`, wrapper, {
    keepPreviousData: true,
  });

  const columns = [
    { key: 'title', label: '제목' },
    { key: 'author_name', label: '작성자' },
    { key: 'view', label: '조회수' },
    { key: 'created_at', label: '작성일' },
  ];

  const rowsPerPage = 10;

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  const loadingState = isLoading || (data?.results?.length ?? 0) === 0 ? "loading" : "idle";
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!auth.login) {
    return (
        <NeedLogin />
    );
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const videoId = Date.now();
      const videoBlobUrl = URL.createObjectURL(selectedFile);
      const videoTitle = selectedFile.name;
      // 여기에서 서버로 업로드할 수 있도록 API 호출이나 상태 업데이트 등이 필요합니다.
    }
  };



  return (mounted&&(
    <div className="flex flex-col">
      <div className="text-3xl font-bold primary text-center py-5">
        <p>쇼츠 게시판</p>
      </div>
      <div className="text-3xl font-bold primary text-end py-5">
        <Button
          isIconOnly
          className="w-20 item-center mt-3"
          color="secondary"
          variant="ghost"
          onClick={handleUploadClick}
        >
          업로드
        </Button>
        <Button
          isIconOnly
          className="w-20 item-center mt-3 ml-2"
          color="secondary"
          variant="ghost"
          onClick={handleUploadClick}
        >
          삭제
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Table
          className="flex w-full text-center"
          aria-label="쇼츠 게시판"
          bottomContent={
            pages > 0 ? (
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            ) : null
          }
        >
          <TableHeader>
            {columns.map((column) => (
              <TableColumn className="text-sm text-center" key={column.key}>
                {column.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody items={data?.results ?? []} loadingContent={<Spinner />} loadingState={loadingState}>
  {(item: VideoType) => (
    <TableRow key={item.id}>
      {columns.map((column) => {
        const columnKey = column.key as keyof VideoType;
        let value = item[columnKey];
        return (
          <TableCell key={columnKey}>
            {columnKey === 'title' ? (
              <Link href={`/shortsvideo/post?id=${item.id}`} className="text-white-500">
                {value}
              </Link>
            ) : (
              value
            )}
          </TableCell>
        );
      })}
    </TableRow>
  )}
</TableBody>
        </Table>
      </div>
    </div>
  ));
}