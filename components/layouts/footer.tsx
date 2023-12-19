import {Link} from "@nextui-org/link";
import {Chip, useDisclosure} from "@nextui-org/react";
import TermsModal from "@/components/modals/terms";

export default function FooterLayout() {

  return (
      <footer className="w-full flex items-center justify-around py-3">
        <div>
          <Chip>이용약관</Chip>

        </div>
        <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
            title="nextui.org homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">NextUI</p>
        </Link>
        <Chip>@ 에이블스쿨 4기 21조. All rights reserved.</Chip>
      </footer>
  );
}