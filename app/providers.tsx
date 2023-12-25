"use client";

import * as React from "react";
import {NextUIProvider} from "@nextui-org/system";
import {useRouter} from 'next/navigation'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {ThemeProviderProps} from "next-themes/dist/types";
import AuthProvider from "@/context/AuthProvider";
import {ReCaptchaProvider} from "next-recaptcha-v3";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({children, themeProps}: ProvidersProps) {
  const router = useRouter();

  return (
      <ReCaptchaProvider reCaptchaKey="6Le2ezspAAAAAJ6dLjdZNw9ypPA7NYtAES1a0CBv" useEnterprise>
        <AuthProvider>
          <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </NextUIProvider>
        </AuthProvider>
      </ReCaptchaProvider>
  );
}
