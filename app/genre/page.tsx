import { title } from "@/components/primitives";
import {Card, CardHeader, CardBody, CardFooter, Image, Link} from "@nextui-org/react";
import {usePagination, PaginationItemType} from "@nextui-org/react";

export default function GenrePage() {

	return (
		<div>
		<h1 className={title()}>장르를 선택하세요!</h1>
	</div>
	);
}