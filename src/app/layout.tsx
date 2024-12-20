import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';

// eslint-disable-next-line import/no-unresolved
import bg from '@/assets/images/bg.svg';
import { Suspense } from 'react';
import AppWalletProvider from './providers/wallet-provider';

const SilkScreen = localFont({
  src: [
    {
      path: './fonts/Silkscreen-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Silkscreen-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-silk-screen',
});

const Junkyardcalibo = localFont({
  src: './fonts/JunkyardCalibo.ttf',
  variable: '--font-junkyard-calibo',
  weight: '400',
});

// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

export const metadata: Metadata = {
  title: 'Forge World with Vulcan AI',
  description:
    'Welcome to Vulcan AI – the eternal flame of creation, where the limitless power of the universe is shaped and reborn from the fires of myth.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${SilkScreen.variable} ${Junkyardcalibo.variable} relative cursor-default antialiased`}
      >
        <Image
          src={bg}
          alt="bg"
          priority
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="z-0 select-none"
        />
        <AppWalletProvider>
          <Suspense fallback={<div></div>}>{children}</Suspense>
        </AppWalletProvider>
        <Toaster />
      </body>
    </html>
  );
}
