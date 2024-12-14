import Image from 'next/image';

import editProfileFeather from '@/assets/images/edit-profile-feather.svg';
import editProfileSave from '@/assets/images/edit-profile-save.svg';
import { useModalStore } from '@/stores/use-modal-store';
export default function EditProfile() {
  const {setProfileModal} = useModalStore()
  return (
    <div className="space-y-6 px-[55px] py-[35px]">
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="edit-profile-label">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="border-[3px] border-[#606576] bg-[#24262D] px-6 py-4 font-silkscreen text-[14px] text-white"
          defaultValue="John Woker"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="bio" className="edit-profile-label">
          Bio
        </label>
        <textarea
          id="bio"
          className="min-h-40 border-[3px] border-[#606576] bg-[#24262D] px-6 py-4 font-silkscreen text-[14px] text-white"
          defaultValue="🚀 Crypto Enthusiast | 📈 Blockchain Believer | 💰 DeFi Advocate | 🔑 Investor | 🌐 Global Visionary"
        />
      </div>

      <div className="relative flex w-full justify-end">
        <button 
        onClick={() => {
          setProfileModal(false)
        }}
        className="relative h-[54px] w-[142px] hover:cursor-pointer">
          <Image
            src={editProfileSave}
            alt="editProfileSave"
            width={142}
            className="absolute select-none"
          />
          <div className="relative flex items-center justify-center gap-2 pt-[7px]">
            <Image
              src={editProfileFeather}
              alt="editProfileFeather"
              width={33}
              className="relative select-none"
            />
            <p className="edit-profile-save-button relative select-none">
              Save
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
