'use client';

import 'react-contexify/dist/ReactContexify.css';

import cooking from '@/assets/gifs/cooking.gif';
import commenticon from '@/assets/images/comment-icon.png';
import docs from '@/assets/images/docs.svg';
import off from '@/assets/images/off.svg';
import on from '@/assets/images/on.svg';
import toastbg from '@/assets/images/toast-bg.png';
import trash from '@/assets/images/trash.svg';
import ui from '@/assets/images/ui.svg';
import x from '@/assets/images/x.svg';
import ModalConnectWallet from '@/components/connect-modal';
import Draggable from '@/components/draggable';
import Droppable from '@/components/droppable';
import Feature from '@/components/feature';
import Folder from '@/components/folder';
import Laboratory from '@/components/laboratory';
import Marketplace from '@/components/marketplace';
import Profile from '@/components/profile';
import TabButton from '@/components/tab-button';
import GameWindow from '@/components/window-overlay/game-window';
import Taskbar from '@/components/window-overlay/taskbar';
import useItemStore from '@/stores/use-item-store';
import { useConnectStore } from '@/stores/use-modal-connect';
import useWindowStore from '@/stores/use-window-store';
import type { ContentProps, Item } from '@/types';
import { sounds } from '@/utils/sounds';
import { DndContext, useDroppable, type DragEndEvent } from '@dnd-kit/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, useContextMenu } from 'react-contexify';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { Rnd } from 'react-rnd';
import featurebutton from '@/assets/images/feature-button.svg';
import { useWallet } from '@solana/wallet-adapter-react';

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
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>();
  const searchParams = useSearchParams();
  const router = useRouter();
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
  const { connectModal, setConnectModal } = useConnectStore();
  const storedItems = useItemStore(state => state.items);
  const createFolder = useItemStore(state => state.createFolder);
  const openFolder = useWindowStore(state => state.openFolder);
  const closeWindow = useWindowStore(state => state.closeWindow);
  const addAppToFolder = useItemStore(state => state.addAppToFolder);
  const removeApp = useItemStore(state => state.removeApp)
  const moveItemToLatest = useItemStore(state => state.moveItemToLatest);

  /* ATP1 */
  const openGame = useWindowStore(state => state.openGame);

  function renderItem(item: Item) {
    if (item.type === 'FOLDER') {
      return <DesktopFolder item={item} />;
    } else if (item.type === 'GAME') {
      return item.isCooking ? (
        <Image
          unoptimized={true}
          src={cooking}
          alt="cooking"
          width={80}
          height={80}
          className="md:h-[80px] h-[40px] w-[40px] md:w-[80px]"
        />
      ) : (
        <div className="flex flex-col items-center hover:cursor-pointer">
          <Draggable id={item.id}>
            <div 
              className="flex flex-col items-center justify-center gap-4"
              onDoubleClick={() => openGame(item.id)}
            >
              <div className="relative h-[40px] w-[40px] md:h-[60px] md:w-[60px]">
                <Image
                  src={item.appIcon!}
                  alt={item.name}
                  layout="fill"
                  objectFit="contain"
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

    // drop to trash
    if (event.over && event.over.id === 'trash-dropzone') {
      removeApp(event.active.id as string);
    }
      if (event.over) {
        // If dropping over a folder, add to folder regardless of drag distance
        const folderId = event.over.id as string;
        addAppToFolder(folderId, event.active.id as string);
      }
      // Only consider it a drag if distance is greater than item size (50px)
      else if (dragDistance > 50) {
        moveItemToLatest(event.active.id as string);
      }
  };

  const handleConnectModal = (value: boolean) => {
    setConnectModal(value);
  }

  const renderStaticItems = () => {
    return items.map(item => {
      if (item.title === 'Trash') {
        return (
          <TrashDroppable
            key={item.title}
            icon={item.icon}
            title={item.title}
          />
        );
      }

      return (
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
            className="h-[50px] w-[50px] lg:h-[70px] lg:w-[70px]"
          />
          <span className="max-w-[90px] text-center text-sm text-white md:text-lg">
            {item.title}
          </span>
        </Link>
      );
    });
  }; 

  const [isMobile, setIsMobile] = useState(false);

  // Check viewport size on mount and resize
  useEffect(() => {
    const checkViewport = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    sounds.background.play();
  }, []);

  const { publicKey } = useWallet();
  

  return (
    <>
      {/* connect wallet modal - desktop view  */}
      <ModalConnectWallet
        isOpen={connectModal}
        setIsOpen={handleConnectModal}
      />
      <div className='w-fit absolute top-4 right-4 block lg:hidden'>

        {/* connect wallet button */}
        <button
          onClick={() => {
            handleConnectModal(publicKey ? false : true);
          }}
          className="relative flex h-[50px] w-[110px] items-center justify-center hover:scale-95 lg:hidden"
        >
          <Image
            src={featurebutton}
            alt="feature"
            layout="fill"
            objectFit="cover"
          />
          <span className="feature-button-title z-10 font-silkscreen text-sm">
            Connect wallet
          </span>
        </button>
      </div>

      <div
        className="relative min-h-screen items-center justify-items-center overflow-hidden font-silkscreen text-lg font-bold"
        onContextMenu={event => show({ event })}
      >
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            if (isMuted) {
              sounds.background.play();
            } else {
              sounds.background.stop();
            }
          }}
          className="absolute bottom-[60px] right-[60px] z-30 hidden h-[80px] w-[80px] cursor-pointer md:block"
        >
          {isMuted ? (
            <Image src={off} alt="sound" layout="fill" objectFit="cover" />
          ) : (
            <Image src={on} alt="mute" layout="fill" objectFit="cover" />
          )}
        </button>

        <div className="absolute min-h-screen w-full pb-12">
          {windows.map(window => {
            let item = storedItems.find(item => item.id === window.itemId);
            
            if (!item) {
              const folders = storedItems.filter(item => item.type === 'FOLDER');
              for (const folder of folders) {
                const foundApp = folder.apps?.find(app => app.id === window.itemId);
                if (foundApp) {
                  item = foundApp;
                  break;
                }
              }
            }
            
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
                    openGame={openGame}
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
          {/* Taskbar */}
          <Taskbar />

          <div className="z-30 flex justify-center gap-4">
            {tabs.map(tab => (
              <TabButton
                key={tab.title}
                isActive={tab.isActive}
                isOpen={tab.title === currentTab}
                title={tab.title}
                onClick={() => {
                  if (isMobile) {
                    toast.custom((t: { visible: boolean }) => (
                      <div
                        className={` ${t.visible ? 'animate-slide-in' : 'animate-slide-out'} relative flex h-[64px] w-[390px] items-center gap-3 p-[14px]`}
                      >
                        <Image
                          src={commenticon}
                          alt="commenticon"
                          width={45}
                          height={28}
                          className="z-10"
                        />
                        <h1 className="z-10 font-silkscreen text-base text-white">
                          This feature is not available on mobile
                        </h1>
                        <Image
                          src={toastbg}
                          alt="toastbg"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    ));
                    return;
                  }
                  if (tab.title === currentTab) {
                    router.push('/');
                    setIsOpen(false);
                    setCurrentTab(undefined);
                  } else {
                    router.push('/');
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
          <div className="absolute left-4 flex h-screen flex-col flex-wrap gap-[24.576px] gap-x-10 pt-8 md:left-[60px] md:pt-14">
            {renderStaticItems()}
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

        <div className="absolute right-[60px] hidden space-y-4 pt-14 hover:cursor-pointer md:block">
          <div className="flex justify-end">
            <Profile />
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
    </>
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
const TrashDroppable = ({ icon, title }: { icon: string; title: string }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'trash-dropzone',
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col items-center gap-4 ${
        isOver ? 'opacity-70' : ''
      }`}
    >
      <Image
        src={icon}
        alt={title}
        width={90}
        height={90}
        className="h-[50px] w-[50px] lg:h-[70px] lg:w-[70px]"
      />
      <span className="max-w-[90px] text-center text-sm text-white md:text-lg">
        {title}
      </span>
    </div>
  );
};
