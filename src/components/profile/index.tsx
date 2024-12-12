import Image from 'next/image';
import { useState } from 'react';
import Modal from 'react-modal';

import modalbody from '@/assets/images/modal-body-account.svg';
import modalclose from '@/assets/images/modal-close.svg';
import modalheader from '@/assets/images/modal-header.svg';
import profile from '@/assets/images/profile.png';
import profileBanner from '@/assets/images/profile-banner.svg';
import profileBar from '@/assets/images/profile-bar.svg';

import ProfileTabs from './profile-tabs';
import { motion } from 'framer-motion';

interface Props {
  name: string;
}
export default function Profile({ name }: Props) {
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
      inset: 0,
      padding: 0,
    },
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative h-[80px] w-[252px]">
        <div className="hover:cursor-pointer" onClick={() => setIsOpen(true)}>
          <Image
            src={profileBar}
            alt="profile bar"
            height={252}
            className="absolute select-none"
          />
          <Image
            src={profile}
            alt="profile"
            height={48}
            className="absolute left-4 top-4 select-none"
          />
        </div>
        <p className="profile-name relative left-[90px] top-3 w-[160px] overflow-ellipsis text-white">
          {name}
        </p>
      </div>

      <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative h-[600px] w-[1143px]"
        >
          <div className="absolute h-[600px] w-[1143px]">
            <Image
              src={modalbody}
              alt="modalbody"
              width={1143}
              className="absolute inset-0 select-none"
            />
            <div className="relative -inset-[14px] z-50 flex w-full items-center justify-center">
              <Image
                src={modalheader}
                alt="modalheader"
                width={338}
                className="absolute select-none"
              />
              <p className="text-gradient z-10 select-none font-[family-name:var(--font-junkyard-calibo)] text-2xl">
                ACCOUNT
              </p>
            </div>
            <div
              className="relative -inset-y-6 inset-x-6 z-50 flex w-full items-center justify-end hover:cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Image
                src={modalclose}
                alt="modalclose"
                width={80}
                className="absolute select-none"
              />
            </div>
          </div>
          <div className="relative flex h-[600px] w-[1143px] gap-y-8 px-10 pt-14">
            <div className="h-[481px] w-[382px]">
              <Image
                src={profileBanner}
                alt="profileBanner"
                width={382}
                className="absolute select-none"
              />
              <div className="flex flex-col items-center justify-center gap-6 pt-20">
                <div>
                  <Image
                    src={profile}
                    alt="profile"
                    width={200}
                    className="absolute select-none"
                  />
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative"
                  >
                    <rect
                      x="194.117"
                      y="194.117"
                      width="5.88235"
                      height="5.88235"
                      fill="#EDAA62"
                    />
                    <rect
                      x="188.234"
                      y="188.236"
                      width="5.88235"
                      height="5.88235"
                      fill="#EDAA62"
                    />
                    <rect
                      x="194.117"
                      width="5.88235"
                      height="5.88235"
                      fill="#EDAA62"
                    />
                    <rect
                      x="188.234"
                      y="5.88281"
                      width="5.88235"
                      height="5.88235"
                      fill="#EDAA62"
                    />
                    <rect width="5.88235" height="5.88235" fill="#EDAA62" />
                    <rect
                      x="5.88281"
                      y="5.88281"
                      width="5.88235"
                      height="5.88235"
                      fill="#EDAA62"
                    />
                    <rect
                      y="194.117"
                      width="5.88235"
                      height="5.88235"
                      fill="#EDAA62"
                    />
                    <rect
                      x="5.88281"
                      y="188.236"
                      width="5.88235"
                      height="5.88235"
                      fill="#EDAA62"
                    />
                    <rect
                      x="194.117"
                      y="11.7656"
                      width="5.88235"
                      height="176.471"
                      fill="#EDAA62"
                    />
                    <rect
                      y="11.7656"
                      width="5.88235"
                      height="176.471"
                      fill="#EDAA62"
                    />
                    <rect
                      x="11.7656"
                      y="194.117"
                      width="176.471"
                      height="5.88235"
                      fill="#EDAA62"
                    />
                    <rect
                      x="11.7656"
                      y="0.000183105"
                      width="176.471"
                      height="5.88235"
                      fill="#EDAA62"
                    />
                  </svg>
                </div>

                <p className="text-gradient relative select-none font-[family-name:var(--font-junkyard-calibo)] text-2xl">
                  JOHN WOKER
                </p>

                <p className="relative w-[258px] text-center font-silkscreen text-[12px]">
                  🚀 Crypto Enthusiast | 📈 Blockchain Believer | 💰 DeFi
                  Advocate | 🔑 Investor | 🌐 Global Visionary
                </p>
              </div>
            </div>
            <ProfileTabs />
          </div>
        </motion.div>
      </Modal>
    </>
  );
}
