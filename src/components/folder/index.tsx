import Image from 'next/image';

import folderBody from '@/assets/images/folder-body.svg';
import folderClose from '@/assets/images/folder-close.svg';
import folderHeader from '@/assets/images/folder-header.svg';

export default function Folder() {
  return (
    <div className="relative h-full w-full">
      <div className="relative flex h-[56px] w-[529px] items-center justify-center">
        <Image
          src={folderHeader}
          alt="folder header"
          width={529}
          draggable={false}
          className="absolute inset-0 select-none"
        />
        <Image
          src={folderClose}
          alt="folder close"
          width={40}
          draggable={false}
          className="absolute right-[9px] top-1/2 -translate-y-1/2 select-none hover:cursor-pointer"
        />
        <div className="folder-title relative">FOlder 01</div>
      </div>
      <div className="relative h-[323px] w-[529px]">
        <Image
          src={folderBody}
          alt="folder close"
          width={529}
          draggable={false}
          className="absolute select-none"
        />
      </div>
    </div>
  );
}
