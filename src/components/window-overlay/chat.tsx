import React, { useState, useEffect, useRef } from 'react';
import PopupHeader from './app-header';
import helpCrystal from "@/assets/images/help-crystal.svg"
import Image from 'next/image';
import styles from './chat.module.css';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatPopupProps {
  onClose: () => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Greetings, I am the Mystical Crystal Ball. Speak your desires!",
      isUser: false,
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Auto scroll when new messages appear
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate chat conversation
    const conversation = [
      {
        delay: 1000,
        message: {
          text: "How do I debug my app when it keeps crashing?",
          isUser: true
        }
      },
      {
        delay: 3000,
        message: {
          text: "The crystal suggests these mystical debugging steps: First, check the console for error messages. Then use console.log() to track the flow of your spells...",
          isUser: false
        }
      },
      {
        delay: 5000,
        message: {
          text: "What about using breakpoints? Where should I put them?",
          isUser: true
        }
      },
      {
        delay: 7000,
        message: {
          text: "The mists reveal that strategic breakpoints should be placed where state changes occur, and before suspicious function calls...",
          isUser: false
        }
      },
      {
        delay: 9000,
        message: {
          text: "And what if the error is in production?",
          isUser: true
        }
      },
      {
        delay: 11000,
        message: {
          text: "Ah, for production mysteries, the crystal ball suggests implementing proper error logging and monitoring tools. The spirits of error tracking platforms shall guide you...",
          isUser: false
        }
      }
    ];

    // Add each message with its delay
    conversation.forEach(({ delay, message }) => {
      setTimeout(() => {
        setMessages(prev => [...prev, message]);
      }, delay);
    });
  }, []);

  return (
    <div className="w-[318px] absolute left-[-340px] top-0 h-[calc(100%)]">
      <PopupHeader title="Chat" onClose={onClose} width={318}/>

      <div className="w-full border-x-[5px] border-b-[5px] border-[#A9ACB8] bg-[#192539] h-[calc(100%-56px)]
      shadow-inner relative">
        {/* Main chat container */}
        <div className="flex flex-col h-[calc(100%-120px)] overflow-hidden relative">
          <div className='w-full p-4 flex items-start gap-[14px]'>
            <Image src={helpCrystal} alt="help crystal" width={35} height={40} />
            
            <div className='text-[16px] leading-[120%] font-normal tracking-[0.32px] text-[#FFF] font-silkscreen'>
              {messages[0].text}
            </div>
          </div>

          <div className='mx-4 w-[calc(100%-32px)] h-[1px] bg-[#8B98B8]'></div>

          {/* Messages container with its own scroll */}
          <div className="flex flex-col gap-4 p-4 overflow-y-auto  magical-scroll relative h-full">
            {messages.slice(1).map((message, index) => (
              <div key={index} className={`w-full flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                {!message.isUser && (
                  <Image src={helpCrystal} alt="help crystal" width={25} height={30} className="mr-2" />
                )}
                <div className={`w-fit max-w-[80%] p-[10px] ${
                  message.isUser 
                    ? 'bg-[#8B98B8] text-[#0E121B]' 
                    : 'bg-[#2A3854] text-[#FFF]'
                } text-[12px] leading-[120%] tracking-[0.28px] font-silkscreen rounded`}>
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Fixed overlay */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />

          {/* Coming Soon - positioned absolutely over the overlay */}
          <div className="absolute w-full flex items-center justify-center top-24 z-10">
            <div className={`w-fit p-[10px] bg-[#2A3854] text-sm text-slate-300 
              font-silkscreen rounded ${styles.comingSoon}`}>
              COMING SOON!
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="absolute bottom-[30px] right-[18px] w-[calc(100%-36px)] flex gap-2">
          <input 
            type="text" 
            className="text-[#99A0AE]
            px-4 py-[19px] text-[16px] leading-[120%] font-normal tracking-[0.32px]
            w-[184px] bg-[#0f172a] border-2 h-16 border-[#8B98B8] rounded"
            placeholder="Type"
          />
          <button 
            className="bg-[url('/assets/images/send-button.png')] bg-contain h-16
            font-silkscreen font-bold px-4 py-6 w-[80px] text-white text-[14px] leading-[120%] rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;