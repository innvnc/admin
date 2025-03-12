import type { ReactNode } from 'react';
import clsx from 'clsx';

import '@/styles/globals.css';
import { ibmPlexSans, spaceGrotesk, viewportConfig } from '@/config';
import { Navbar, Footer, Providers, NextIntlProvider } from '@/components';



export const viewport = viewportConfig;

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout( { children }: RootLayoutProps ) {
  return (
    <html
      suppressHydrationWarning
      lang="es"
      className={ `${ spaceGrotesk.variable } ${ ibmPlexSans.variable }` }
    >
      <body className={ clsx( 'layout' ) }>
        <NextIntlProvider>
          <Providers themeProps={ { attribute: 'class', defaultTheme: 'light' } }>

            <div className="layout__container">

              <Navbar />

              <main className="layout__main">
                <div className="layout__content">
                  { children }
                </div>
              </main>

              <Footer />

            </div>
          </Providers>
        </NextIntlProvider>
      </body>

    </html>
  );
}