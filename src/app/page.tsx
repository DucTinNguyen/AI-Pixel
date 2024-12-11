/* eslint-disable prettier/prettier */
/* eslint-disable simple-import-sort/imports */
'use client';
/* eslint-disable import/no-unresolved */

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import docs from '@/assets/images/docs.svg';
import trash from '@/assets/images/trash.svg';
import ui from '@/assets/images/ui.svg';
import x from '@/assets/images/x.svg';
import Laboratory from '@/components/laboratory';
import TabButton from '@/components/tab-button';
import { ContentProps } from '@/types';
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

  const tabs = [
    {
      title: 'Laboratory',
      tabContent: (props: ContentProps) => <Laboratory {...props} />,
      isActive: true,
    },
    {
      title: 'Marketplace',
      tabContent: (props: ContentProps) => (
        <StyledButton {...props}>Custom Feature</StyledButton>
      ),
      isActive: false,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>();
  const renderContent = () => {
    if (isOpen) {
      const currentContent = tabs.find(
        tab => tab.title === currentTab,
      )!.tabContent;
      return currentContent;
    }
    return;
  };
  const sharedProps = {
    closeModal: () => setIsOpen(false),
  };

  return (
    <div className="relative min-h-screen items-center justify-items-center font-silkscreen text-lg font-bold">
      <div className="absolute left-[60px] flex flex-col gap-[24.576px] pt-14">
        {items.map(item => (
          <Link
            href={item.href}
            key={item.title}
            className="flex flex-col items-center gap-4"
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={90}
              height={90}
              className="lg:h-[70px] lg:w-[70px]"
            />
            <span className="max-w-[90px] text-center">{item.title}</span>
          </Link>
        ))}
      </div>
      <div className="absolute flex min-h-full w-full flex-col gap-10 pb-[60px] lg:gap-5 lg:pb-4">
        <div className="flex h-full flex-1 items-center justify-center">
          {renderContent()?.(sharedProps)}
        </div>
        <div className="flex justify-center gap-4">
          {tabs.map(tab => (
            <TabButton
              key={tab.title}
              isActive={tab.isActive}
              isOpen={tab.title === currentTab}
              title={tab.title}
              onClick={() => {
                if (tab.title === currentTab) {
                  setIsOpen(false);
                  setCurrentTab(undefined);
                } else {
                  setIsOpen(true);
                  setCurrentTab(tab.title);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
