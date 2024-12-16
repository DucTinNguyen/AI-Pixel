import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import Image from 'next/image';
import folderBody from '@/assets/images/folder-body.svg';
import folderClose from '@/assets/images/folder-close.svg';
import folderHeader from '@/assets/images/folder-header.svg';
import useItemStore from '@/stores/use-item-store';
import { Item } from '@/types';

import Draggable from '../draggable';
import Droppable from '../droppable';

interface Props {
  folder: Item;
  closeFolder: () => void;
  openGame?: (id: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Folder({ folder, closeFolder, openGame, ...props }: Props) {
  const removeAppFromFolder = useItemStore(state => state.removeAppFromFolder);
  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) {
      removeAppFromFolder(folder.id, event.active.id as string);
    }
  };

  const handleDoubleClick = (app: Item) => {
    if (app.type === 'GAME' && openGame) {
      openGame(app.id);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Droppable id={folder?.id}>
        <div className="relative h-full w-full">
          <div className="relative flex h-[56px] w-[529px] items-center justify-center">
            <Image
              src={folderHeader}
              alt="folder header"
              width={529}
              draggable={false}
              className="drag-handle absolute inset-0 select-none"
            />
            <Image
              src={folderClose}
              alt="folder close"
              width={40}
              draggable={false}
              className="absolute right-[9px] top-1/2 -translate-y-1/2 select-none hover:cursor-pointer"
              onClick={closeFolder}
            />
            <div className="folder-title drag-handle relative select-none">
              {folder?.name}
            </div>
          </div>
          <div className="relative flex h-[323px] w-[529px] items-center justify-center">
            <Image
              src={folderBody}
              alt="folder close"
              width={529}
              draggable={false}
              className="fixed select-none"
            />
            <div className="grid h-[291px] w-[497px] grid-cols-4 overflow-auto magical-scroll ">
              {folder?.apps?.map(app => (
                <div key={app.id} className="relative">
                  <Draggable id={app.id}>
                    <div 
                      className="flex flex-col items-center justify-center gap-4"
                      onDoubleClick={() => handleDoubleClick(app)}  
                    >
                      <Image
                        src={app.appIcon!}
                        alt={app.name}
                        height={50}
                        width={50}
                      />
                      <span className="item-name max-w-[90px]">{app.name}</span>
                    </div>
                  </Draggable>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Droppable>
    </DndContext>
  );
}
