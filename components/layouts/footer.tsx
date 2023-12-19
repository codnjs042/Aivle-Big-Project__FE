import {Link} from "@nextui-org/link";
import {Chip} from "@nextui-org/react";
import TermsModal from "../modals/terms";

export default function FooterLayout() {
  return (
      <footer className="w-full flex items-center justify-around py-3">
        <TermsModal/>
        <Chip>@ AivleSchool 4기 21조.    All rights reserved.</Chip>
        <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
            title="nextui.org homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">NextUI</p>
        </Link>
      </footer>
  );
}