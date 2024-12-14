import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from 'react-modal';

import close from '@/assets/images/close.svg';
import commenticon from '@/assets/images/comment-icon.png';
import featurebutton from '@/assets/images/feature-button.svg';
import featureheader from '@/assets/images/feature-header.svg';
import sendbutton from '@/assets/images/send-button.svg';
import shield from '@/assets/images/shield.svg';
import test from '@/assets/images/test-card.png';
import tipbutton from '@/assets/images/tip-button.svg';
import tipheader from '@/assets/images/tip-header.svg';
import toastbg from '@/assets/images/toast-bg.png';
import { ContentProps } from '@/types';

import Comment from './comment';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnectStore } from '@/stores/use-modal-connect';



export default function Feature({ closeModal }: ContentProps) {
   const [isOpen, setIsOpen] = useState(false);
   const { connected } = useWallet();
   const { setConnectModal} = useConnectStore();
  const router = useRouter();
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(39, 39, 39, 0.60)',
      
    },
    content: {
      border: 'none',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  };


 


  const dummyComment = [
    {
      username: 'John Walker',
      message: 'i die when trying to loot corpses',
    },
    {
      username: 'Emma Thompson',
      message: 'found a secret easter egg',
    },
    {
      username: 'David Wilson',
      message: 'loving the new features',
    },
    {
      username: 'Sophie Taylor',
      message: 'this level is impossible',
    },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-30 flex w-[989px] flex-col"
      >
        <div className="relative flex h-[56px] w-full items-center justify-center">
          <h1 className="feature-title z-20 text-xl">snakeverse</h1>
          <button
            onClick={() => {
              closeModal();
              router.push('/');
            }}
          >
            <Image
              src={close}
              alt="close"
              width={40}
              height={40}
              className="absolute right-[8px] top-[55%] z-10 -translate-y-1/2 hover:scale-95"
            />
          </button>
          <Image
            src={featureheader}
            alt="modalheader"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="no-scrollbar relative h-[540px] w-full overflow-hidden border-[5px] border-[#A9ACB8] bg-[#192539] px-10">
          <div className="absolute left-3 top-3 z-10 h-5 w-5 bg-[#FFFFFFE0]" />
          <div className="absolute right-3 top-3 z-10 h-5 w-5 bg-[#FFFFFFE0]" />
          <div className="absolute bottom-3 left-3 z-10 h-5 w-5 bg-[#FFFFFFE0]" />
          <div className="absolute bottom-3 right-3 z-10 h-5 w-5 bg-[#FFFFFFE0]" />
          <div className="no-scrollbar flex h-full flex-col gap-6 overflow-y-auto py-10">
            <div className="flex items-center gap-8">
              <div className="relative h-[220px] w-[219px] shadow-[-3.745px_0px_0px_0px_#A9ACB8,0px_-3.745px_0px_0px_#A9ACB8,0px_3.745px_0px_0px_#000,3.745px_0px_0px_0px_#000]">
                {/* Background and shadow container */}
                <div className="absolute inset-0 bg-[rgba(36,47,50,0.46)]" />

                {/* SVG Frame */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 220 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="2.81055"
                    width="2.80851"
                    height="214.383"
                    fill="#D9D9D9"
                  />
                  <rect
                    x="2.80859"
                    y="8.42761"
                    width="2.80851"
                    height="211.574"
                    fill="black"
                    fillOpacity="0.16"
                  />
                  <rect
                    x="213.445"
                    y="8.42761"
                    width="2.80851"
                    height="208.766"
                    fill="black"
                    fillOpacity="0.16"
                  />
                  <rect
                    x="216.254"
                    y="2.81055"
                    width="2.80851"
                    height="214.383"
                    fill="#D9D9D9"
                  />
                  <rect
                    width="2.80851"
                    height="2.80851"
                    transform="matrix(-1 0 0 1 213.445 2.81055)"
                    fill="#D9D9D9"
                  />
                  <rect
                    x="2.80859"
                    y="2.81042"
                    width="2.8085"
                    height="213.447"
                    transform="rotate(-90 2.80859 2.81042)"
                    fill="#D9D9D9"
                  />
                  <rect
                    x="8.42578"
                    y="5.61902"
                    width="2.8085"
                    height="202.213"
                    transform="rotate(-90 8.42578 5.61902)"
                    fill="black"
                    fillOpacity="0.16"
                  />
                  <rect
                    x="2.80859"
                    y="5.61902"
                    width="2.80851"
                    height="2.80851"
                    fill="#D9D9D9"
                  />
                  <rect
                    x="5.61719"
                    y="5.61902"
                    width="2.80851"
                    height="2.80851"
                    fill="black"
                    fillOpacity="0.16"
                  />
                  <rect
                    width="2.80851"
                    height="2.80851"
                    transform="matrix(-1 0 0 1 216.254 5.61902)"
                    fill="#D9D9D9"
                  />
                  <rect
                    x="5.61719"
                    y="2.81042"
                    width="2.80851"
                    height="2.80851"
                    fill="#D9D9D9"
                  />
                  <rect
                    width="2.80851"
                    height="2.80851"
                    transform="matrix(-1 0 0 1 213.445 5.61902)"
                    fill="black"
                    fillOpacity="0.16"
                  />
                  <rect
                    x="2.80859"
                    y="220.002"
                    width="2.8085"
                    height="213.447"
                    transform="rotate(-90 2.80859 220.002)"
                    fill="#D9D9D9"
                  />
                  <rect
                    width="2.8085"
                    height="202.213"
                    transform="matrix(-4.37114e-08 1 1 4.37114e-08 8.42578 214.385)"
                    fill="black"
                    fillOpacity="0.16"
                  />
                  <rect
                    width="2.80851"
                    height="2.80851"
                    transform="matrix(1 0 0 -1 2.80859 214.385)"
                    fill="#D9D9D9"
                  />
                  <rect
                    width="2.80851"
                    height="2.80851"
                    transform="matrix(1 0 0 -1 5.61719 214.385)"
                    fill="black"
                    fillOpacity="0.16"
                  />
                  <rect
                    x="216.254"
                    y="214.385"
                    width="2.80851"
                    height="2.80851"
                    transform="rotate(180 216.254 214.385)"
                    fill="#D9D9D9"
                  />
                  <rect
                    x="213.445"
                    y="217.193"
                    width="2.80851"
                    height="2.80851"
                    transform="rotate(180 213.445 217.193)"
                    fill="#D9D9D9"
                  />
                  <rect
                    width="2.80851"
                    height="2.80851"
                    transform="matrix(1 0 0 -1 5.61719 217.193)"
                    fill="#D9D9D9"
                  />
                  <rect
                    x="213.445"
                    y="214.385"
                    width="2.80851"
                    height="2.80851"
                    transform="rotate(180 213.445 214.385)"
                    fill="black"
                    fillOpacity="0.16"
                  />
                </svg>

                {/* Image container */}
                <div className="relative h-full p-3">
                  <div className="relative h-[195px] w-[194px]">
                    <Image
                      src={test}
                      alt="test"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="feature-title text-sm">snakeverse</h1>
                <div className="flex flex-col gap-[6px]">
                  <span className="font-silkscreen text-sm font-bold text-white">
                    Description
                  </span>
                  <p className="font-silkscreen text-sm font-normal text-[#A3A8B0]">
                    multiplayer snake game brought to you by alch team. make
                    other snakes hit you to eliminate them. press left click to
                    enable dash
                  </p>
                </div>
                <div className="flex items-center gap-2 font-silkscreen text-sm font-normal text-white">
                  <span>Creator:</span>
                  <span className="underline">John woker</span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      if(connected){
                        setIsOpen(true);
                      } else {
                        setConnectModal(true);
                      }
                    }}
                    className="relative flex h-[56px] w-[162.5px] items-center justify-center hover:scale-95"
                  >
                    <Image
                      src={featurebutton}
                      alt="feature"
                      layout="fill"
                      objectFit="cover"
                    />
                    <span className="feature-button-title z-10 font-silkscreen">
                      Tip
                    </span>
                  </button>
                  <button className="relative flex h-[56px] w-[162.5px] items-center justify-center hover:scale-95">
                    <Image
                      src={featurebutton}
                      alt="feature"
                      layout="fill"
                      objectFit="cover"
                    />
                    <span className="feature-button-title z-10 font-silkscreen">
                      Download
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex min-w-[170px] flex-col items-center gap-4 px-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-center font-silkscreen text-base font-normal text-white">
                    Azarus rating
                  </h1>
                  <span className="feature-point text-center">90/100</span>
                </div>
                <Image src={shield} alt="shield" width={71} height={90} />
              </div>
            </div>
            <div className="flex flex-col gap-6 border-[5px] border-[#A9ACB8] bg-[#192539] px-10 py-6 shadow-[0px_0px_0px_12px_#1C2C48_inset]">
              <h1 className="font-junkyard text-sm text-white">Comments</h1>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="h-[64px] flex-1 border-4 border-[#8B98B8] bg-transparent px-6 py-[19px] text-sm text-white placeholder:text-[#99A0AE]"
                />
                <button
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    toast.custom((t: any) => (
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
                          {/* COMMENT ADDED SUCCESSFULLY */}
                          COMMING SOON
                        </h1>
                        <Image
                          src={toastbg}
                          alt="toastbg"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    ));
                  }}
                  className="relative flex h-[64px] w-[140px] items-center justify-center hover:scale-95"
                >
                  <Image
                    src={sendbutton}
                    alt="feature"
                    layout="fill"
                    objectFit="cover"
                  />
                  <span className="feature-button-title z-10 font-silkscreen">
                    Send
                  </span>
                </button>
              </div>
              {dummyComment.map((comment, index) => (
                <Comment
                  key={index}
                  message={comment.message}
                  username={comment.username}
                />
              ))}
            </div>
          </div>
        </div>
        <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
          <div className="relative flex w-[529px] flex-col gap-0">
            <div className="relative flex h-[56px] w-full items-center justify-center">
              <h1 className="feature-title z-20 text-base">
                Send tip (2g5z...Ndi9)
              </h1>
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <Image
                  src={close}
                  alt="close"
                  width={40}
                  height={40}
                  className="absolute right-[8px] top-[55%] z-10 -translate-y-1/2 hover:scale-95"
                />
              </button>
              <Image
                src={tipheader}
                alt="modalheadertip"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative flex h-[323px] w-full flex-col items-center justify-center gap-4 border-[5px] border-[#A9ACB8] bg-[#192539] px-[60px]">
              <div className="absolute left-3 top-3 z-10 h-5 w-5 bg-[#FFFFFFE0]" />
              <div className="absolute right-3 top-3 z-10 h-5 w-5 bg-[#FFFFFFE0]" />
              <div className="absolute bottom-3 left-3 z-10 h-5 w-5 bg-[#FFFFFFE0]" />
              <div className="absolute bottom-3 right-3 z-10 h-5 w-5 bg-[#FFFFFFE0]" />
              <input
                type="text"
                placeholder="0"
                className="h-[64px] w-full border-4 border-[#8B98B8] bg-transparent px-6 py-[19px] text-sm text-white placeholder:text-[#99A0AE]"
              />
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="relative flex h-[64px] w-[245.15px] items-center justify-center hover:scale-95"
              >
                <Image
                  src={tipbutton}
                  alt="feature"
                  layout="fill"
                  objectFit="cover"
                />
                <span className="feature-button-title z-10 font-silkscreen">
                  Send TIP ($ALCH)
                </span>
              </button>
            </div>
          </div>
        </Modal>
      </motion.div>
    </AnimatePresence>
  );
}
