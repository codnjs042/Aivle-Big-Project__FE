"use client";

import {useContext, useMemo, useState} from "react";
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
import {postListFetch} from "@/api/notice/postList";
interface ItemType {
  id: number;
  title: string;
  writer: string;
  is_admin: boolean;
  comments_count: number;
  formatted_created_at: string;
  formatted_updated_at: string;
}

export default function AboutPage() {
  const [page, setPage] = useState(1);
  const auth = useContext(AuthContext);
  const wrapper = (url: string) => postListFetch(auth.access, auth.setAccess).then((res) => res.json());

  const {data, isLoading} = useSWR(`${backendConfig.serverUrl}/api/introduce/post/?page=${page}`, wrapper, {
    keepPreviousData: true,
  });

  const columns = [
    { key: 'title', label: '제목' },
    { key: 'writer', label: '작성자' },
    { key: 'comments_count', label: '댓글' },
    { key: 'formatted_updated_at', label: '최종 수정일' },
  ];

  const rowsPerPage = 10;

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  const loadingState = isLoading || data?.results.length === 0 ? "loading" : "idle";

  return (
      <div className="flex flex-col">
        <div className="text-3xl font-bold primary text-center py-5">
          <p>서비스 공지 및 문의</p>
        </div>
        <div className="text-3xl font-bold primary text-end py-5">
        <button>
            <Link href="/notice/write">
            <Button
              isIconOnly
              className="w-20 item-center mt-3"
              color="secondary" 
              variant="ghost"
              >
              글 생성
            </Button>
            </Link>
            <Button
              isIconOnly
              className="w-20 item-center mt-3 ml-3"
              color="secondary" 
              variant="ghost"
              >
              글 삭제
            </Button>
          </button>
        </div>
        <Table
            className="flex w-full text-center"
            aria-label="서비스 공지 및 문의"
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
                <TableColumn className="text-md text-center" key={column.key}>
                  {column.label}
                </TableColumn>
            ))}
          </TableHeader>
          <TableBody items={data?.results ?? []} loadingContent={<Spinner />} loadingState={loadingState}>
            {(item: ItemType) => (
                <TableRow key={item.id}>
                  {(columnKey) => {
                    let value = getKeyValue(item, columnKey);
                    const attr = item.is_admin ? "font-bold" : "";
                    if (columnKey == 'title') {
                      if (item.is_admin) {
                        value = <><span style={{ marginRight: '1em' }}>📢</span>{value}</>;
                      }
                      return (
                          <TableCell className={attr + ""}>
                            <Link href={`/notice/post?id=${item.id}`} className="text-white-500">
                              {value}
                            </Link>
                          </TableCell>
                      );
                    }
                    if (columnKey == 'writer' && item.is_admin) {
                      value = <><span style={{ marginRight: '1em' }}>👑</span>{value}</>;
                    }
                    return <TableCell className={attr}>{value}</TableCell>;
                  }}
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
  );
}