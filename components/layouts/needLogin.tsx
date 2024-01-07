import React from "react";
import {Button} from "@nextui-org/react";

export default needLogin() => {
  return (
      <div className="text-3xl font-bold primary text-center">
        <p>로그인이 필요합니다.</p>
        <Button>
          <Link a="login">
            <a>
              <p>로그인으로 이동</p>
            </a>
          </Link>
        </Button>
      </div>
  );
}