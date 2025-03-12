'use client';
import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import type { ThemeProviderProps } from 'next-themes';
import { ClerkProvider } from '@clerk/nextjs';



export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>[ 'push' ]>[ 1 ]
    >;
  }
}

export function Providers( { children, themeProps }: ProvidersProps ) {

  const router = useRouter();
  const pathname = usePathname();

  React.useEffect( () => {
    window.scrollTo( 0, 0 );
  }, [ pathname ] );

  return (
    <NextUIProvider navigate={ router.push }>
      <NextThemesProvider { ...themeProps }>
        <ClerkProvider>
          { children }
        </ClerkProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}