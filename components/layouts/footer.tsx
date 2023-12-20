import {Link} from "@nextui-org/link";
import TermOfUse from "../modals/termOfUse";
import PrivacyPolicy from "../modals/privacyPolicy";
import {Chip} from "@nextui-org/chip";

export default function Footer() {
  return (
      <footer className="w-full items-center justify-between py-5">
        <div className="flex flex-row">
          <PrivacyPolicy/>
          <TermOfUse/>
        </div>
        <Chip className="flex items-center gap-1 text-base "style={{ background: 'none' }}>
          <span className="text-default-600">© 2023 AivleSchool 4기 21조. <strong>All rights
            reserved.</strong></span>
        </Chip>
        <Chip className="flex flex-row gap-1" style={{ background: 'none' }}>
          <Link
              isExternal
              className="flex items-center gap-1 text-current"
              href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
              title="nextui.org homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-secondary">NextUI</p>
          </Link>
        </Chip>
      </footer>
  );
}