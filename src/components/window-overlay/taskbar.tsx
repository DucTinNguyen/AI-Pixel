import Image from 'next/image';
import useItemStore from '@/stores/use-item-store';
import useWindowStore from '@/stores/use-window-store';

export default function Taskbar() {
  const windows = useWindowStore(state => state.windows);
  const minimizedWindows = windows.filter(w => w.isMinimized);
  const items = useItemStore(state => state.items);
  const restoreWindow = useWindowStore(state => state.restoreWindow);

  const findItem = (itemId: string) => {
    let item = items.find(i => i.id === itemId);
    
    if (!item) {
      const folders = items.filter(item => item.type === 'FOLDER');
      for (const folder of folders) {
        const foundApp = folder.apps?.find(app => app.id === itemId);
        if (foundApp) {
          item = foundApp;
          break;
        }
      }
    }
    
    return item;
  };

  return (
    <div className="relative lg:-bottom-4 left-0 right-0 z-50 flex h-12 items-center gap-2 border-t-2 border-[#8b98b8] bg-[#192539] px-4 md:hidden">
      {minimizedWindows.map(window => {
        const item = findItem(window.itemId);
        if (!item) return null;

        return (
          <button
            key={window.id}
            onClick={() => restoreWindow(window.id)}
            className="flex h-8 items-center gap-2 rounded border border-[#8b98b8] bg-[#273854] px-3 py-1 hover:bg-[#354b75] focus:outline-none"
          >
            {item.appIcon && (
              <div className="relative h-4 w-4">
                <Image
                  src={item.appIcon}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
            <span className="text-xs text-[#99a0ae]">{item.name}</span>
          </button>
        );
      })}
    </div>
  );
}
