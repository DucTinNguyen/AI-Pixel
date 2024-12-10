/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import Image from 'next/image';
import Link from 'next/link';

import docs from '@/assets/images/docs.svg';
import trash from '@/assets/images/trash.svg';
import ui from '@/assets/images/ui.svg';
import x from '@/assets/images/x.svg';
import StyledButton from '@/components/custom-button';

export default function Home() {
  const items = [
    {
      title: 'Trash',
      icon: trash,
      href: '/trash',
    },
    {
      title: 'Docs',
      icon: docs,
      href: '/docs',
    },
    {
      title: 'X',
      icon: x,
      href: '/x',
    },
    {
      title: 'ui genius',
      icon: ui,
      href: '/ui-genius',
    },
  ];

  return (
    <div className="relative z-10 min-h-screen items-center justify-items-center pt-14 font-silkscreen text-lg font-bold">
      <div className="absolute left-[60px] flex flex-col gap-[24.576px]">
        {items.map(item => (
          <Link
            href={item.href}
            key={item.title}
            className="flex flex-col items-center gap-4"
          >
            <Image src={item.icon} alt={item.title} width={90} height={90} />
            <span className="max-w-[90px] text-center">{item.title}</span>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-[60px] z-50 flex w-full justify-center">
        <StyledButton variant="orange">Hello</StyledButton>
      </div>
    </div>
  );
}
