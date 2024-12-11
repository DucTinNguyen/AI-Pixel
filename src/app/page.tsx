'use client';

import 'react-contexify/dist/ReactContexify.css';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import {
  Menu,
  useContextMenu
} from 'react-contexify';
import Modal from 'react-modal';
import { Rnd } from 'react-rnd';

import docs from '@/assets/images/docs.svg';
import editProfileFeather from '@/assets/images/edit-profile-feather.svg';
import trash from '@/assets/images/trash.svg';
import ui from '@/assets/images/ui.svg';
import x from '@/assets/images/x.svg';
import Feature from '@/components/feature';
import Folder from '@/components/folder';
import Laboratory from '@/components/laboratory';
import Marketplace from '@/components/marketplace';
import Profile from '@/components/profile';
import TabButton from '@/components/tab-button';
import useWindowStore from '@/stores/use-window-store';
import { ContentProps } from '@/types';

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

  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>();
  const searchParams = useSearchParams();

  const feature = searchParams.get('feature');

  const tabs = [
    {
      title: 'Laboratory',
      tabContent: (props: ContentProps) => <Laboratory {...props} />,
      isActive: true,
    },
    {
      title: 'Marketplace',
      tabContent: (props: ContentProps) => <Marketplace {...props} />,
      isActive: false,
    },
    {
      title: 'Magic orb',
      tabContent: () => <></>,
      isActive: false,
    },
  ];

  const renderContent = () => {
    if (isOpen && !feature) {
      const currentContent = tabs.find(
        tab => tab.title === currentTab,
      )?.tabContent;
      return currentContent;
    }
    return;
  };
  const sharedProps = {
    closeModal: () => {
      setIsOpen(false);
      setCurrentTab(undefined);
    },
    setCurrentTab: setCurrentTab,
  };

  const renderFeature = () => {
    if (feature && isOpen) {
      return (
        <Feature
          closeModal={() => setIsOpen(false)}
          setCurrentTab={setCurrentTab}
        />
      );
    }
    return;
  };

  Modal.defaultStyles.overlay = {
    ...Modal.defaultStyles.overlay,
    zIndex: 100,
  };

  const windows = useWindowStore(state => state.windows);

  const { show } = useContextMenu({
    id: 'context-menu',
  });

  const createWindow = useWindowStore(state => state.openWindow);
  const handleFocus = useWindowStore(state => state.handleFocus);

  return (
    <div
      className="relative min-h-screen items-center justify-items-center overflow-hidden font-silkscreen text-lg font-bold"
      onContextMenu={event => show({ event })}
    >
      <div className="absolute min-h-screen w-full">
        {windows.map(window => (
          <Rnd
            key={window.id}
            bounds="parent"
            enableResizing={false}
            default={{
              x: 100,
              y: 100,
              width: window.type === 'FOLDER' ? 529 : 600,
              height: window.type === 'FOLDER' ? 379 : 600,
            }}
            style={{
              position: 'absolute',
              zIndex: window.zIndex,
            }}
            onMouseDown={() => handleFocus(window.id)} // Bring to front on click
          >
            {window.type === 'FOLDER' && <Folder />}
          </Rnd>
        ))}
      </div>
      <div className="absolute flex min-h-full w-full flex-col-reverse gap-10 pb-[60px] lg:gap-5 lg:pb-4">
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
        <div
          className={`relative flex h-full flex-1 items-center justify-center ${isOpen ? '' : ''}`}
        >
          {renderContent()?.(sharedProps)}

          {currentTab === 'Feature' && renderFeature()}
        </div>
      </div>
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
      <div className="absolute right-[60px] space-y-4 pt-14 hover:cursor-pointer">
        <div className="flex justify-end">
          <Profile name="John woker" />
        </div>
        <div className="w-[370px] space-y-2">
          <div className="flex justify-end">
            <Image
              src={editProfileFeather}
              alt="editProfileFeather"
              width={33}
              className="relative select-none"
            />
            <p className="text-right font-silkscreen text-base font-bold leading-normal tracking-tight text-[#fdc840]">
              Contract Address:
            </p>
          </div>
          <div className="whitespace-break-spaces break-words text-right font-silkscreen text-base font-bold leading-normal tracking-tight text-white">
            HNg5PYJmtqcmzXrv6S9zP1CDKk5BgDuyFBxbvNApump
          </div>
        </div>
      </div>

      <Menu
        id="context-menu"
        theme="dark"
        style={{
          border: 'none',
          borderRadius: 0,
          padding: 0,
        }}
      >
        <div
          className="inline-flex h-16 w-[250px] items-center justify-start gap-2.5 border-2 border-[#8b98b8] bg-[#192539] px-6 py-[19px] hover:cursor-pointer hover:bg-[#273854]"
          onClick={() => createWindow('FOLDER')}
        >
          <p className="font-silkscreen text-base font-normal leading-tight tracking-tight text-[#99a0ae]">
            CREATE NEW FOLDER
          </p>
        </div>
      </Menu>
    </div>
  );
}
