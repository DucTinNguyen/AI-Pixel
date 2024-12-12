import Image from 'next/image';

import app1 from '@/assets/images/app1.svg';
import app2 from '@/assets/images/app2.svg';
import app3 from '@/assets/images/app3.svg';
import app4 from '@/assets/images/app4.svg';
import app5 from '@/assets/images/app5.svg';
import app6 from '@/assets/images/app6.svg';
import app7 from '@/assets/images/app7.svg';
import app8 from '@/assets/images/app8.svg';

export default function MyApps() {
  const apps = [
    {
      name: 'App no.1',
      src: app1,
    },
    {
      name: 'App no.2',
      src: app2,
    },
    {
      name: 'App no.3',
      src: app3,
    },
    {
      name: 'App no.4',
      src: app4,
    },
    {
      name: 'App no.5',
      src: app5,
    },
    {
      name: 'App no.6',
      src: app6,
    },
    {
      name: 'App no.7',
      src: app7,
    },
    {
      name: 'App no.8',
      src: app8,
    },
  ];
  return (
    <div className="grid h-full grid-cols-4 gap-y-8 pt-12">
      {apps.map(app => (
        <div
          key={app.name}
          className="flex flex-col items-center hover:cursor-pointer"
        >
          <Image
            src={app.src}
            alt={app.name}
            height={100}
            className="relative select-none"
          />
          <p className="profile-tabs-app-name relative top-[6px] select-none">
            {app.name}
          </p>
        </div>
      ))}
    </div>
  );
}
