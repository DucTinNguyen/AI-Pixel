import React from 'react';
import PixelFrame from './pixel-frame';

const Comment = ({
  username = 'Anonymous',
  message = '',
  className = '',
  avatarComponent = <PixelFrame />,
  textColor = 'text-[#0E121B]',
  backgroundColor = 'bg-[#8B98B8]',
}) => {
  return (
    <section
      className={`flex flex-col gap-2 p-3 ${backgroundColor} ${className}`}
    >
      <div className="flex items-center gap-[10px]">
        {avatarComponent}
        <h1 className={`font-silkscreen text-base font-bold ${textColor}`}>
          {username}
        </h1>
      </div>
      <span className={`pl-[42px] text-sm font-normal ${textColor}`}>
        {message}
      </span>
    </section>
  );
};

export default Comment;
