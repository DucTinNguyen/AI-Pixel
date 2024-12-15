import {
  Dialog,
  DialogPanel,
  Transition,
} from '@headlessui/react';
import { WalletName } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import { Fragment} from 'react';

export default function ModalConnectWallet({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const { wallets, select } = useWallet();

  const handleConnectWallet = (walletName: WalletName) => {
    select(walletName);
    close();
  };

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50"></div>
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto magical-scroll ">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="data-[closed]:transform-[scale(95%)] relative w-full max-w-md rounded-md border-[5px] border-[#A9ACB8] bg-[#192539] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
            >
              <h2 className="feature-title text-center text-lg">
                Select wallet
              </h2>
              <section className="py-10">
                {wallets.filter(wallet => wallet.readyState === 'Installed')
                  .length > 0 ? (
                  wallets
                    .filter(wallet => wallet.readyState === 'Installed')
                    .map(wallet => {
                      return (
                        <button
                          onClick={() => {
                            handleConnectWallet(wallet.adapter.name);
                          }}
                          key={wallet.adapter.name}
                          className="mb-2 flex w-full cursor-pointer items-center gap-x-2 rounded-lg border-[2px] border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] px-4 py-3"
                        >
                          <Image
                            src={wallet.adapter.icon}
                            alt={wallet.adapter.name}
                            loader={() => wallet.adapter.icon}
                            width={32}
                            height={32}
                          />
                          <span className="text-white">
                            {wallet.adapter.name}
                          </span>
                        </button>
                      );
                    })
                ) : (
                  <span className="block text-center text-base text-white">
                    No wallet is detected
                  </span>
                )}
              </section>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
