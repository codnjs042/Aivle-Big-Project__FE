import {Link} from "@nextui-org/link";
import TermOfUse from "../modals/termOfUse";
import PrivacyPolicy from "../modals/privacyPolicy";

export default function Footer() {
  return (
      <footer className="w-full flex items-center justify-around py-5">
        <div className="flex flex-row gap-1">
          <PrivacyPolicy/>
          <TermOfUse/>
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
        <p>© 2023 AivleSchool 4기 21조. <strong>All rights reserved.</strong></p>
      </footer>
  );
}