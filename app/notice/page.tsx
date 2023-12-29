"use client";

import {useContext, useMemo, useState} from "react";
import {
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
    { key: 'comments_count', label: '댓글 수' },
    { key: 'formatted_created_at', label: '작성일' },
    { key: 'formatted_updated_at', label: '수정일' },
  ];

  const rowsPerPage = 10;

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  const loadingState = isLoading || data?.results.length === 0 ? "loading" : "idle";

  return (
      <div className="flex flex-col">
        <div className="text-3xl font-bold primary text-center py-5">
          <p>공지 및 문의게시판</p>
        </div>
        <Table
            className="flex w-full text-center"
            aria-label="공지 및 문의게시판"
            bottomContent={
              pages > 0 ? (
                  <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
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
                <TableColumn className="text-center" key={column.key}>
                  {column.label}
                </TableColumn>
            ))}
          </TableHeader>
          <TableBody items={data?.results ?? []} loadingContent={<Spinner />} loadingState={loadingState}>
            {(item: ItemType) => (
                <TableRow key={item.title}>
                  {(columnKey) => {
                    let value = getKeyValue(item, columnKey);
                    const attr = item.is_admin ? "font-bold" : "";
                    if (columnKey == 'title') {
                      if (item.is_admin) {
                        value = '[공지] ' + value
                      }
                      return (
                          <TableCell className={attr + ""}>
                            <Link href={`/notice/${item.id}`}>
                              <a>{value}</a>
                            </Link>
                          </TableCell>
                      );
                    }
                    if (columnKey == 'writer' && item.is_admin) {
                      value = '[관리자] ' + value
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