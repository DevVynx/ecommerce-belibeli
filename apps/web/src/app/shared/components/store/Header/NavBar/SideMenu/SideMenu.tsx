import { DownloadIcon, XIcon } from "lucide-react";

import { sideMenuMainLinks, sideMenuSupportLinks } from "../MenuItems";
import { SideMenuItem } from "./SideMenuItem";

type Props = {
  onClose: () => void;
  backgroundClassName: string;
  sideMenuClassName: string;
};

const handleContentClick = (e: React.MouseEvent) => {
  e.stopPropagation();
};

export const SideMenu = ({ onClose, backgroundClassName, sideMenuClassName }: Props) => {
  return (
    <div
      role="none"
      onClick={onClose}
      className={`fixed top-0 left-0 z-50 h-screen w-screen transition-opacity duration-250 ${backgroundClassName}`}
    >
      <div
        role="none"
        onClick={handleContentClick}
        className={`safe-area-bottom-padding absolute right-0 bottom-0 flex h-full w-[80%] translate-x-0 transform flex-col overflow-y-auto bg-white py-6 transition-transform duration-250 ease-in-out ${sideMenuClassName}`}
      >
        <div className="flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold">Menu</h1>
          <button onClick={onClose}>
            <XIcon className="size-7" />
          </button>
        </div>

        <div className="flex flex-col">
          <div className="flex h-full flex-col items-start justify-start p-4 text-3xl">
            {sideMenuMainLinks.map((item) => (
              <SideMenuItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                className={item.className}
                link={item.link}
                onClick={onClose}
              />
            ))}
          </div>

          <div className="border-t border-black/30 px-4 pt-3">
            <h1 className="mb-4 text-2xl font-bold">Suporte</h1>
            {sideMenuSupportLinks.map((item) => (
              <SideMenuItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                onClick={onClose}
              />
            ))}

            <div className="pt-4">
              <div className="flex flex-col items-center rounded-xl bg-blue-100 p-4">
                <h1 className="font-bold text-blue-500">Baixe o App!</h1>
                <p className="mb-3 text-center text-black/60">
                  Baixe nosso app para uma melhor experiência de compra
                </p>
                <button className="flex items-center gap-2 rounded-md bg-blue-500 px-5 py-2 font-bold text-white active:bg-blue-400">
                  <span>{<DownloadIcon />}</span>Baixar o app
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
