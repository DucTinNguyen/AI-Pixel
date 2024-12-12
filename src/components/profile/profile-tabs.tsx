import Image from 'next/image';
import { useState } from 'react';

import editProfileTab from '@/assets/images/edit-profile-tab.svg';
import myAppsTab from '@/assets/images/my-apps-tab.svg';
import profileTabsBody from '@/assets/images/profile-tabs-body.svg';

import EditProfile from './edit-profile';
import MyApps from './my-apps';
export default function ProfileTabs() {
  const [tab, setTab] = useState(0);
  return (
    <div className="flex h-[481px] flex-col items-center">
      <div className="flex h-[50px] gap-3">
        <div
          className="relative flex h-[50px] w-[140px] items-center justify-center hover:cursor-pointer"
          onClick={() => setTab(0)}
          style={{
            opacity: tab === 0 ? 1 : 0.6,
          }}
        >
          <Image
            src={myAppsTab}
            alt="my apps"
            height={50}
            className="absolute select-none"
          />
          <p className="profile-tabs-header relative top-[6px] select-none">
            My Apps
          </p>
        </div>
        <div
          className="relative flex h-[50px] w-[175px] items-center justify-center hover:cursor-pointer"
          onClick={() => setTab(1)}
          style={{
            opacity: tab === 1 ? 1 : 0.6,
          }}
        >
          <Image
            src={editProfileTab}
            alt="edit profile"
            height={50}
            className="absolute select-none"
          />
          <p className="profile-tabs-header relative top-[6px] select-none">
            Edit Profile
          </p>
        </div>
      </div>
      <div className="h-[431px] w-[609px] items-center justify-center">
        <Image
          src={profileTabsBody}
          alt="profile tabs"
          width={609}
          className="absolute select-none"
        />
        <div className="relative size-full">
          {tab === 0 ? <MyApps /> : <EditProfile />}
        </div>
      </div>
    </div>
  );
}
