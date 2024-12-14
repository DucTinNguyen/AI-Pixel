'use client';

import 'react-contexify/dist/ReactContexify.css';

import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {  useState } from 'react';
import { Menu, useContextMenu } from 'react-contexify';
import Modal from 'react-modal';
import { Rnd } from 'react-rnd';

import cooking from '@/assets/gifs/cooking.gif';
import docs from '@/assets/images/docs.svg';
import editProfileFeather from '@/assets/images/edit-profile-feather.svg';
import trash from '@/assets/images/trash.svg';
import ui from '@/assets/images/ui.svg';
import x from '@/assets/images/x.svg';
import Draggable from '@/components/draggable';
import Droppable from '@/components/droppable';
import Feature from '@/components/feature';
import Folder from '@/components/folder';
import Laboratory from '@/components/laboratory';
import Marketplace from '@/components/marketplace';
import Profile from '@/components/profile';
import TabButton from '@/components/tab-button';
import useItemStore from '@/stores/use-item-store';
import useWindowStore from '@/stores/use-window-store';
import type { ContentProps, Item } from '@/types';
import Taskbar from '@/components/window-overlay/taskbar';
import GameWindow from '@/components/window-overlay/game-window';

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

  const handleFocus = useWindowStore(state => state.handleFocus);

  const storedItems = useItemStore(state => state.items);
  const createFolder = useItemStore(state => state.createFolder);
  const openFolder = useWindowStore(state => state.openFolder);
  const closeWindow = useWindowStore(state => state.closeWindow);
  const addAppToFolder = useItemStore(state => state.addAppToFolder);
  const moveItemToLatest = useItemStore(state => state.moveItemToLatest);

  /* ATP1 */
  const openGame = useWindowStore(state => state.openGame); 

  function renderItem(item: Item) {
    if (item.type === 'FOLDER') {
      return <DesktopFolder item={item} />;
    } else if (item.type === 'GAME') {
      
      return item.isCooking ? (
        <Image unoptimized={true} src={cooking} alt="cooking" width={120} />
      ) : (
        <div className="flex flex-col items-center hover:cursor-pointer">
          <Draggable id={item.id}>
            <div 
              className="flex flex-col items-center justify-center gap-4"
              onDoubleClick={() => openGame(item.id)}
            >
              <div className="relative h-[50px] w-[50px]">
                <Image
                  src={item.appIcon!}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <span className="item-name max-w-[90px]">{item.name}</span>
            </div>
          </Draggable>
        </div>
      );
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    // Calculate the total drag distance using Pythagorean theorem
    const dragDistance = Math.sqrt(
      Math.pow(event.delta.x, 2) + Math.pow(event.delta.y, 2)
    );
    
    // If dropping over a folder, add to folder regardless of drag distance
    if (event.over) {
      const folderId = event.over.id as string;
      addAppToFolder(folderId, event.active.id as string);
    } 
    // Only consider it a drag if distance is greater than item size (50px)
    else if (dragDistance > 50) {
      moveItemToLatest(event.active.id as string);
    }
  };

  /* ATP1 */

  return (
    <div
      className="relative min-h-screen items-center justify-items-center overflow-hidden font-silkscreen text-lg font-bold"
      onContextMenu={event => show({ event })}
    >

      {/* ATP 1 */}
      <div className="absolute min-h-screen w-full pb-12"> {/* Add padding for taskbar */}
        {windows.map(window => {
          const item = storedItems.find(item => item.id === window.itemId);
          if (!item) return null;

          return (
            <Rnd
              key={window.id}
              bounds="parent"
              enableResizing={false}
              default={{
                x: 100,
                y: 100,
                width: window.type === 'FOLDER' ? 529 : 500,
                height: window.type === 'FOLDER' ? 379 : 500,
              }}
              style={{
                position: 'absolute',
                zIndex: window.zIndex,
                display: window.isMinimized ? 'none' : 'block',
              }}
              onMouseDown={() => handleFocus(window.id)}
              dragHandleClassName="drag-handle"
            >
              {window.type === 'FOLDER' && (
                <Folder
                  folder={item}
                  closeFolder={() => closeWindow(window.id)}
                />
              )}
              {window.type === 'GAME' && (
                <GameWindow
                  game={item}
                  closeGame={() => closeWindow(window.id)}
                  windowId={window.id}
                />
              )}
            </Rnd>
          );
        })}

      </div>

      <div className="absolute flex min-h-full w-full flex-col-reverse gap-10 pb-[60px] lg:gap-5 lg:pb-4">
        {/* forged app minimized taskbar  */}
        <Taskbar />
        
        {/* feature tabs - lab, market, orb */}
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
      <DndContext id="desktop" onDragEnd={handleDragEnd}>
        <div className="absolute left-[60px] flex h-screen flex-col flex-wrap gap-[24.576px] gap-x-10 pt-14">
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


          {/* forged apps */}
          {storedItems.map(item => (
            <div
              key={item.id}
              className="flex flex-col items-center hover:cursor-pointer"
              onDoubleClick={() => {
                if (item.type === 'FOLDER') {
                  openFolder(item.id);
                }
              }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </DndContext>

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
          onClick={() => createFolder('FOLDER')}
        >
          <p className="font-silkscreen text-base font-normal leading-tight tracking-tight text-[#99a0ae]">
            CREATE NEW FOLDER
          </p>
        </div>
      </Menu>


    </div>
  );
}

function DesktopFolder({ item }: { item: Item }) {
  let iconNumber = item.apps!.length;
  if (iconNumber > 5) iconNumber = 5;
  const iconLink = `/assets/images/folder${iconNumber}.svg`;
  const { show } = useContextMenu({
    id: item.id,
  });
  const deleteFolder = useItemStore(state => state.deleteFolder);
  return (
    <>
      <Draggable id={item.id}>
        <Droppable id={item.id}>
          <div
            className="flex flex-col items-center justify-center"
            onContextMenu={event => {
              show({ event });
              event.stopPropagation();
            }}
          >
            <Image src={iconLink} alt={item.name} width={126} height={154} />
            <span className="item-name max-w-[90px] -translate-y-5">
              {item.name}
            </span>
          </div>
        </Droppable>
      </Draggable>
      <Menu
        id={item.id}
        theme="dark"
        style={{
          border: 'none',
          borderRadius: 0,
          padding: 0,
        }}
      >
        <div
          className="inline-flex h-16 w-[250px] items-center justify-start gap-2.5 border-2 border-[#8b98b8] bg-[#192539] px-6 py-[19px] hover:cursor-pointer hover:bg-[#273854]"
          onClick={() => deleteFolder(item.id)}
        >
          <p className="font-silkscreen text-base font-normal leading-tight tracking-tight text-[#99a0ae]">
            DELETE
          </p>
        </div>
      </Menu>
    </>
  );
}

