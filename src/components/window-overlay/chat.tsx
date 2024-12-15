// components/ChatPopup.tsx
import React from 'react';
import PopupHeader from './app-header';

interface ChatPopupProps {
  onClose: () => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ onClose }) => (
  <div className="w-[400px] absolute left-[-320px] top-0 h-[calc(100%)]">
    <PopupHeader title="Chat" onClose={onClose} width={400}/>
    <div className="w-full border-x-2 border-b-2 border-[#8b98b8] bg-[#192539] h-[calc(100%-56px)]">
      <div className="p-4">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto mb-4">
            {/* Chat messages would go here */}
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              className="flex-1 bg-[#0f172a] border border-[#8b98b8] text-white p-2 rounded"
              placeholder="Type a message..."
            />
            <button className="px-4 py-2 bg-[#8b98b8] text-white rounded">Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ChatPopup;